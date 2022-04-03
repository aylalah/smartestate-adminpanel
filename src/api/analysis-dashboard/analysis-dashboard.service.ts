import { Injectable } from '@nestjs/common';
import { CreateAnalysisDashboardDto } from './dto/create-analysis-dashboard.dto';
import { UpdateAnalysisDashboardDto } from './dto/update-analysis-dashboard.dto';

@Injectable()
export class AnalysisDashboardService {
  create(createAnalysisDashboardDto: CreateAnalysisDashboardDto) {
    return 'This action adds a new analysisDashboard';
  }

  findAll() {
    return `This action returns all analysisDashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analysisDashboard`;
  }

  update(id: number, updateAnalysisDashboardDto: UpdateAnalysisDashboardDto) {
    return `This action updates a #${id} analysisDashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} analysisDashboard`;
  }
}
