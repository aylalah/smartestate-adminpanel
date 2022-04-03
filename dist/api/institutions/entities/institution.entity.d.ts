import { Agent } from 'src/api/agents/entities/agent.entity';
import { InstitutionUser } from 'src/api/institution-users/entities/institution-user.entity';
export declare class Institution {
    id: string;
    institution_name?: string;
    institution_code?: string;
    phone_number?: string;
    email?: string;
    email_valid?: boolean;
    account_number?: string;
    account_name?: string;
    bank_code?: string;
    address?: string;
    state?: string;
    lga?: string;
    geo_political_zone?: string;
    latitude?: string;
    longitude?: string;
    onboarding_date?: string;
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
