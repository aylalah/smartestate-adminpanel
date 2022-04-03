import { DeleteResult, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class OrderService {
    orderRepository: Repository<Order>;
    private readonly eventEmitter;
    constructor(orderRepository: Repository<Order>, eventEmitter: EventEmitter2);
    create(createOrderDto: Partial<Order>): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, order: Partial<Order>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
