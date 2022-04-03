import { MiddlewareConsumer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
export declare class AppModule {
    private readonly moduleRef;
    private readonly configService;
    constructor(moduleRef: ModuleRef, configService: ConfigService);
    configure(consumer: MiddlewareConsumer): void;
    onApplicationBootstrap(): void;
}
