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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto, StatusDto} from './dto/update-permission.dto';
import { JwtGuard } from '../auth/jwt-strategy/jwt.guard';
import { GetUser } from '../../decorators';
import {
  error,
  Event,
  makeFilter,
  mask,
  success,
  trimUser,
  unifyPhoneNumber,
} from '../../utils';
import { UserService, User } from '../user';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { ConfigService } from '@nestjs/config';
import { MultipartFile } from 'fastify-multipart';
import { IsNull, Like, Not } from 'typeorm';
import * as PermissionMock from 'src/rolesdata/permissions.json';
const word:any= PermissionMock;

import * as moment from "moment";
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");

@Controller('permissions')
export class PermissionsController {
  constructor(
    @Inject(forwardRef(() => PermissionsService))
      private readonly userService: UserService,
      private readonly permissionsService: PermissionsService,
      private readonly eventEmitter: EventEmitter2,
    ) {}

    @Post('seed_permission')
    async autoCreate( @GetUser() authUser: User) {
  
      console.log(word);
  
      const newPermission = await this.permissionsService.create(word);
  
      return success(
        {
          roles: await this.permissionsService.findAll(),
        },
        'Permission Imported',
        'Permission successfuly created',
      );
    }

    @Post()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async create(@Body() createPermissionDto: CreatePermissionDto, @GetUser() authUser: User) {
  
      let {
        role_id,
        permission_name,
        description,
        module_access,
      } = createPermissionDto;

      const slug =  permission_name.replace(' ', '_');
  
      const existingPermission = await this.permissionsService.permissionRepository.findOne({
        select: ['id', 'permission_name', 'slug', 'status'],
        where: [{ permission_name: permission_name }],
      }) ?? null;
  
      // enforce unique phone number code
      if (existingPermission?.permission_name === permission_name) {
        return error('New role permission exist', 'Looks like you already have this role permission. permission already exist');
      }

      const newPermission = await this.permissionsService.create({
        role_id,
        permission_name,
        description,
        module_access,
        slug,
        status: 0,
        created_by: authUser.id,
        created_at: todatsDate,
        updated_at: now
      });
  
      const permissionRes =  await this.permissionsService.findOne(newPermission.id);
  
      return success(
        {
          permission: permissionRes,
          permissions: await this.permissionsService.findAll(),
        },
        'New Permission',
        'Permission successfuly created',
      );

    }
  
    @Get()
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async findAll() {
      // const permissions = this.permissionsService.findAll();

      return success(
        await this.permissionsService.findAll(),
        'Permissions',
        'Permissions list',
      );

    }
  
    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async findOne(@Param('id') id: string) {
      const permission = await this.permissionsService.findOne(id);
      return success(
        permission ? {
          ...permission
        } : null,
        'Permission',
        'Permission details',
      );
    }

    @Get('role_id/:id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async findByRoleId(@Param('id') id: any) {

      const permissions = await this.permissionsService.permissionRepository.find({
        select: ['id', 'permission_name', 'slug', 'status'],
        where: [{ role_id: id }],
      }) ?? null;
      
      return success(
        permissions ? permissions : null,
        'Permission',
        'Permission details',
      );
    }
  
    @Patch(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() permission: UpdatePermissionDto, @GetUser() authUser: User) {
  
      let {
        role_id,
        permission_name,
        description,
        module_access,
      } = permission;
  
      const slug =  permission_name.replace(' ', '_');
      const result = await this.permissionsService.update(id, 
        { 
          role_id,
          permission_name,
          description,
          module_access,
          slug,
          updated_by: authUser.id,
          updated_at: now
        });
  
        const permissionRes =  await this.permissionsService.findOne(id);

      return success(
        {
          permission: permissionRes,
          permissions: await this.permissionsService.findAll(),
        },
        'Permission',
        'Permission details updated',
      );
    }
  
    @Get(':id/activation')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async suspend(@Param('id') id: string, @GetUser() authUser: User) {
  
      const existingPermission = await this.permissionsService.findOne(id);
      if (existingPermission.status >= 1) {
        return error(
          'Permission Status',
          `'This Permission is already active.'`,
        );
      }
      await this.permissionsService.update(id, {
        status: 1,
        updated_by: authUser.id,
        updated_at: new Date(),
      });
  
      const permissionRes =  await this.permissionsService.findOne(id);

      return success(
        {
          permission: permissionRes,
          permissions: await this.permissionsService.findAll(),
        },
        'Permission',
        'Permission activated successfully',
      );
    }

    @Get(':id/close')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async onDeactivate(@Param('id') id: string, @GetUser() authUser: User) {
  
      const existingPermission = await this.permissionsService.findOne(id);
      if (existingPermission.status == 0) {
        return error(
          'Permission Status',
          `'This Permission is already de-active.'`,
        );
      }
      await this.permissionsService.update(id, {
        status: 0,
        updated_by: authUser.id,
        updated_at: new Date(),
      });
  
      const permissionRes =  await this.permissionsService.findOne(id);

      return success(
        {
          permission: permissionRes,
          permissions: await this.permissionsService.findAll(),
        },
        'Permission',
        'Permission de-activated successfully',
      );
    }
  
    @Delete(':id')
    @UseGuards(JwtGuard)
    @ApiBearerAuth()
    async remove(@Param('id') id: string) {
      const role = await this.permissionsService.remove(id);
      return success(
        {
          id,
          role
        },
        'Permission',
        'Permission deleted',
      );
    }
}
