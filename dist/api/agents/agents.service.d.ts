import { DeleteResult, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Agent } from './entities/agent.entity';
export declare class AgentsService {
    agentRepository: Repository<Agent>;
    private readonly eventEmitter;
    constructor(agentRepository: Repository<Agent>, eventEmitter: EventEmitter2);
    create(agent: Partial<Agent>): Promise<Agent>;
    findAll(): Promise<Agent[]>;
    findOne(id: string): Promise<Agent>;
    update(id: string, agent: Partial<Agent>): Promise<import("typeorm").UpdateResult>;
    remove(user_id: string): Promise<DeleteResult>;
}
