import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Permission } from './entities/permission.entity';
export declare class PermissionsService {
    permissionRepository: Repository<Permission>;
    private readonly eventEmitter;
    constructor(permissionRepository: Repository<Permission>, eventEmitter: EventEmitter2);
    create(permission: Partial<Permission>): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findOne(id: string): Promise<Permission>;
    update(id: string, permission: Partial<Permission>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
