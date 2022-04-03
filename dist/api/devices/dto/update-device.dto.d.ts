import { CreateDeviceDto } from './create-device.dto';
declare const UpdateDeviceDto_base: import("@nestjs/common").Type<Partial<CreateDeviceDto>>;
export declare class UpdateDeviceDto extends UpdateDeviceDto_base {
}
export declare class StatusDto {
    status: number;
}
export declare class RegenerateOptDto {
    otp: string;
}
export declare class ValidateAgentOptDto {
    otp: string;
}
export {};
