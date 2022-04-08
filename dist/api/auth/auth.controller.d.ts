import { AuthService } from './auth.service';
import { EventEmitter2 } from 'eventemitter2';
import { User, UserService } from '../user';
import { RegisterUserDto } from './dto/create-user.dto';
import { LoginUserDto, RefreshTokenDto, InitiateResetPasswordDto, UpdateResetPasswordDto, UpdateProfileDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
export declare class AuthController {
    private readonly userService;
    private readonly mailService;
    private readonly authService;
    private readonly eventEmitter;
    private readonly jwtService;
    constructor(userService: UserService, mailService: MailService, authService: AuthService, eventEmitter: EventEmitter2, jwtService: JwtService);
    register(user: RegisterUserDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    } | Error>;
    login(user: LoginUserDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    refresh(refreshToken: RefreshTokenDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    forgotPassword(initialEmail: InitiateResetPasswordDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    tokenStaus(token: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    } | {
        status: string;
        title: string;
        message: string;
    }>;
    resetPassword(token: string, passwords: UpdateResetPasswordDto): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    } | {
        status: string;
        title: string;
        message: string;
    }>;
    user(authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    update(user: UpdateProfileDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
}
