"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDto = exports.AcquireAuthDto = exports.ZendeskJwtAuthDto = exports.UnlinkDeviceDto = exports.UssdAtEventDto = exports.UssdAtSessionDto = exports.FileUploadDto = exports.FindUserDto = exports.UpdateResetPasswordDto = exports.InitiateResetPasswordDto = exports.ChangeResetPasswordDto = exports.VerifyBvnDto = exports.VerifyBvnDataDto = exports.UpdateProfileByServiceDto = exports.UpdateByServiceBvnDto = exports.InitiateByServiceBvnDto = exports.UpdateBvnDto = exports.InitiateBvnDto = exports.UpdatePinDto = exports.InitiatePinDto = exports.ChangePinDto = exports.CreatePinDto = exports.UpdatePhoneNumberDto = exports.InitiatePhoneNumberDto = exports.UpdateReferralCodeDto = exports.UpdateEmailDto = exports.InitiateEmailDto = exports.RefreshTokenDto = exports.LoginUserDto = exports.UpdateProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../../../utils");
const time_utils_1 = require("../../../utils/time.utils");
const validation_util_1 = require("../../../utils/validation.util");
class UpdateProfileDto {
}
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "role_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "image", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 10),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "home_address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "state_of_residence", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "lga", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "geo_political_zone", void 0);
exports.UpdateProfileDto = UpdateProfileDto;
class LoginUserDto {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "agent_code", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "device_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "device_type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "Manufacturer_name", void 0);
exports.LoginUserDto = LoginUserDto;
class RefreshTokenDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "token", void 0);
exports.RefreshTokenDto = RefreshTokenDto;
class InitiateEmailDto {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], InitiateEmailDto.prototype, "email", void 0);
exports.InitiateEmailDto = InitiateEmailDto;
class UpdateEmailDto {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateEmailDto.prototype, "old_email", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateEmailDto.prototype, "new_email", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateEmailDto.prototype, "otp", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 4),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateEmailDto.prototype, "pin", void 0);
exports.UpdateEmailDto = UpdateEmailDto;
class UpdateReferralCodeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateReferralCodeDto.prototype, "referral_code", void 0);
exports.UpdateReferralCodeDto = UpdateReferralCodeDto;
class InitiatePhoneNumberDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], InitiatePhoneNumberDto.prototype, "phone_number", void 0);
exports.InitiatePhoneNumberDto = InitiatePhoneNumberDto;
class UpdatePhoneNumberDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdatePhoneNumberDto.prototype, "old_phone_number", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdatePhoneNumberDto.prototype, "new_phone_number", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdatePhoneNumberDto.prototype, "otp", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 4),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdatePhoneNumberDto.prototype, "pin", void 0);
exports.UpdatePhoneNumberDto = UpdatePhoneNumberDto;
class CreatePinDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 4),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreatePinDto.prototype, "pin", void 0);
exports.CreatePinDto = CreatePinDto;
class ChangePinDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 4),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangePinDto.prototype, "current_pin", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 4),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangePinDto.prototype, "new_pin", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 4),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangePinDto.prototype, "confirm_new_pin", void 0);
exports.ChangePinDto = ChangePinDto;
class InitiatePinDto {
}
__decorate([
    class_transformer_1.Transform(({ value }) => {
        var _a;
        console.log('date_of_birth', value);
        const dateArr = (_a = value) === null || _a === void 0 ? void 0 : _a.split(' ');
        return dateArr && dateArr.length > 0 ? time_utils_1.date(dateArr[0], 'YYYY-MM-DD') : null;
    }),
    class_validator_1.IsDateString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], InitiatePinDto.prototype, "date_of_birth", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(11, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], InitiatePinDto.prototype, "bvn", void 0);
exports.InitiatePinDto = InitiatePinDto;
class UpdatePinDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 4),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdatePinDto.prototype, "pin", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdatePinDto.prototype, "otp", void 0);
exports.UpdatePinDto = UpdatePinDto;
class InitiateBvnDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(11, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], InitiateBvnDto.prototype, "bvn", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => {
        var _a;
        console.log('date_of_birth', value);
        const dateArr = (_a = value) === null || _a === void 0 ? void 0 : _a.split(' ');
        return dateArr && dateArr.length > 0 ? time_utils_1.date(dateArr[0], 'YYYY-MM-DD') : null;
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], InitiateBvnDto.prototype, "date_of_birth", void 0);
exports.InitiateBvnDto = InitiateBvnDto;
class UpdateBvnDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(11, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateBvnDto.prototype, "bvn", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => {
        var _a;
        console.log('date_of_birth', value);
        const dateArr = (_a = value) === null || _a === void 0 ? void 0 : _a.split(' ');
        return dateArr && dateArr.length > 0 ? time_utils_1.date(dateArr[0], 'YYYY-MM-DD') : null;
    }),
    class_validator_1.IsDateString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateBvnDto.prototype, "date_of_birth", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateBvnDto.prototype, "otp", void 0);
