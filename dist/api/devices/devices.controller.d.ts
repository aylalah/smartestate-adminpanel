import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto, StatusDto, ValidateAgentOptDto } from './dto/update-device.dto';
import { User } from '../user';
import { EventEmitter2 } from 'eventemitter2';
import { MailService } from '../../mail/mail.service';
export declare class DevicesController {
    private readonly devicesService;
    private readonly mailService;
    private readonly eventEmitter;
    constructor(devicesService: DevicesService, mailService: MailService, eventEmitter: EventEmitter2);
    uploadFileToAws(file: any): Promise<{
        status: number;
        message: string;
        fileUrl: any;
    }>;
    create(createDeviceDto: CreateDeviceDto, authUser: User): Promise<{
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
    update(id: string, updateDeviceDto: UpdateDeviceDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    generateDeviceOpt(id: string, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    validateAgentOpt(id: string, authUser: User, newOtp: ValidateAgentOptDto): Promise<{
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
    usersMgntDashboard(): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
}
