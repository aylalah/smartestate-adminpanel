import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto, StatusDto } from './dto/update-institution.dto';
import { User } from '../user';
import { EventEmitter2 } from 'eventemitter2';
import { InstitutionUsersService } from 'src/api/estate-users/institution-users.service';
import { MailService } from '../../mail/mail.service';
export declare class InstitutionsController {
    private readonly institutionUsersService;
    private readonly institutionsService;
    private readonly mailService;
    private readonly eventEmitter;
    constructor(institutionUsersService: InstitutionUsersService, institutionsService: InstitutionsService, mailService: MailService, eventEmitter: EventEmitter2);
    uploadFileToAws(file: any): Promise<{
        status: number;
        message: string;
        fileUrl: any;
    }>;
    create(createInstitutionDto: CreateInstitutionDto, authUser: User): Promise<{
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
    findAllNoPagination(): Promise<{
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
    update(id: string, institution: UpdateInstitutionDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    suspend(id: string, authUser: User, body: StatusDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    close(id: string, authUser: User, body: StatusDto): Promise<{
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
}
