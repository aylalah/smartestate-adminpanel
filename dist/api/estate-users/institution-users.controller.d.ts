import { InstitutionUsersService } from './institution-users.service';
import { CreateInstitutionUserDto } from './dto/create-institution-user.dto';
import { UpdateInstitutionUserDto, MessageDto } from './dto/update-institution-user.dto';
import { User, UserService } from '../user';
import { InstitutionsService } from 'src/api/estates/institutions.service';
import { EventEmitter2 } from 'eventemitter2';
import { MailService } from '../../mail/mail.service';
export declare class InstitutionUsersController {
    private readonly institutionUsersService;
    private readonly userService;
    private readonly institutionsService;
    private readonly eventEmitter;
    private readonly mailService;
    constructor(institutionUsersService: InstitutionUsersService, userService: UserService, institutionsService: InstitutionsService, eventEmitter: EventEmitter2, mailService: MailService);
    create(createInstitutionUserDto: CreateInstitutionUserDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    search(query?: string, perPage?: number): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    findAll(page?: number, perPage?: number, query?: string, from?: string, to?: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    findOne(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    update(id: string, user: UpdateInstitutionUserDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    unsuspend(id: string, authUser: User, body: MessageDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    closeAccount(id: string, authUser: User, body: MessageDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    remove(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    usersMgntDashboard(): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
}
