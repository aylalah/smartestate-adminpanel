import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Institution } from './entities/estate.entity';

@Injectable()
export class InstitutionsService {
  
  constructor(
    @InjectRepository(Institution) public institutionRepository: Repository<Institution>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  create(institution: Partial<Institution>): Promise<Institution> {
    return this.institutionRepository.save(institution);
  }

  findAll(): Promise<Institution[]> {
    return this.institutionRepository.find();
  }

  findOne(id: string): Promise<Institution> {
    return this.institutionRepository.findOne(id);
  }

  async update(id: string, institution: Partial<Institution>) {

    const existingInstitution = await this.institutionRepository.findOne({
      select: ['id', 'estate_name', 'estate_code', 'email'],
      where: [ { id } ]
    })
    const result = await this.institutionRepository.update(id, { ...institution });
    return result
  }

  remove(id: string): Promise<DeleteResult> {
    return this.institutionRepository.delete(id);
  }
}
