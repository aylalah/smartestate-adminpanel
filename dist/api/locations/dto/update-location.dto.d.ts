import { CreateLocationDto } from './create-location.dto';
declare const UpdateLocationDto_base: import("@nestjs/common").Type<Partial<CreateLocationDto>>;
export declare class UpdateLocationDto extends UpdateLocationDto_base {
    location_name: string;
    address: string;
    slug: string;
    state: string;
    latitude: string;
    longitude: string;
    lga?: string;
    geo_political_zone?: string;
}
export declare class StatusDto {
    status: number;
}
export {};
