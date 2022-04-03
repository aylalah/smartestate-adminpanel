import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Institution } from './entities/estate.entity';
export declare class InstitutionsService {
    institutionRepository: Repository<Institution>;
    private readonly eventEmitter;
    constructor(institutionRepository: Repository<Institution>, eventEmitter: EventEmitter2);
    create(institution: Partial<Institution>): Promise<Institution>;
    findAll(): Promise<Institution[]>;
    findOne(id: string): Promise<Institution>;
    update(id: string, institution: Partial<Institution>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
