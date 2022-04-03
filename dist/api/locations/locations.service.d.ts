import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Location } from './entities/location.entity';
export declare class LocationsService {
    locationRepository: Repository<Location>;
    private readonly eventEmitter;
    constructor(locationRepository: Repository<Location>, eventEmitter: EventEmitter2);
    create(location: Partial<Location>): Promise<Location>;
    findAll(): Promise<Location[]>;
    findOne(id: string): Promise<Location>;
    update(id: string, location: Partial<Location>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
