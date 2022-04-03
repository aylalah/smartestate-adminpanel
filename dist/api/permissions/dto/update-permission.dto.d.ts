import { CreatePermissionDto } from './create-permission.dto';
declare const UpdatePermissionDto_base: import("@nestjs/common").Type<Partial<CreatePermissionDto>>;
export declare class UpdatePermissionDto extends UpdatePermissionDto_base {
    role_id: string;
    permission_name: string;
    description: string;
    module_access: [];
}
export declare class StatusDto {
    status: number;
}
export {};
