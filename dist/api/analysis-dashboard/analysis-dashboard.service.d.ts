import { CreateAnalysisDashboardDto } from './dto/create-analysis-dashboard.dto';
import { UpdateAnalysisDashboardDto } from './dto/update-analysis-dashboard.dto';
export declare class AnalysisDashboardService {
    create(createAnalysisDashboardDto: CreateAnalysisDashboardDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAnalysisDashboardDto: UpdateAnalysisDashboardDto): string;
    remove(id: number): string;
}
