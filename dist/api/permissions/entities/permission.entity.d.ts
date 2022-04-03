import { Role } from 'src/api/role/entities/role.entity';
import { User } from 'src/api/user/entities/user.entity';
export declare class Permission {
    id: string;
    role_id?: string;
    permission_name?: string;
    description?: string;
    slug?: string;
    module_access?: any;
    status?: number;
    user?: User;
    created_by?: string;
    updated_by?: string;
    approved_by?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    approved_at?: Date | string;
    timestamp?: Date;
    role?: Role;
}
