/// <reference types="node" />
import { NestMiddleware } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IncomingMessage, ServerResponse } from 'http';
export declare class LogRequestMiddleware implements NestMiddleware {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    use(req: IncomingMessage, res: ServerResponse, next: () => void): void;
}
