import { ConfigService } from '@nestjs/config';
import * as Redis from 'ioredis';
export declare class IoRedisService {
    private readonly configService;
    readonly connection: Redis.Redis;
    constructor(configService: ConfigService);
    set(key: Redis.KeyType, value: Redis.ValueType, expiryMode?: string | any[], time?: number | string, setMode?: number | string): Promise<Redis.Ok | null>;
    get(key: Redis.KeyType): Promise<string | null>;
}
