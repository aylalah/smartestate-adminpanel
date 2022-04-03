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
import { AnalysisDashboardService } from './analysis-dashboard.service';
import { CreateAnalysisDashboardDto } from './dto/create-analysis-dashboard.dto';
import { UpdateAnalysisDashboardDto } from './dto/update-analysis-dashboard.dto';
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
import * as moment from "moment";
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
import { MailService } from '../../mail/mail.service';

@Controller('analysis-dashboard')
export class AnalysisDashboardController {

  constructor(
    @Inject(forwardRef(() => AnalysisDashboardService))
    private readonly analysisDashboardService: AnalysisDashboardService,
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => InstitutionsService)) private readonly institutionsService: InstitutionsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get('admin')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async getAdminDashboard() {

    const total_user = await this.userService.findAll();
    const total_institutions = await this.institutionsService.findAll();

    return success(
      {
        users: total_user.length,
        institutions: total_institutions.length,
      },
      'admin',
      'Admin dashboard analysis',
    );
  }
  

  // @Post()
  // create(@Body() createAnalysisDashboardDto: CreateAnalysisDashboardDto) {
  //   return this.analysisDashboardService.create(createAnalysisDashboardDto);
  // }

  // @Get()
  // findAll() {
  //   return this.analysisDashboardService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.analysisDashboardService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAnalysisDashboardDto: UpdateAnalysisDashboardDto) {
  //   return this.analysisDashboardService.update(+id, updateAnalysisDashboardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.analysisDashboardService.remove(+id);
  // }
}
