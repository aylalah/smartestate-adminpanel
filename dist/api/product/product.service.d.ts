import { DeleteResult, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ProductService {
    productRepository: Repository<Product>;
    private readonly eventEmitter;
    constructor(productRepository: Repository<Product>, eventEmitter: EventEmitter2);
    create(createProductDto: Partial<Product>): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, product: Partial<Product>): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<DeleteResult>;
}
