import { PartialType } from '@nestjs/swagger';
import { CreateAnalysisDashboardDto } from './create-analysis-dashboard.dto';

export class UpdateAnalysisDashboardDto extends PartialType(CreateAnalysisDashboardDto) {}
