import { CreateInstitutionDto } from './create-institution.dto';
declare const UpdateInstitutionDto_base: import("@nestjs/common").Type<Partial<CreateInstitutionDto>>;
export declare class UpdateInstitutionDto extends UpdateInstitutionDto_base {
    estate_name: string;
    estate_code: string;
    phone_number: string;
    email: string;
    web_url: string;
    plan: string;
    address: string;
    state: string;
    lga: string;
    logo: string;
}
export declare class StatusDto {
    status: number;
}
export {};
