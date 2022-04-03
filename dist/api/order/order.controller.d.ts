import { UserService, User } from '../user';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { EventEmitter2 } from 'eventemitter2';
import { ConfigService } from '@nestjs/config';
export declare class OrderController {
    private readonly userService;
    private readonly orderService;
    private readonly eventEmitter;
    private readonly configService;
    constructor(userService: UserService, orderService: OrderService, eventEmitter: EventEmitter2, configService: ConfigService);
    create(createOrderDto: CreateOrderDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    findAll(): Promise<import("./entities/order.entity").Order[]>;
    findOne(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    update(id: string, order: UpdateOrderDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    remove(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
}
