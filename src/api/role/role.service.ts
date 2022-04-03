import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Role } from './entities/role.entity';
const fs = require("fs");
const path = require("path");

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role) public roleRepository: Repository<Role>,
    private readonly eventEmitter: EventEmitter2,

  ) {}

  create(role: Partial<Role>): Promise<Role> {

    return this.roleRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: string): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  async update(id: string, role: Partial<Role>) {

    const existingRole = await this.roleRepository.findOne({
      select: ['id', 'role_name', 'slug'],
      where: [ { id } ]
    })
    const result = await this.roleRepository.update(id, { ...role });
    return result
  }

  remove(id: string): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }
}
