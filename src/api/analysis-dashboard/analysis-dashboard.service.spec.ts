import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisDashboardService } from './analysis-dashboard.service';

describe('AnalysisDashboardService', () => {
  let service: AnalysisDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalysisDashboardService],
    }).compile();

    service = module.get<AnalysisDashboardService>(AnalysisDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
