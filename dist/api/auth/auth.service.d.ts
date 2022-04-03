import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, configService: ConfigService);
    getUser(id: string): Promise<any>;
    validateUser(email: string, secret: string): Promise<any>;
    login(user: any): Promise<{
        id: any;
        token: string;
    }>;
}
