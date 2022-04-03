import { Test, TestingModule } from '@nestjs/testing';
import { AccessRequestsController } from './access-requests.controller';
import { AccessRequestsService } from './access-requests.service';

describe('AccessRequestsController', () => {
  let controller: AccessRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessRequestsController],
      providers: [AccessRequestsService],
    }).compile();

    controller = module.get<AccessRequestsController>(AccessRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
