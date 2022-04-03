import { Agent } from 'src/api/agents/entities/agent.entity';
import { InstitutionUser } from 'src/api/estate-users/entities/institution-user.entity';
export declare class Institution {
    id: string;
    estate_name?: string;
    estate_code?: string;
    estate_slug?: string;
    phone_number?: string;
    email?: string;
    email_valid?: boolean;
    api_url?: string;
    web_url?: string;
    plan?: string;
    address?: string;
    state?: string;
    lga?: string;
    api_token?: string;
    logo?: string;
    status?: number;
    created_by?: string;
    updated_by?: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    approved_by?: string;
    approved_at?: Date | string;
    timestamp?: Date;
    agent?: Agent;
    institutionUser?: InstitutionUser;
}
