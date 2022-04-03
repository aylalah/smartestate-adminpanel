import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Role } from './entities/role.entity';
export declare class RoleService {
    roleRepository: Repository<Role>;
    private readonly eventEmitter;
    constructor(roleRepository: Repository<Role>, eventEmitter: EventEmitter2);
    create(role: Partial<Role>): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: string): Promise<Role>;
    update(id: string, role: Partial<Role>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
