import { CreateInstitutionUserDto } from './create-institution-user.dto';
declare const UpdateInstitutionUserDto_base: import("@nestjs/common").Type<Partial<CreateInstitutionUserDto>>;
export declare class UpdateInstitutionUserDto extends UpdateInstitutionUserDto_base {
    institution_id: string;
}
export declare class ResetInstitutionCodeDto {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}
export declare class MessageDto {
    message?: any;
}
export {};
