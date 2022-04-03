import { NestMiddleware } from '@nestjs/common';
export declare class ShutdownMiddleware implements NestMiddleware {
    headers: {
        'content-type': string;
        'access-control-allow-origin': string;
        'access-control-allow-methods': string;
        'access-control-allow-headers': string;
    };
    use(req: any, res: any, next: () => void): void;
    private serverResponse;
}
