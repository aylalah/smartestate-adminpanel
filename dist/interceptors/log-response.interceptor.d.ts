import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable } from 'rxjs';
export declare class LogResponseInterceptor implements NestInterceptor {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
