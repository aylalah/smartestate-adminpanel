import { HttpService } from '@nestjs/common';
import { UserService } from './user.service';
import { MessageDto, UpdateEmailDto, UpdateUserCodeDto, UpdatePhoneNumberDto, ChangeResetPasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailService } from '../../mail/mail.service';
export declare class UserController {
    private readonly userService;
    private readonly configService;
    private readonly mailService;
    private readonly eventEmitter;
    private httpService;
    constructor(userService: UserService, configService: ConfigService, mailService: MailService, eventEmitter: EventEmitter2, httpService: HttpService);
    uploadFileToAws(file: any): Promise<{
        status: number;
        message: string;
        fileUrl: any;
    }>;
    create(createUserDto: CreateUserDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    } | Error>;
    search(role?: any, query?: string, perPage?: number): Promise<{
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
    update(id: string, user: UpdateUserDto): Promise<{
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
    metrics(page?: number, perPage?: number, query?: string, from?: string, to?: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    resetPassword(id: string, passwords: ChangeResetPasswordDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    confirmEmail(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    updateUserCode(id: string, body: UpdateUserCodeDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    updateEmail(id: string, body: UpdateEmailDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    updatePhoneNumber(id: string, body: UpdatePhoneNumberDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    suspend(id: string, authUser: User, body: MessageDto): Promise<{
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
    openAccount(id: string, authUser: User, body: MessageDto): Promise<{
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
