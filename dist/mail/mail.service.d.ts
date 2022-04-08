import { ConfigService } from "@nestjs/config";
export declare class MailService {
    private readonly configService;
    appUrl: any;
    webUrl: any;
    constructor(configService: ConfigService);
    welcomeUser(data: any): Promise<void>;
    forgotPassword(data: any): Promise<void>;
    welcomeInstitutionUser(data: any): Promise<void>;
    newInstitution(data: any): Promise<void>;
    agentOtp(data: any): Promise<void>;
    newPassword(data: any): Promise<void>;
}
