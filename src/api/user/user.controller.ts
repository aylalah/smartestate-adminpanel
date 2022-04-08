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
  HttpService,
} from '@nestjs/common';
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
import { UserService } from './user.service';
import {
  FileUploadDto,
  FindUserDto,
  MessageDto,
  UpdateEmailDto,
  UpdateUserCodeDto,
  UpdatePhoneNumberDto,
  ChangeResetPasswordDto,
  UpdateReferralCodeDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { MultipartFile } from 'fastify-multipart';
import * as moment from "moment";
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { IsNull, Like, Not } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailService } from '../../mail/mail.service';

const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const AWS = require('aws-sdk');
const converter = require('json-2-csv');
const {Buffer} = require('buffer');
const fs = require("fs");

const path = require("path");
const date = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
const currentTimestamp = moment(new Date()).format('HH:mm:ss');
const duration = moment().diff(date, 'minutes');
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");

@Controller('admin/user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly eventEmitter: EventEmitter2,
    private httpService: HttpService,

  ) {}


  async uploadFileToAws(file){

    const s3 = new AWS.S3({
        // region: process.env.AWS_S3_REGION,
        accessKeyId: process.env.AWS_S3_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY
    });

    const fileName = file.name;
    const setPath = (filename) => `${process.env.FILE_PATH}/${filename}`;
    const awsLink = `${process.env.FILE_URL}/${process.env.FILE_PATH}/${fileName}`;

    // return setPath(fileName);

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${setPath(fileName)}.${file.type}`,
        Body: file.data,
        ContentEncoding: 'base64',
        ContentType: `image/${file.type}`,
        // ACLs: 'public-read'
        };

        const res:any = await new Promise((resolve, reject) => {
          s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
        });

      console.log(`File uploaded successfully. ${res.Location}`);

      if (res) {
        return {status: 200, message: 'File uploaded successfully', fileUrl: res.Location};
      } else {
        return {status: 404, message: 'File not uploaded', fileUrl: ''};
      }
      
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Body() createUserDto: CreateUserDto, @GetUser() authUser: User) {

    this.eventEmitter.emit(Event.USER_BEFORE_REGISTER, { createUserDto });
    const password = createUserDto.first_name+'.' + randomDigits(8);
    console.log(password);
    let {
      role_id,
      permission_id,
      first_name,
      last_name,
      username,
      email,
      image,
      // gender,
      phone_number,
      home_address,
      state_of_residence,
      lga,
      geo_political_zone
    } = createUserDto; 

    const raw_phone_number = phone_number;
    phone_number = unifyPhoneNumber(phone_number);

    const existingUser =
      await this.userService.userRepository.findOne({
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

    let fileName = '';
    if (image == '') {
       fileName = 'user.png';
    } else {
       fileName = first_name+'_'+last_name+'_'+userCustomerId+'.png';
      // to declare some path to store your converted image
      const base64Data  = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
      if (base64Data.length !== 3) {
        return new Error('Invalid input string');
      }
      const fileContents =  Buffer.from(base64Data[2], 'base64')
      const imag = fs.writeFile(`public/images/${fileName}`, fileContents, 'base64', (err) => {
        if (err) return console.error(err)
        console.log('file saved to ', `public/images/${fileName}`)
      })

      // const uploaded = await this.uploadFileToAws({name: fileName, type: 'image', data:imag});

      // return uploaded
    }

    const newUser = await this.userService.create({
      first_name,
      last_name,
      email,
      phone_number,
      home_address,
      role_id,
      permission_id,
      username,
      state_of_residence,
      lga,
      geo_political_zone,
      image: fileName,
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

    await this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: newUser });

    await this.eventEmitter.emit(Event.USER_AFTER_REGISTER, {
      user: {
        ...newUser,
        password: null,
      },
    });

    const res = await this.mailService.welcomeUser({
      id: newUser.id,
      first_name,
      last_name,
      email,
      phone_number,
      home_address,
      permission_id,
      image: fileName,
      user_code: userCustomerId,
      role: newUser.role_id,
      password: password
    });

    return success(
      {
        user:{
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          phone_number: newUser.phone_number,
          gender: newUser.gender,
          image: newUser.image,
          permisson_id: newUser.permission_id,
          username: newUser.username,
          state_of_residence: newUser.state_of_residence,
          lga: newUser.lga,
          geo_political_zone: newUser.geo_political_zone,
          user_code: newUser.user_code,
          password: null,
          email_valid: false,
          status: false,
          post_status: 'pending',
          role_id: newUser.role_id,
        },
        users: await this.userService.findAll(),
      },
      
      'User Registration',
      'User successfully registered',
    );
  }

  @Get('search')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async search(
    @Query('role') role?: any,
    @Query('query') query?: string,
    @Query('per_page') perPage: number = 12,
  ) {
    let users;

    if(role == 0){
      users = await this.userService.userRepository.find({
        where: [
          'first_name',
          'last_name',
          'phone_number',
          'email',
          'bvn',
          'user_code',
        ].map((column) => ({ [column]: Like(`%${query}%`) })),
        skip: 0,
        take: perPage,
      });
    }else{
      users = await this.userService.userRepository.find({
        where: [
          'first_name',
          'last_name',
          'phone_number',
          'email',
          'bvn',
          'user_code',
        ].map((column) => ({[ column]: Like(`%${query}%`) })),
        skip: 0,
        take: perPage,
      });
    }

    const total = users.length
    return success(
      users.map((user) => {
        return {
          ...user,
          password: null,
        };
      }),
      'Users',
      'Users list',
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
    const total = await this.userService.userRepository.count(_filter);
    const users = await this.userService.userRepository.find({
                                                                take: perPage,
                                                                skip: (page - 1) * perPage,
                                                                order: {
                                                                  created_at: "DESC",
                                                              },
    });
    return success(
      users.map((user) => {
        return {
          ...user,
          password: null,
        };
      }),
      'Users',
      'Users list',
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
    const user = await this.userService.findOne(id);
    return success(
      user ? {
        ...user,
        password: null,
        pin: mask(user.pin),
        bvn: mask(user.bvn),
      } : null,
      'Users',
      'User details',
    );
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    // console.log(user);
    // return user.image;

    let userCustomerId = '' + randomDigits(8);

    let fileName = '';
    if (user.image == '') {
      const useer = await this.userService.findOne(id);
       fileName = useer.image;
    } else {
      const imageName = user.first_name.replace(' ', "_")+`_${userCustomerId}`
      const base64Data = new Buffer.from(user.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const type = user.image.split(';')[0].split('/')[1];
      const uploaded = await this.uploadFileToAws({name: imageName, type: type, data:base64Data});
      fileName = uploaded.fileUrl;
    }

   const result = await this.userService.update(id, {
      ...user,
      ...(user?.image ? { image: fileName } : {}),
      ...(user?.phone_number ? { phone_number: user.phone_number } : {})
    });

    return success(
      {
        id,
        user: await this.userService.findOne(id)
      },
      'Users',
      'User details updated',
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return success(
      {
        id,
      },
      'Users',
      'User deleted',
    );
  }

  @Get('metrics')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async metrics(
    @Query('page') page: number = 1,
    @Query('per_page') perPage: number = 12,
    @Query('query') query?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const users = await this.userService.userRepository.count({
      take: perPage,
      skip: (page - 1) * perPage,
      where: makeFilter(query, from, to, [
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'bvn',
        'user_code',
      ]),
    });
    return success({ users }, 'User Metrics', 'Collection of user metrics');
  } 
  
  @Patch('change-password/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async resetPassword(@Param('id') id: string, @Body() passwords: ChangeResetPasswordDto,) {
    
    const existingUser =  await this.userService.userRepository.findOne({
      select: ['id', 'email', 'first_name', 'last_name', 'phone_number', 'image', 'user_code', 'password'],
      where: [{ id: id }],
    }) ?? null;

    const checkCurrentPassword = bcrypt.compareSync(passwords.current_password, existingUser.password);

    if(checkCurrentPassword){
      if(passwords.new_password == passwords.confirm_new_password){

        if(passwords.new_password == existingUser.password){
          return error(
            'Failed',
            'Your new password can not be the same with the old password',
          );
  
        }else{

          await this.userService.update(existingUser.id, {
            password: hash(passwords.confirm_new_password),
            updated_at: timeStamp,

          });
      
          // const res = this.mailService.forgotPassword({
          //   first_name: existingUser.first_name,
          //   last_name: existingUser.last_name,
          //   email: existingUser.email,
          //   phone_number: existingUser.phone_number,
          //   image: existingUser.image,
          // });
      
          return success(
            {
              first_name: existingUser.first_name,
              last_name: existingUser.last_name,
              email: existingUser.email,
              phone_number: existingUser.phone_number,
              image: existingUser.image,
            },
            'Password Updated',
            'Password Changes Successfuly.',
          );
        }

      }else{
        return error(
          'Failed',
          'Your new password does not match.',
        );
      }

    }else{
      return error(
        'Failed',
        'Your current password does not match.',
      );
    }
  }
  
  @Get(':id/confirm-email')
  // @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async confirmEmail(@Param('id') id: string) {
    const existingUser = await this.userService.findOne(id);

    if (existingUser.email_valid == true) {
      return error(
        'Email Confirmed',
        'You have a verified email already. You cannot confirm email.',
      );
    }

    const duplicateUser =
      await this.userService.userRepository.findOne({
        select: ['id', 'email'],
        where: [{ email: existingUser.email }],
      }) ?? null;

    if (!duplicateUser?.email) {
      return error('Fail', 'Email address not exists');
    }

    await this.userService.update(id, {
      email_valid: true,
      post_status: 'verified',
      // status: true,
    });

    this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: { ...existingUser, email_valid: true } });

    return success([], 'Email Confirmed', 'Email address successfully verified.');
  }

  @Patch(':id/update-user-code')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async updateUserCode(@Param('id') id: string, @Body() body: UpdateUserCodeDto) {
    
    const existingCode = await this.userService.userRepository.findOne({ 
              select: ['id', 'user_code'],
              where: [{ id: id , user_code: body.code }]
            });

    if (!existingCode) {
      return error(
        'Code Update',
        'User code dose not exist. To chance to new code kindly provide the previous user code.',
      );
    }

    let userCode = '' + randomDigits(8);

    const confirmCode = await this.userService.userRepository.findOne({ 
      select: ['id', 'user_code'],
      where: [{ user_code: userCode }]
    });

    if (confirmCode) {
       userCode = '' + randomDigits(8);
    } 

    const duplicateUser =
      await this.userService.userRepository.findOne({
        select: ['id', 'user_code'],
        where: [{ user_code: userCode }]
      }) ?? null;

    if (duplicateUser?.user_code) {
      return error('User Code', 'User Code already exists, Kindly run again');
    }

    await this.userService.update(id, {
      user_code: userCode
    });

    return success(userCode, 'User Code Update', 'User code successfully Changed.');
  }

  @Patch(':id/update-email')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async updateEmail(@Param('id') id: string, @Body() body: UpdateEmailDto) {
    const existingUser = await this.userService.findOne(id);

    if (existingUser.email_otp_verified) {
      return error(
        'Email Update',
        'You have a verified email already. You cannot update email.',
      );
    }

    const duplicateUser =
      await this.userService.userRepository.findOne({
        select: ['id', 'email'],
        where: [{ email: body.email }],
      }) ?? null;

    if (duplicateUser?.email) {
      return error('Email Update', 'Email address already exists');
    }

    await this.userService.update(id, {
      email: body.email,
    });

    this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: { ...existingUser, email: body.email } });

    return success(body, 'Email Update', 'Email address successfully updated.');
  }

  @Patch(':id/update-phone-number')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async updatePhoneNumber(
    @Param('id') id: string,
    @Body() body: UpdatePhoneNumberDto,
  ) {
    const existingUser = await this.userService.findOne(id);

    if (existingUser.phone_otp_verified) {
      return error(
        'Phone Number Update',
        'You have a verified phone number already. You cannot update phone number.',
      );
    }

    const phone_number = unifyPhoneNumber(body.phone_number);
    const duplicateUser =
      await this.userService.userRepository.findOne({
        select: ['id', 'phone_number'],
        where: [{ phone_number }, { phone_number: body.phone_number }],
      }) ?? null;

    if (duplicateUser?.phone_number) {
      return error('Phone Number Update', 'Phone number already exists');
    }

    await this.userService.update(id, {
      phone_number,
    });

    return success(
      body,
      'Phone Number Update',
      'Phone Number address successfully updated.',
    );
  }

  @Patch(':id/suspend')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async suspend(@Param('id') id: string, @GetUser() authUser: User, @Body() body: MessageDto) {
    const { message } = body

    const existingUser = await this.userService.findOne(id);
    if (existingUser.closed_at !== null) {
      return error(
        'Account Status',
        'This account is currently being reviewed.',
      );
    }
    const updatedRes = await this.userService.update(id, {
      suspended_at: timeStamp,
      post_status: 'suspended',
      status: false,
      updated_at: timeStamp,
      updated_by: authUser.id,
    });

  if(updatedRes){
        const newUpate = await this.userService.findOne(id)
    return success({
          user: newUpate,
          users: await this.userService.findAll()
      },
      'Account Status',
      'This account has been placed under review.',
    );
  }
}

  @Patch(':id/unsuspend')
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

    if(updatedRes){
      const newUpate = await this.userService.findOne(id)
      return success({
        user: newUpate,
        users: await this.userService.findAll()
      },
        'Account Status',
        'Your account is now active.',
      );
    }

    // this.eventEmitter.emit(Event.LOG_ACTIVITY, {
    //   action: 'Unsuspend',
    //   category: 'User',
    //   message: null,
    //   data: {
    //     message,
    //     id,
    //   },
    //   user: {
    //     id: authUser.id,
    //   },
    // });

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

if(updatedRes){
      const newUpate = await this.userService.findOne(id)
  return success({
        user: newUpate,
        users: await this.userService.findAll()
      },
      'Account Status',
      'Your account has been closed',
    );
  }
}

  @Patch(':id/open-account')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async openAccount(@Param('id') id: string, @GetUser() authUser: User, @Body() body: MessageDto) {
    const { message } = body

    const existingUser = await this.userService.findOne(id);

    if (existingUser.closed_at === null) {
      return error('Open Account', 'Your account is not closed.');
    }
    await this.userService.update(id, {
      closed_at: null,
    });

    this.eventEmitter.emit(Event.LOG_ACTIVITY, {
      action: 'Open',
      category: 'User',
      message: null,
      data: {
        message,
        id,
      },
      user: {
        id: authUser.id,
      },
    });

    return success(
      {
        user: await this.userService.findOne(id),
        users: await this.userService.findAll()
      },
      'Account Status',
      'Your account is now active',
    );
  }

  @Get('users-managment-analysis')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async usersMgntDashboard() {

    const total_user = await this.userService.findAll();
    const pendingUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ post_status: 'pending'}]
    });
    const activeUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ status: 1}]
    });
    const inActiveUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ status: 0}]
    });

    const closedUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{post_status: 'closed'}]
    });

    const emailValid = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ email_valid: 0}]
    });
    const onlineUsers = await this.userService.userRepository.find({ 
      select: ['id', 'user_code'],
      where: [{ post_status: 'online'}]
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
