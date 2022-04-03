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
import * as moment from "moment";
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto, StatusDto} from './dto/update-role.dto';
import * as RolesMock from 'src/rolesdata/roles.csv.json';
const word:any= RolesMock;

@Controller('role')
export class RoleController {
  constructor(
      @Inject(forwardRef(() => RoleService))
      private readonly userService: UserService,
      private readonly roleService: RoleService,
      private readonly eventEmitter: EventEmitter2,
    ) {}

  @Post('seed_role')
  async autoCreate(@Body() createRoleDto: CreateRoleDto, @GetUser() authUser: User) {

    console.log(word);

    const newRole = await this.roleService.create(word);

    return success(
      {
        roles: await this.roleService.findAll(),
      },
      'Role Imported',
      'Role successfuly created',
    );
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Body() createRoleDto: CreateRoleDto, @GetUser() authUser: User) {

    console.log(createRoleDto);

    let {
      user_type,
      role_name,
      description,
      slug,
    } = createRoleDto;

    const existingRole = await this.roleService.roleRepository.findOne({
      select: ['id', 'role_name', 'slug'],
      where: [{ role_name: role_name }],
    }) ?? null;

    // enforce unique phone number code
    if (existingRole?.role_name === role_name) {
      return error('New role exist', 'Looks like you already have this role. role already exist');
    }


    const newRole = await this.roleService.create({
      user_type,
      role_name,
      description,
      slug,
      status: 1,
      created_by: authUser.id,
      created_at: todatsDate,
      updated_at: now
    });

    // return this.productService.create(createProductDto);

    return success(
      {
        role: {
          role_name: newRole.role_name,
          description: newRole.description,
          slug: newRole.slug,
          status
        },
        roles: await this.roleService.findAll(),
      },
      'New Role',
      'Role successfuly created',
    );
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findAll() {
    return success(
        await this.roleService.findAll(),
      'Roles',
      'Role List',
    );
  }

  @Get(':type/user-type')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findRoleByUserType(@Param('type') type: string) {
    const roles = await this.roleService.roleRepository.find({
                          select: ['id', 'user_type', 'role_name', 'slug'],
                          where: [{ user_type: type }],
                        }) ?? null;
return success(
  roles ? roles : null,
      'Roles',
      'Roles by user type',
    );
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const role = await this.roleService.findOne(id);
    return success(
      role ? {
        ...role
      } : null,
      'Role',
      'Role details',
    );
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Param('id') id: string, @Body() role: UpdateRoleDto, @GetUser() authUser: User) {

    let {
      user_type,
      role_name,
      description,
      slug
    } = role;


     const result = await this.roleService.update(id, 
      
      { 
        user_type,
        role_name,
        description,
        slug,
        updated_by: authUser.id,
        updated_at: now
      });

    return success(
      {
        id,
        product: await this.roleService.findOne(id)
      },
      'Role',
      'Role details updated',
    );
  }

  @Patch(':id/activation')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async suspend(@Param('id') id: string, @GetUser() authUser: User, @Body() body: StatusDto) {
    const { status } = body
    let statusDesc = '';

    if (status == 0) {
      statusDesc = 'Inactive';
    }

    if (status == 1) {
      statusDesc = 'Pending';
    }

    if (status == 2) {
      statusDesc = 'Active';
    }

    const existingRole = await this.roleService.findOne(id);
    if (existingRole.status == status) {
      return error(
        'Role Status',
        `'This role already ${statusDesc}.'`,
      );
    }
    await this.roleService.update(id, {
      status: status,
      updated_at: new Date(),
    });

    return success(
      {
        id,
        role: await this.roleService.findOne(id)
      },
      'Role',
      'Role activated successfully',
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const role = await this.roleService.remove(id);
    return success(
      {
        id,
        role
      },
      'Role',
      'Role deleted',
    );
  }

}
