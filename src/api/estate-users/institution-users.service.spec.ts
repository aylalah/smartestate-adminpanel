import { Test, TestingModule } from '@nestjs/testing';
import { InstitutionUsersService } from './institution-users.service';

describe('InstitutionUsersService', () => {
  let service: InstitutionUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstitutionUsersService],
    }).compile();

    service = module.get<InstitutionUsersService>(InstitutionUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
