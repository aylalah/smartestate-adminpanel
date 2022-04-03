import { CreateProductDto } from './create-product.dto';
declare const UpdateProductDto_base: import("@nestjs/common").Type<Partial<CreateProductDto>>;
export declare class UpdateProductDto extends UpdateProductDto_base {
    product_name: string;
    product_type: string;
    description: string;
    status: number;
    image: string;
}
export declare class StatusDto {
    status: number;
}
export {};