exports.UpdateBvnDto = UpdateBvnDto;
class InitiateByServiceBvnDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(11, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], InitiateByServiceBvnDto.prototype, "bvn", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], InitiateByServiceBvnDto.prototype, "email_or_phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    validation_util_1.IsName(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], InitiateByServiceBvnDto.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    validation_util_1.IsName(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], InitiateByServiceBvnDto.prototype, "last_name", void 0);
exports.InitiateByServiceBvnDto = InitiateByServiceBvnDto;
class UpdateByServiceBvnDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(11, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateByServiceBvnDto.prototype, "bvn", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateByServiceBvnDto.prototype, "email_or_phone_number", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateByServiceBvnDto.prototype, "otp", void 0);
exports.UpdateByServiceBvnDto = UpdateByServiceBvnDto;
class UpdateProfileByServiceDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "user_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "merchant_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumberString(),
    class_validator_1.Length(11, 11),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "bvn", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 11),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(({ value }) => utils_1.titleCase(value)),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "referral_code", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "device_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "gcm_device_token", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "device_type", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProfileByServiceDto.prototype, "source", void 0);
exports.UpdateProfileByServiceDto = UpdateProfileByServiceDto;
class VerifyBvnDataDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "title", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(11, 11),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "bvn", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "photo", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "watchListed", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "responseCode", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "middleName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "dateOfBirth", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "phoneNumber2", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "enrollmentBank", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "enrollmentBranch", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "levelOfAccount", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "lgaOfOrigin", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "lgaOfResidence", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "stateOfOrigin", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "stateOfResidence", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "maritalStatus", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "nin", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "nameOnCard", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "nationality", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "residentialAddress", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "registrationDate", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "similarity", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "image_validity", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "image_processed", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "createdAt", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "updatedAt", void 0);
exports.VerifyBvnDataDto = VerifyBvnDataDto;
class VerifyBvnDto {
}
__decorate([
    class_transformer_1.Transform(({ value }) => value.toLowerCase()),
    class_validator_1.IsIn(['success', 'error']),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(0, 255),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDto.prototype, "message", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => VerifyBvnDataDto),
    swagger_1.ApiProperty(),
    __metadata("design:type", VerifyBvnDataDto)
], VerifyBvnDto.prototype, "data", void 0);
exports.VerifyBvnDto = VerifyBvnDto;
class ChangeResetPasswordDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangeResetPasswordDto.prototype, "current_password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangeResetPasswordDto.prototype, "new_password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ChangeResetPasswordDto.prototype, "confirm_new_password", void 0);
exports.ChangeResetPasswordDto = ChangeResetPasswordDto;
class InitiateResetPasswordDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], InitiateResetPasswordDto.prototype, "email", void 0);
exports.InitiateResetPasswordDto = InitiateResetPasswordDto;
class UpdateResetPasswordDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateResetPasswordDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateResetPasswordDto.prototype, "new_password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateResetPasswordDto.prototype, "confirm_new_password", void 0);
exports.UpdateResetPasswordDto = UpdateResetPasswordDto;
class FindUserDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(({ value }) => '' + value),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], FindUserDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 8),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], FindUserDto.prototype, "customer_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], FindUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], FindUserDto.prototype, "external_email", void 0);
exports.FindUserDto = FindUserDto;
class FileUploadDto {
}
__decorate([
    swagger_1.ApiProperty({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
exports.FileUploadDto = FileUploadDto;
class UssdAtSessionDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtSessionDto.prototype, "sessionId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtSessionDto.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtSessionDto.prototype, "networkCode", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtSessionDto.prototype, "serviceCode", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtSessionDto.prototype, "text", void 0);
exports.UssdAtSessionDto = UssdAtSessionDto;
class UssdAtEventDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "date", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "sessionId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "serviceCode", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "networkCode", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "phoneNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "cost", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "durationInMillis", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "hopsCount", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "input", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "lastAppResponse", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UssdAtEventDto.prototype, "errorMessage", void 0);
exports.UssdAtEventDto = UssdAtEventDto;
class UnlinkDeviceDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UnlinkDeviceDto.prototype, "imei", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UnlinkDeviceDto.prototype, "unique_android_code", void 0);
exports.UnlinkDeviceDto = UnlinkDeviceDto;
class ZendeskJwtAuthDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ZendeskJwtAuthDto.prototype, "user_token", void 0);
exports.ZendeskJwtAuthDto = ZendeskJwtAuthDto;
class AcquireAuthDto {
}
__decorate([
    class_validator_1.IsEmail(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AcquireAuthDto.prototype, "email", void 0);
exports.AcquireAuthDto = AcquireAuthDto;
class AccountDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 36),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AccountDto.prototype, "merchant_id", void 0);
__decorate([
    class_validator_1.IsEmail(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AccountDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AccountDto.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AccountDto.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], AccountDto.prototype, "last_name", void 0);
exports.AccountDto = AccountDto;
//# sourceMappingURL=update-user.dto.js.map