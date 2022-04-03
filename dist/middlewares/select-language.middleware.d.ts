/// <reference types="node" />
import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../api/user';
import { IoRedisService } from '../io-redis';
export declare class SelectLanguageMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly userService;
    private readonly ioRedisService;
    constructor(jwtService: JwtService, userService: UserService, ioRedisService: IoRedisService);
    use(req: IncomingMessage, res: ServerResponse, next: () => void): Promise<void>;
}
