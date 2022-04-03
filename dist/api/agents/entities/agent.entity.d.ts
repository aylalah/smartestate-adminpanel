import { User } from 'src/api/user/entities/user.entity';
import { Institution } from 'src/api/estates/entities/estate.entity';
import { Device } from 'src/api/devices/entities/device.entity';
export declare class Agent {
    id: string;
    user_id?: string;
    institution_id?: string;
    location_id?: string;
    bank_code?: string;
    bank_name?: string;
    account_number?: string;
    account_name?: string;
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
    device?: Device;
}
