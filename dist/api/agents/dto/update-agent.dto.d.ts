import { CreateAgentDto } from './create-agent.dto';
declare const UpdateAgentDto_base: import("@nestjs/common").Type<Partial<CreateAgentDto>>;
export declare class UpdateAgentDto extends UpdateAgentDto_base {
    role_id: string;
    institution_id: string;
    location_id?: string;
    bank_code: string;
    bank_name: string;
    account_name: string;
    account_number: string;
}
export declare class ResetAgentCodeDto {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}
export {};
