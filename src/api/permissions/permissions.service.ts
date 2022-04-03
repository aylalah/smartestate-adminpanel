import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Permission } from './entities/permission.entity';
  
  @Injectable()
  export class PermissionsService {
  
    constructor(
      @InjectRepository(Permission) public permissionRepository: Repository<Permission>,
      private readonly eventEmitter: EventEmitter2
    ) {}
  
    create(permission: Partial<Permission>): Promise<Permission> {
      return this.permissionRepository.save(permission);
    }
  
    findAll(): Promise<Permission[]> {
      return this.permissionRepository.find();
    }
  
    findOne(id: string): Promise<Permission> {
      return this.permissionRepository.findOne(id);
    }
  
    async update(id: string, permission: Partial<Permission>) {
  
      const existingPermission = await this.permissionRepository.findOne({
        select: ['id', 'permission_name', 'slug'],
        where: [ { id } ]
      })
      const result = await this.permissionRepository.update(id, { ...permission });
      return result
    }
  
    remove(id: string): Promise<DeleteResult> {
      return this.permissionRepository.delete(id);
    }
}
