import { User } from 'src/api/user/entities/user.entity';
import { Institution } from 'src/api/estates/entities/institution.entity';
export declare class InstitutionUser {
    id: string;
    user_id?: string;
    institution_id?: string;
    status?: number;
    created_by?: string;
    updated_by?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    approved_by?: string;
    approved_at?: Date | string;
    timestamp?: Date;
    user?: User;
    institution?: Institution;
}
