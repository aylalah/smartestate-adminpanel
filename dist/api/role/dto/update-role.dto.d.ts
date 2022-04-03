import { CreateRoleDto } from './create-role.dto';
declare const UpdateRoleDto_base: import("@nestjs/common").Type<Partial<CreateRoleDto>>;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
    user_type: string;
    role_name: string;
    description: string;
    slug: string;
}
export declare class StatusDto {
    status: number;
}
export {};
