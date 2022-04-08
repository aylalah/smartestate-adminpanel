import { UserService } from '../user';
import { InstitutionsService } from 'src/api/estates/institutions.service';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InstitutionUser } from 'src/api/estate-users/entities/institution-user.entity';
import { MailService } from '../../mail/mail.service';
export declare class InstitutionUsersService {
    private readonly userService;
    private readonly institutionsService;
    institutionUserRepository: Repository<InstitutionUser>;
    private readonly eventEmitter;
    private readonly mailService;
    constructor(userService: UserService, institutionsService: InstitutionsService, institutionUserRepository: Repository<InstitutionUser>, eventEmitter: EventEmitter2, mailService: MailService);
    create(institutionUser: Partial<InstitutionUser>): Promise<InstitutionUser>;
    createEstateUser(createInstitutionUserDto: any): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    findAll(): Promise<InstitutionUser[]>;
    findOne(id: string): Promise<InstitutionUser>;
    update(id: string, agent: Partial<InstitutionUser>): Promise<import("typeorm").UpdateResult>;
    remove(user_id: string): Promise<DeleteResult>;
}
