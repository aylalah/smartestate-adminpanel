import { AnalysisDashboardService } from './analysis-dashboard.service';
import { UserService } from '../user';
import { InstitutionsService } from 'src/api/estates/institutions.service';
import { EventEmitter2 } from 'eventemitter2';
export declare class AnalysisDashboardController {
    private readonly analysisDashboardService;
    private readonly userService;
    private readonly institutionsService;
    private readonly eventEmitter;
    constructor(analysisDashboardService: AnalysisDashboardService, userService: UserService, institutionsService: InstitutionsService, eventEmitter: EventEmitter2);
    getAdminDashboard(): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
}
