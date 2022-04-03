import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  forwardRef,
  Inject,
  Query,
} from '@nestjs/common';
import { InstitutionUsersService } from './institution-users.service';
import { CreateInstitutionUserDto } from './dto/create-institution-user.dto';
import { UpdateInstitutionUserDto,   MessageDto, } from './dto/update-institution-user.dto';
import { JwtGuard } from '../auth/jwt-strategy/jwt.guard';
import { GetUser } from '../../decorators';
import {
  error,
  Event,
  makeFilter,
  mask,
  compare,
  hash,
  randomDigits,
  success,
  trimUser,
  unifyPhoneNumber,
} from '../../utils';
import { User, UserService } from '../user';
import { InstitutionsService} from 'src/api/estates/institutions.service';
import { Institution } from 'src/api/estates/entities/estate.entity';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { ConfigService } from '@nestjs/config';
import { MultipartFile } from 'fastify-multipart';
import { IsNull, Like, Not } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as moment from "moment";
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
import { MailService } from '../../mail/mail.service';

@Controller('estate-users')
export class InstitutionUsersController {

constructor(
    @Inject(forwardRef(() => InstitutionUsersService)) private readonly institutionUsersService: InstitutionUsersService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => InstitutionsService)) private readonly institutionsService: InstitutionsService,
    private readonly eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Body() createInstitutionUserDto: CreateInstitutionUserDto, @GetUser() authUser: User) {

    this.eventEmitter.emit(Event.USER_BEFORE_REGISTER, { createInstitutionUserDto });
    const password = createInstitutionUserDto.first_name+'.' + randomDigits(8);
    console.log(password);
    let {
      role_id,
      permission_id,
      first_name,
      last_name,
      username,
      email,
      phone_number,
      home_address,
      state_of_residence,
      lga,
      geo_political_zone,
      estate_id
    } = createInstitutionUserDto; 

    const raw_phone_number = phone_number;
    phone_number = unifyPhoneNumber(phone_number);

    const existingUser = await this.userService.userRepository.findOne({
        select: ['id', 'phone_number', 'email'],
        where: [{ phone_number: raw_phone_number }, { phone_number }, { email }],
      }) ?? null;

    // enforce unique phone number code
    if (existingUser?.phone_number === raw_phone_number || existingUser?.phone_number === phone_number) {
      return error('Registration', 'Looks like you already have an account. Phone number already exist');
    }

    // enforce unique email code
    if (existingUser?.email === email) {
      return error('Registration', 'Looks like you already have an account. Email already exist');
    }

    // generate user customer id
    const customerIdExist = async (user_code: string) => {
      const user = await this.userService.userRepository.findOne({
        user_code,
      });
      return !!user?.user_code;
    };

    let userCustomerId = '' + randomDigits(8);
    while ((await customerIdExist(userCustomerId)) === true) {
      userCustomerId = '' + randomDigits(8);
    }

    let newAgent;
    const newUser = await this.userService.create({
      role_id,
      first_name,
      last_name,
      email,
      phone_number,
      home_address,
      permission_id,
      username,
      state_of_residence,
      lga,
      geo_political_zone,
      image: 'user.png',
      user_code: userCustomerId,
      email_valid: false,
      status: false,
      post_status: 'pending',
      password: hash(password),
      created_by: authUser.id,
      ondording_date: todatsDate,
      created_at: timeStamp,
      updated_at: timeStamp,
      updated_by: authUser.id,
    });

    if (newUser) {
      const newAgent = await this.institutionUsersService.create({
        user_id: newUser.id,
        estate_id,
        status: 2,
        created_by: authUser.id,
        created_at: todatsDate,
      });

      const res = this.mailService.welcomeUser({
        id: newUser.id,
        first_name,
        last_name,
        email,
        phone_number,
        home_address,
        permission_id,
        user_code: userCustomerId,
        role: newUser.role_id,
        password: password
      });
  
    } 

    this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: newUser });

    this.eventEmitter.emit(Event.USER_AFTER_REGISTER, {
      user: {
        ...newUser,
        password: null,
        pin: null,
        bvn: null,
      },
    });

    return success(
      {
        user: await this.institutionUsersService.findOne(newUser.id),
      },
      
      'Estate User Registration',
      'Estate User successfully registered',
    );
  }

  @Get('search')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async search(
    @Query('query') query?: string,
    @Query('per_page') perPage: number = 12,
  ) {
    const users = await this.institutionUsersService.institutionUserRepository.find({
      where: [
        'user_id',
        'user_code',
        'institution_id',
      ].map((column) => ({ [column]: Like(`%${query}%`) })),
      skip: 0,
      take: perPage,
    });
    const total = users.length
    return success(
      users.map((user) => {
        return {
          ...user,
        };
      }),
      'Estate User',
      'Estate User List',
      {
        current_page: 1,
        next_page: null,
        prev_page: null,
        per_page: total,
        total,
      }
    );
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findAll(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 12,
    @Query('query') query?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const _page = page < 1 ? 1 : page
    const _nextPage = _page + 1
    const _prevPage = _page - 1
    const _perPage = perPage
    const _filter = {
      take: perPage,
      skip: (page - 1) * perPage,
      // where: makeFilter(query, from, to, [
      //   'first_name',
      //   'last_name',
      //   'phone_number',
      //   'email',
      //   'bvn',
      //   'customer_id',
      // ]),
    }
    const total = await this.institutionUsersService.institutionUserRepository.count(_filter);
    const users = await this.institutionUsersService.institutionUserRepository.find({
                                                                                      take: perPage,
                                                                                      skip: (page - 1) * perPage,
                                                                                      order: {
                                                                                        created_at: "DESC",
                                                                                    },
                                                                                });
    return success(
      users,
      'Estate User',
      'Estate User List',
      {
        current_page: _page,
        next_page: _nextPage > total ? total : _nextPage,
        prev_page: _prevPage < 1 ? null : _prevPage,
        per_page: _perPage,
        total,
      }
    );
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const user = await this.institutionUsersService.findOne(id);
    return success(
      user ? {
        ...user,
      } : null,
      'Estate User',
      'Estate User Details',
    );
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() user: UpdateInstitutionUserDto) {
    // console.log(user);
    // return user.image;

    // let userCustomerId = '' + randomDigits(12);

    const result = await this.institutionUsersService.update(id, {
      ...user,
    });

    return success(
      {
        id,
        user: await this.institutionUsersService.findOne(id)
      },
      'Estate User',
      'Estate User Details Updated'
    );
  }

  @Patch(':id/activate')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async unsuspend(@Param('id') id: string, @GetUser() authUser: User, @Body() body: MessageDto) {
    const { message } = body

    const existingUser = await this.userService.findOne(id);
    if (existingUser.status == true) {
      return error('Account Status', 'Your account is still active.');
    }

    const updatedRes = await this.userService.update(id, {
      suspended_at: null,
      closed_at: null,
      post_status: 'activated',
      status: true,
      approved_at: timeStamp,
      approved_by: authUser.id,
      updated_at: timeStamp,
      updated_by: authUser.id,
    });

        const users = await this.institutionUsersService.institutionUserRepository.find({
                                                                  take: 10,
                                                                  skip: 10,
                                                                  order: {
                                                                    created_at: "DESC",
                                                                },
                                                            });

    if(updatedRes){
      const newUpate = await this.userService.findOne(id)
      return success({
        user: newUpate,
        users: users
      },
        'Account Status',
        'Your account is now active.',
      );
    }

  }

  @Patch(':id/close-account')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async closeAccount(@Param('id') id: string, @GetUser() authUser: User, @Body() body: MessageDto) {
    const { message } = body

    const existingUser = await this.userService.findOne(id);

    if (existingUser.closed_at !== null) {
      return error('Close Account', 'Your account is closed already.');
    }
    const updatedRes = await this.userService.update(id, {
      closed_at: timeStamp,
      post_status: 'closed',
      status: false,
      updated_at: timeStamp,
      updated_by: authUser.id,
    });

    const users = await this.institutionUsersService.institutionUserRepository.find({
                                                                                      take: 10,
                                                                                      skip: 10,
                                                                                      order: {
                                                                                        created_at: "DESC",
                                                                                    },
                                                                                  });

  if(updatedRes){
        const newUpate = await this.userService.findOne(id)
    return success({
          user: newUpate,
          users: users
        },
        'Account Status',
        'Your account has been closed',
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {

    const user = await this.institutionUsersService.institutionUserRepository.find({
      where: [{ user_id: id }],
    });

    if (!user) {
      return error(
        '404',
        'User deleted already',
      );
    } 
    await this.userService.remove(id);
    await this.institutionUsersService.remove(user[0].id);
    return success(
      {
        id,
      },
      'Users',
      user[0].user.first_name+' account is now deleted',
    );
  }

  @Get('estate-users-managment-analysis')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async usersMgntDashboard() {

    const total_user = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{role_id: 3}]
    });

    const pendingUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ post_status: 'pending', role_id: 3}]
    });
    const activeUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ status: 1, role_id: 3}]
    });
    const inActiveUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ status: 0, role_id: 3}]
    });

    const closedUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{post_status: 'closed',  role_id: 3}]
    });

    const emailValid = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ email_valid: 0, role_id: 3}]
    });
    const onlineUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ post_status: 'online', role_id: 3}]
    });

    return success(
      {
        totalUsers: total_user.length,
        pendingUsers: pendingUsers.length,
        activeUsers: activeUsers.length,
        inActiveUsers: inActiveUsers.length,
        closedUsers: closedUsers.length,
        emailValid: emailValid.length,
        onlineUsers: onlineUsers.length
      },
      'Users Analysis',
      'Users dashboard analysis',
    );
  }
}
