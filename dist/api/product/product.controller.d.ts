import { UserService, User } from '../user';
import { EventEmitter2 } from 'eventemitter2';
import { ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto, StatusDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly userService;
    private readonly productService;
    private readonly eventEmitter;
    private readonly configService;
    constructor(userService: UserService, productService: ProductService, eventEmitter: EventEmitter2, configService: ConfigService);
    create(createProductDto: CreateProductDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    } | Error>;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: string): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
    update(id: string, product: UpdateProductDto, authUser: User): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    } | Error>;
    suspend(id: string, authUser: User, body: StatusDto): Promise<{
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
