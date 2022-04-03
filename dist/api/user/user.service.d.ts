import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class UserService {
    userRepository: Repository<User>;
    private readonly eventEmitter;
    constructor(userRepository: Repository<User>, eventEmitter: EventEmitter2);
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findOneByEmailOrPhoneNumber(emailOrPhoneNumber: string): Promise<User>;
    update(id: string, user: Partial<User>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
