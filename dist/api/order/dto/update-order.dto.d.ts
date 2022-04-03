import { CreateOrderDto } from './create-order.dto';
declare const UpdateOrderDto_base: import("@nestjs/common").Type<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
    product_id: string;
    serial_number: string;
    plan: string;
    app_code: string;
    school_name: string;
    address: string;
    about: string;
    country: string;
    state: string;
    town: string;
    poster_code: string;
    email: string;
    mobile: string;
    phone: string;
    document: string;
    fax: string;
    website: string;
    app_url: string;
    contact_person?: string;
    status?: string;
}
export {};
