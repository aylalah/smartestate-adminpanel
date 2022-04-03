import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Device } from './entities/device.entity';
export declare class DevicesService {
    deviceRepository: Repository<Device>;
    private readonly eventEmitter;
    constructor(deviceRepository: Repository<Device>, eventEmitter: EventEmitter2);
    create(device: Partial<Device>): Promise<Device>;
    findAll(): Promise<Device[]>;
    findOne(id: string): Promise<Device>;
    update(id: string, device: Partial<Device>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
