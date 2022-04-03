import { I18nService } from 'nestjs-i18n';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private readonly i18n;
    constructor(appService: AppService, i18n: I18nService);
}
