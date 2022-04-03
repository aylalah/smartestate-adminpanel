import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
export declare class ErrorFilter<T> implements ExceptionFilter {
    private readonly eventEmitter;
    private readonly configService;
    constructor(eventEmitter: EventEmitter2, configService: ConfigService);
    catch(exception: unknown, host: ArgumentsHost): void;
}
