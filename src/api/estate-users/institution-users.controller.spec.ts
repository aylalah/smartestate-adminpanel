import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionUsersController } from './institution-users.controller';
import { InstitutionUsersService } from './institution-users.service';

describe('InstitutionUsersController', () => {
  let controller: InstitutionUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstitutionUsersController],
      providers: [InstitutionUsersService],
    }).compile();

    controller = module.get<InstitutionUsersController>(InstitutionUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
