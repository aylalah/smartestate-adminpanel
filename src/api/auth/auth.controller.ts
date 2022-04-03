import {
  Body,
  Controller,
  forwardRef,
  Get,
  Param,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './local-strategy/local.guard';
import { JwtGuard } from './jwt-strategy/jwt.guard';
import {
  error,
  success,
  Event,
  hash,
  randomDigits,
  random,
  unifyPhoneNumber,
  mask,
  isNullOrUndefined,
} from '../../utils';
import { EventEmitter2 } from 'eventemitter2';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User, UserService } from '../user';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto, RefreshTokenDto, InitiateResetPasswordDto, UpdateResetPasswordDto, UpdateProfileByServiceDto, UpdateProfileDto } from './dto/update-user.dto';
import { GetUser } from '../../decorators';
import * as moment from "moment";
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { Buffer } from 'buffer';
import { Any } from 'typeorm';
import { join } from 'path';
import { MailService } from '../../mail/mail.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

const fs = require("fs");
const path = require("path");
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");

@Controller('user')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly eventEmitter: EventEmitter2,
    // private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    this.eventEmitter.emit(Event.USER_BEFORE_REGISTER, { user });
    const password = user.first_name+'.' + randomDigits(8);
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
    } = user; 

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

    // get referrer ID
    // const referrer = referral_code? await this.userService.userRepository.findOne({
    //       select: ['id', 'email', 'phone_number'],
    //       where: [{ referral_code }],
    //     })
    //   : null

    // generate user customer id
    const customerIdExist = async (user_code: string) => {
      const user = await this.userService.userRepository.findOne({
        user_code,
      });
      return !!user?.user_code;
    };

    let userCustomerId = '' + randomDigits(12);
    while ((await customerIdExist(userCustomerId)) === true) {
      userCustomerId = '' + randomDigits(12);
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
    }

    const res = this.mailService.welcomeUser({
      first_name,
      last_name,
      email,
      phone_number,
      home_address,
      permission_id,
      image: fileName,
      user_code: userCustomerId,
      password: password
    });

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
      email_valid: false,
      status: false,
      post_status: 'pending',
      user_code: userCustomerId,
      password: hash(password),
      ondording_date: todatsDate,
      created_at: timeStamp,
    });

    this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: newUser });

    this.eventEmitter.emit(Event.USER_AFTER_REGISTER, {
      user: {
        ...newUser,
        password: null,
        pin: null,
        bvn: null,
      },
    });
  
    const token = await this.authService.login(newUser);

    return success(
      {
        user:{
          token: token.token,
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          phone_number: newUser.phone_number,
          gender: newUser.gender,
          image: newUser.image,
          permission_id: newUser.permission_id,
          username: newUser.username,
          state_of_residence: newUser.state_of_residence,
          lga: newUser.lga,
          geo_political_zone: newUser.geo_political_zone,
          user_code: newUser.user_code,
          password: null,
          pin: mask(newUser.pin),
          bvn: mask(newUser.bvn),
        },
        users: await this.userService.findAll(),
      },
      
      'User Registration',
      'User successfully registered',
    );
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() user: LoginUserDto, @GetUser() authUser: User) {
    this.eventEmitter.emit(Event.USER_BEFORE_LOGIN, { user });
    const token = await this.authService.login(authUser);
    const userMeta = {
      device_id: user?.device_id ?? authUser.device_id,
      device_type: user?.device_type ?? authUser.device_type,
      // gcm_device_token: user?.gcm_device_token ?? authUser.gcm_device_token,
    }

    this.userService.update(authUser.id, userMeta);
    const {
      first_name,
      last_name,
      email,
      phone_number,
      device_id,
      device_type,
      user_code,
      permission,
    } = authUser;

    this.eventEmitter.emit(Event.USER_AFTER_LOGIN, { user: { ...authUser, ...userMeta } });

    if (!authUser?.email_valid) {
      throw new UnauthorizedException('Your email have not been verified.');
    }

    if (authUser?.status == false) {
      throw new UnauthorizedException('Your account have not been activated by the admin');
    }

    if (authUser?.post_status == 'suspended') {
      throw new UnauthorizedException('Your account is being reviewed, kindly reach out to us');
    }
    return success(
      {
        token: token.token,
        id: authUser.id,
        first_name,
        last_name,
        email,
        image: authUser.image,
        phone_number,
        device_id,
        device_type,
        user_code,
        password: null,
        permission: permission,
        // acquire_hash: createHmac('sha256', this.configService.get('ACQUIRE_SECRET')).update(email).digest('hex'),
      },
      'Sign In',
      'Sign in was successful',
    );

  }

  @Post('refresh-token')
  async refresh(@Body() refreshToken: RefreshTokenDto) {

    const oldToken = refreshToken.token

    // try {
    //   const payload = this.jwtService.verify(expiredToken)
    // } catch (e) {
    //   return error('Token Refresh', e.message);
    // }

    const payload = this.jwtService.decode(oldToken)
    const id = payload?.sub;
    if (!id) {
      return error('Token Refresh', 'You need to login again :)');
    }

    const user = await this.userService.findOne(id);
    if (!user) {
      return error('Token Refresh', 'You need to login again :)');
    }

    const authUser = await this.authService.login(user);
    
    return success(
      {
        ...authUser,
      },
      'Token Refresh',
      'Token refresh was successful',
    );
  }

  @Post('forgot-password')
  @ApiBearerAuth()
  async forgotPassword(@Body() initialEmail: InitiateResetPasswordDto) {
    const existingUser =  await this.userService.userRepository.findOne({
      select: ['id', 'email', 'first_name', 'last_name', 'phone_number', 'image', 'user_code', 'email_token'],
      where: [{ email: initialEmail.email }],
    }) ?? null;

    if (!existingUser) {
      return error(
        'Failed',
        'Email address dose not exist.',
      );
    }

    const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; 
    const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"]; 
    const allUniqueChars = [..."-@#$%"];
    const allNumbers = [..."0123456789"];

    const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];

   const emailtoken = [...Array(15)].map(i => base[Math.random()*base.length|0]).join('');

    await this.userService.update(existingUser.id, {
      email_token: emailtoken,
      updated_at: timeStamp
    });

    // const res = this.mailService.forgotPassword({
    //   id: existingUser.id,
    //   first_name: existingUser.first_name,
    //   last_name: existingUser.last_name,
    //   email: existingUser.email,
    //   phone_number: existingUser.phone_number,
    //   image: existingUser.image,
    //   user_code: existingUser.user_code,
    //   token: emailtoken
    // });

    this.eventEmitter.emit(Event.NEVER_BOUNCE_VERIFY, { user: { ...existingUser,  email_token: emailtoken } });

    return success({"email_token": emailtoken}, 'New password initiation successful', 'An email have been sent to you, kindly check and reset your password.');
  }

  @Get('check-email-token/:token')
  // @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async tokenStaus(@Param('token') token: string) {

    // return token;

    const existingToken =  await this.userService.userRepository.findOne({
      select: ['id', 'email', 'email_token', 'updated_at'],
      where: [{ email_token: token }],
    }) ?? null;

    if (!existingToken) {
      return {
        status: 'error',
        title: 'Failed',
        message: 'No password request.',
      }
    }

    const date = moment(existingToken.updated_at).format("YYYY-MM-DD HH:mm:ss.SSS");
    const currentTimestamp = moment(new Date()).format('HH:mm:ss');
    const duration = moment().diff(date, 'minutes');

    if (duration <= 30) {
      return success(
        {  
          email: existingToken.email, 
          token: existingToken.email_token,
          minute: duration 
        },
        'valid',
        'Email token is valid.',
      );
    }else{
      return {
        status: 'error',
        title: 'invalide',
        message: 'Email token has expired.',
      }
    }
  }

  @Patch('reset-password/:token')
  // @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async resetPassword(@Param('token') token: string, @Body() passwords: UpdateResetPasswordDto,) {

    const tokenStatus = await this.tokenStaus(token);

    if (tokenStatus.status == 'error') {
      return {
        status: 'error',
        title: 'invalide',
        message: 'Expired Email token.',
      }
    }
    
    const existingToken =  await this.userService.userRepository.findOne({
      select: ['id', 'email', 'first_name', 'last_name', 'phone_number', 'image', 'user_code', 'email_token'],
      where: [{ email_token: token }],
    }) ?? null;

    await this.userService.update(existingToken.id, {
      password: hash(passwords.confirm_new_password),
      email_token: null,
      updated_at: timeStamp,
    });

    // const res = this.mailService.newPassword({
    //   first_name: existingToken.first_name,
    //   last_name: existingToken.last_name,
    //   email: existingToken.email,
    //   phone_number: existingToken.phone_number,
    // });

    return success({"email": existingToken.email}, 'Password Reset Successfuly', 'New password have been reset successfuly.');
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async user(@GetUser() authUser: User) {
    const user = await this.userService.findOne(authUser.id);
    return success(
      {
        ...user,
        password: null,
        pin: mask(user.pin),
        bvn: mask(user.bvn),
        // acquire_hash: createHmac('sha256', this.configService.get('ACQUIRE_SECRET')).update(user.email).digest('hex')
      },
      'User Profile',
      'User profile details',
    );
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Body() user: UpdateProfileDto, @GetUser() authUser: User) {
    await this.userService.update(authUser.id, {
      ...user,
    });
    const existingUser = await this.userService.findOne(authUser.id);
    return success(
      
      {
        ...existingUser,
        password: null,
      },
      'Users',
      'User details updated',
    );
  }

}
