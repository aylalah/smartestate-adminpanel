import { Permission } from './../../permissions/entities/permission.entity';
export declare class Role {
    id: string;
    user_type?: string;
    role_name?: string;
    description?: string;
    slug?: string;
    status?: number;
    permission?: Permission;
    created_by?: string;
    updated_by?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    timestamp?: Date;
}
