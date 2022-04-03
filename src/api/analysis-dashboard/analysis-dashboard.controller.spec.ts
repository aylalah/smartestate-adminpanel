import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisDashboardController } from './analysis-dashboard.controller';
import { AnalysisDashboardService } from './analysis-dashboard.service';

describe('AnalysisDashboardController', () => {
  let controller: AnalysisDashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalysisDashboardController],
      providers: [AnalysisDashboardService],
    }).compile();

    controller = module.get<AnalysisDashboardController>(AnalysisDashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
