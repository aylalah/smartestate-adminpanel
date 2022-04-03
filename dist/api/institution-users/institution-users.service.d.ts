import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InstitutionUser } from 'src/api/institution-users/entities/institution-user.entity';
export declare class InstitutionUsersService {
    institutionUserRepository: Repository<InstitutionUser>;
    private readonly eventEmitter;
    constructor(institutionUserRepository: Repository<InstitutionUser>, eventEmitter: EventEmitter2);
    create(institutionUser: Partial<InstitutionUser>): Promise<InstitutionUser>;
    findAll(): Promise<InstitutionUser[]>;
    findOne(id: string): Promise<InstitutionUser>;
    update(id: string, agent: Partial<InstitutionUser>): Promise<import("typeorm").UpdateResult>;
    remove(user_id: string): Promise<DeleteResult>;
}
