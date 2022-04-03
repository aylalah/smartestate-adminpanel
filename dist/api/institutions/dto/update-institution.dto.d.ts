import { CreateInstitutionDto } from './create-institution.dto';
declare const UpdateInstitutionDto_base: import("@nestjs/common").Type<Partial<CreateInstitutionDto>>;
export declare class UpdateInstitutionDto extends UpdateInstitutionDto_base {
    institution_name: string;
    institution_code: string;
    phone_number: string;
    email: string;
    account_number: string;
    account_name: string;
    bank_code: string;
    address: string;
    state: string;
    lga: string;
    geo_political_zone: string;
    logo: string;
}
export declare class StatusDto {
    status: number;
}
export {};
