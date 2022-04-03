import { ConfigService } from "@nestjs/config";
export declare class MailService {
    private readonly configService;
    appUrl: any;
    webUrl: any;
    constructor(configService: ConfigService);
    welcomeUser(data: any): Promise<void>;
}
