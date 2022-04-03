import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategyService_base: new (...args: any[]) => Strategy;
export declare class LocalStrategyService extends LocalStrategyService_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<any>;
}
export {};
