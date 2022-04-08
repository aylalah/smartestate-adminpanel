import {
  Injectable,
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
import { CreateInstitutionUserDto } from './dto/create-institution-user.dto';
import { UpdateInstitutionUserDto } from './dto/update-institution-user.dto';
import { User, UserService } from '../user';
import { InstitutionsService} from 'src/api/estates/institutions.service';
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
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InstitutionUser } from 'src/api/estate-users/entities/institution-user.entity';
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

@Injectable()
export class InstitutionUsersService {

  constructor(
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => InstitutionsService)) private readonly institutionsService: InstitutionsService,
    @InjectRepository(InstitutionUser) public institutionUserRepository: Repository<InstitutionUser>,
    private readonly eventEmitter: EventEmitter2,
    private readonly mailService: MailService,
  ) {}

  create(institutionUser: Partial<InstitutionUser>): Promise<InstitutionUser> {
    return this.institutionUserRepository.save(institutionUser);
  }


  async createEstateUser( createInstitutionUserDto: any) {

    const password = createInstitutionUserDto.first_name+'.' + randomDigits(8);
    console.log(password);
    let {
      role_id,
      role,
      permission_id,
      permission,
      first_name,
      last_name,
      username,
      name,
      email,
      phone_number,
      home_address,
      state_of_residence,
      lga,
      estate_id,
      estate_name,
      estate_code,
      account_name,
      bank,
      web_url,
      created_by
    } = createInstitutionUserDto; 

    const raw_phone_number = phone_number;
    phone_number = unifyPhoneNumber(phone_number);

    const existingUser = await this.userService.userRepository.findOne({
        select: ['id', 'phone_number', 'email'],
        where: [{ email }],
      }) ?? null;


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


      // enforce unique email code
      if (existingUser?.email === email) {
      const newAgent = await this.institutionUserRepository.save({
        user_id: existingUser.id,
        estate_id,
        status: 2,
        created_by: created_by,
        created_at: todatsDate,
      });

      const res = await  this.mailService.welcomeInstitutionUser({
        id: newAgent.id,
        first_name,
        last_name,
        email,
        name,
        estate_id,
        phone_number,
        home_address,
        permission_id,
        estate_name,
        estate_code,
        account_name,
        bank,
        web_url,
        user_code: userCustomerId,
        role: role,
        permission: permission,
        password: password
      });

      return success(
        {
          user: await this.institutionUserRepository.findOne(existingUser.id),
        },
        
        'Estate User Registration',
        'Estate User successfully registered',
      );

    } else{

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
      image: 'user.png',
      user_code: userCustomerId,
      email_valid: false,
      status: false,
      post_status: 'pending',
      password: hash(password),
      created_by: created_by,
      ondording_date: todatsDate,
      created_at: timeStamp,
    });


    if (newUser) {
      const newAgent = await this.institutionUserRepository.save({
        user_id: newUser.id,
        estate_id,
        status: 2,
        created_by: created_by,
        created_at: todatsDate,
      });

      const res = this.mailService.welcomeInstitutionUser({
        id: newAgent.id,
        first_name,
        last_name,
        name,
        email,
        estate_id,
        phone_number,
        home_address,
        permission_id,
        estate_name,
        estate_code,
        account_name,
        bank,
        web_url,
        user_code: userCustomerId,
        role: role,
        permission: permission,
        password: password
      });
  
    } 

    this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: newUser });

    this.eventEmitter.emit(Event.USER_AFTER_REGISTER, {
      user: {
        ...newUser,
        password: null,
      },
    });

    return success(
      {
        user: await this.institutionUserRepository.findOne(newUser.id),
      },
      
      'Estate User Registration',
      'Estate User successfully registered',
    );
    }
  }

  findAll(): Promise<InstitutionUser[]> {
    return this.institutionUserRepository.find();
  }

  findOne(id: string): Promise<InstitutionUser> {
    return this.institutionUserRepository.findOne(id);
  }

  async update(id: string, agent: Partial<InstitutionUser>) {

    const existingAgent = await this.institutionUserRepository.findOne({
      select: ['id', 'user_id'],
      where: [ { user_id: id } ]
    })
    const result = await this.institutionUserRepository.update(id, { ...agent });
    return result
  }

  remove(user_id: string): Promise<DeleteResult> {
    return this.institutionUserRepository.delete({ user_id });
  }
}
