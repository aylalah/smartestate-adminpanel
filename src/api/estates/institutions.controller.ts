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
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto, StatusDto} from './dto/update-institution.dto';
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
import { User } from '../user';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { DeleteResult, Repository, getManager } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { ConfigService } from '@nestjs/config';
import { MultipartFile } from 'fastify-multipart';
import { IsNull, Like, Not } from 'typeorm';
// import { DataSource } from "typeorm"
import * as moment from "moment";
import { InstitutionUsersService} from 'src/api/estate-users/institution-users.service';

const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const AWS = require('aws-sdk');
const converter = require('json-2-csv');
const {Buffer} = require('buffer');
const fs = require("fs");

const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
import { MailService } from '../../mail/mail.service';

@Controller('estates')
export class InstitutionsController {
  constructor(
    @Inject(forwardRef(() => InstitutionUsersService)) private readonly institutionUsersService: InstitutionUsersService,
    @Inject(forwardRef(() => InstitutionsService)) private readonly institutionsService: InstitutionsService,
    private readonly mailService: MailService,
    private readonly eventEmitter: EventEmitter2,
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
  async create(@Body() createInstitutionDto: CreateInstitutionDto, @GetUser() authUser: User) {

    console.log(createInstitutionDto);

    let {
      estate_name,
      // estate_code,
      phone_number,
      email,
      contact_person_first_name,
      contact_person_last_name,
      website_name,
      plan,
      address,
      state,
      lga,
      logo,
      bank,
      account_number,
      account_name,

    } = createInstitutionDto;

    const existingInstitution = await this.institutionsService.institutionRepository.findOne({
      select: ['id', 'estate_name', 'estate_code', 'plan', 'web_url', 'email'],
      where: [{estate_name: estate_name }],
    }) ?? null;

    // enforce unique phone number code
    if (existingInstitution?.estate_name === estate_name) {
      return error('New Estate name exist', 'Looks like you already have this estate. estate already exist');
    }

       // generate user customer id
       let estateCode = '' + randomDigits(5);
       const institutionIdExist = async (institution_code: string) => {
        const estate = await this.institutionsService.institutionRepository.findOne({
          where: [{estate_code: estateCode }],
        });
        return !!estate?.estate_code;
      };
  
      while ((await institutionIdExist(estateCode)) === true) {
        estateCode = '' + randomDigits(5);
      }

      const estate_slug = estate_name.replace(' ', "_");
      const api_url =  `${process.env.URL_PROTOCOL}${website_name}.${process.env.APP_PATH}`;
      const web_url =  `${process.env.URL_PROTOCOL}${website_name}.${process.env.DOMAIN_NAME}`;

    let fileName = '';
    if (logo == '') {
       fileName = 'user.png';
    } else {
      const lagoName = estate_slug.replace(' ', "_")+`_${estateCode}`
      const base64Data = new Buffer.from(logo.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const type = logo.split(';')[0].split('/')[1];
      const uploaded = await this.uploadFileToAws({name: lagoName, type: type, data:base64Data});
      fileName = uploaded.fileUrl;
    }

    const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; 
    const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"]; 
    const allNumbers = [..."0123456789"];

    const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];

    const api_token = [...Array(25)].map(i => base[Math.random()*base.length|0]).join('');

    // Create DB:
    let baloshsmart_db;
    let errorStauts;
    const dbName = `baloshsmart_${website_name}_db`
  
    try {
      baloshsmart_db = await getManager().query(`CREATE DATABASE ${dbName}`);
   }
   catch(e){
     return error(
       'Something went wrong',
       'Cant create database; database exists',
     );
   }

    if(baloshsmart_db){
      const newInstitution = await this.institutionsService.create({
        estate_name,
        estate_code: estateCode,
        phone_number,
        email,
        base_url: `${process.env.DOMAIN_NAME}`,
        web_url,
        db_name: dbName,
        plan,
        address,
        state,
        lga,
        logo: fileName,
        api_token,
        bank,
        account_number,
        account_name,
        estate_slug,
        api_url,
        email_valid: false,
        status: 0,
        created_by: authUser.id,
        created_at: todatsDate,
        updated_at: todatsDate
      });

      const estate = await this.institutionsService.findOne(newInstitution.id);

      if(estate){ 

        const userInfo = {
          role_id: 2,
          role: 'Estate Admin',
          permission_id: '3f661651-2d29-4402-b838-ghui987try65',
          permission: 'Estate Admin Maker',
          first_name: contact_person_first_name,
          last_name: contact_person_last_name,
          username: `${contact_person_first_name}_${contact_person_last_name}`,
          name: `${contact_person_first_name}_${contact_person_last_name}`,
          email,
          phone_number,
          home_address: address,
          state_of_residence: state,
          lga,
          estate_id: estate.id,
          estate_name,
          estate_code: estateCode,
          account_name,
          bank,
          web_url,
          created_by: authUser.id,
          created_at: todatsDate,
        };
    
        const newInstitutionUser = await this.institutionUsersService.createEstateUser(userInfo);

        const res = await this.mailService.newInstitution({

          estate_id: estate.id,
          estate_name,
          estate_code: estateCode,
          name: `${authUser.first_name} ${authUser.last_name}`,
          useremail: authUser.email,
          email: email,
          base_url: `${process.env.DOMAIN_NAME}`,
          bank,
          account_number,
          account_name,
          web_url,
          address,
          db_name: dbName,
          plan,
          api_token,
          estate_slug,
          api_url,
        })
    
        return success(
          {
            estate: {
              estate_name: newInstitution.estate_name,
              estate_code: newInstitution.estate_code,
              email: newInstitution.email,
              email_valid: newInstitution.email_valid,
            },
            estates: await this.institutionsService.findAll(),
          },
          'New estate',
          'Estate successfuly created',
        );
      }else{
        return error(
          'Something went wrong',
          'Estate not created',
        );
      }
    }else{
      return error(
        'Something went wrong',
        errorStauts,
      );
    }
  }

  @Get('search')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async search(
    @Query('query') query?: string,
    @Query('per_page') perPage: number = 12,
  ) {
    let estates;

    estates = await this.institutionsService.institutionRepository.find({
      where: [
      
        'institution_name',
        'phone_number',
        'email',
        'account_name',
        'state',
        'lga',
      ].map((column) => ({ [column]: Like(`%${query}%`) })),
      skip: 0,
      take: perPage,
    });


    const total = estates.length
    return success(
      estates.map((estate) => {
        return {
          ...estate,
        };
      }),
      'Estates',
      'Estates list',
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

    const total = await this.institutionsService.institutionRepository.count(_filter);
    const estates = await this.institutionsService.institutionRepository.find(_filter);
    return success(
      estates.map((estate) => {
        return {
          ...estate,
        };
      }),
      'Estates',
      'Estates list',
      {
        current_page: _page,
        next_page: _nextPage > total ? total : _nextPage,
        prev_page: _prevPage < 1 ? null : _prevPage,
        per_page: _perPage,
        total,
      }
    );
  }

  @Get('no-pagination')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findAllNoPagination() {

    const  estates =  await this.institutionsService.findAll()
    return success(
      estates.map((estate) => {
        return {
          ...estate,
        };
      }),
      'Estates',
      'Estates list',
    );
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const estate = await this.institutionsService.findOne(id);
    return success(
      estate ? {
        ...estate
      } : null,
      'Estate',
      'Estate details',
    );
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() institution: UpdateInstitutionDto, @GetUser() authUser: User) {

    let {
      estate_name,
      estate_code,
      phone_number,
      email,
      web_url,
      plan,
      address,
      state,
      lga,
      logo,
      bank,
      account_number,
      account_name,
    } = institution;

    const existingInstitution = await this.institutionsService.institutionRepository.findOne({
      select: ['id', 'estate_name', 'estate_code', 'email', 'logo'],
      where: [{id: id }],
    }) ?? null;

    let fileName = '';
    if (logo == existingInstitution.logo) {
       fileName = existingInstitution.logo;
    } else {
      const lagoName = estate_name.replace(' ', "_")+`_${estate_code}`
      const base64Data = new Buffer.from(logo.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const type = logo.split(';')[0].split('/')[1];
      const uploaded = await this.uploadFileToAws({name: lagoName, type: type, data:base64Data});
      fileName = uploaded.fileUrl;
    }


     const result = await this.institutionsService.update(id, 
      
      { 
        estate_name,
        estate_code,
        phone_number,
        email,
        web_url,
        plan,
        address,
        state,
        lga,
        logo,
        bank,
        account_number,
        account_name,
        updated_by: authUser.id,
        updated_at: todatsDate
      });

    return success(
      {
        id,
        estate: await this.institutionsService.findOne(id)
      },
      'Estate',
      'Estate details updated',
    );
  }

  @Patch(':id/activation')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async suspend(@Param('id') id: string, @GetUser() authUser: User, @Body() body: StatusDto) {
    const { status } = body
    let statusDesc = '';

    if (status == 0) {
      statusDesc = 'inactive';
    }

    if (status == 1) {
      statusDesc = 'active';
    }

    const existingInstitution = await this.institutionsService.findOne(id);
    if (existingInstitution.status == status) {
      return error(
        'Estate Status',
        `'This estate already ${statusDesc}.'`,
      );
    }
    await this.institutionsService.update(id, {
      status: status,
      updated_at: timeStamp,
      updated_by: authUser.id,
    });

    return success(
      {
      estate: await this.institutionsService.findOne(id),
      estates: await this.institutionsService.findAll()
      },
      'Estate',
      'Estate activated successfully',
    );
  }

  @Patch(':id/close')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async close(@Param('id') id: string, @GetUser() authUser: User, @Body() body: StatusDto) {
    const { status } = body
    let statusDesc = '';

    if (status == 0) {
      statusDesc = 'inactive';
    }

    if (status == 1) {
      statusDesc = 'active';
    }

    const existingInstitution = await this.institutionsService.findOne(id);
    if (existingInstitution.status == status) {
      return error(
        'Estate Status',
        `'This Estate is already ${statusDesc}.'`,
      );
    }
    await this.institutionsService.update(id, {
      status: status,
      updated_at: timeStamp,
      updated_by: authUser.id,
    });

    return success(
      {
      institution: await this.institutionsService.findOne(id),
      institutions: await this.institutionsService.findAll()
      },
      'Estate',
      'Estate activated successfully',
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const role = await this.institutionsService.remove(id);
    return success(
      {
        id,
        role
      },
      'Estate',
      'Estate deleted',
    );
  }
}
