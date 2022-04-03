import { Injectable } from '@nestjs/common';
import { CreateInstitutionUserDto } from './dto/create-institution-user.dto';
import { UpdateInstitutionUserDto } from './dto/update-institution-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InstitutionUser } from 'src/api/estate-users/entities/institution-user.entity';

@Injectable()
export class InstitutionUsersService {

  constructor(
    @InjectRepository(InstitutionUser) public institutionUserRepository: Repository<InstitutionUser>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  create(institutionUser: Partial<InstitutionUser>): Promise<InstitutionUser> {
    return this.institutionUserRepository.save(institutionUser);
  }

  findAll(): Promise<InstitutionUser[]> {
    return this.institutionUserRepository.find();
  }

  findOne(id: string): Promise<InstitutionUser> {
    return this.institutionUserRepository.findOne(id);
  }

  async update(id: string, agent: Partial<InstitutionUser>) {

    const existingAgent = await this.institutionUserRepository.findOne({
      select: ['id', 'user_id'],
      where: [ { user_id: id } ]
    })
    const result = await this.institutionUserRepository.update(id, { ...agent });
    return result
  }

  remove(user_id: string): Promise<DeleteResult> {
    return this.institutionUserRepository.delete({ user_id });
  }
}
