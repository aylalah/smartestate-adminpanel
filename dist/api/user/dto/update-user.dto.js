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
exports.MessageDto = exports.FileUploadDto = exports.FindUserDto = exports.UpdateResetPasswordDto = exports.InitiateResetPasswordDto = exports.ChangeResetPasswordDto = exports.VerifyBvnDataDto = exports.UpdateBvnDto = exports.InitiateBvnDto = exports.UpdatePinDto = exports.InitiatePinDto = exports.ChangePinDto = exports.CreatePinDto = exports.UpdatePhoneNumberDto = exports.UpdateReferralCodeDto = exports.UpdateEmailDto = exports.UpdateUserCodeDto = exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const time_utils_1 = require("../../../utils/time.utils");
const validation_util_1 = require("../../../utils/validation.util");
class UpdateUserDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "permission_id", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "image", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 15),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "home_address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "state_of_residence", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lga", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "geo_political_zone", void 0);
exports.UpdateUserDto = UpdateUserDto;
class UpdateUserCodeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 8),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateUserCodeDto.prototype, "code", void 0);
exports.UpdateUserCodeDto = UpdateUserCodeDto;
class UpdateEmailDto {
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateEmailDto.prototype, "email", void 0);
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
class UpdatePhoneNumberDto {
}
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdatePhoneNumberDto.prototype, "phone_number", void 0);
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
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateBvnDto.prototype, "otp", void 0);
exports.UpdateBvnDto = UpdateBvnDto;
class VerifyBvnDataDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "title", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(11, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "bvn", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "photo", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "watchListed", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "responseCode", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "middleName", void 0);
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
], VerifyBvnDataDto.prototype, "date_of_birth", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "phone_number2", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "enrollmentBank", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "enrollmentBranch", void 0);
__decorate([
    class_validator_1.IsEmail(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "levelOfAccount", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "lgaOfOrigin", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "lgaOfResidence", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "stateOfOrigin", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "stateOfResidence", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "maritalStatus", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "nin", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "nameOnCard", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "nationality", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "residentialAddress", void 0);
__decorate([
    class_validator_1.IsDateString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "registrationDate", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "similarity", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "image_validity", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "image_processed", void 0);
__decorate([
    class_validator_1.IsDateString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "created_at", void 0);
__decorate([
    class_validator_1.IsDateString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], VerifyBvnDataDto.prototype, "updated_at", void 0);
exports.VerifyBvnDataDto = VerifyBvnDataDto;
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
], InitiateResetPasswordDto.prototype, "email_or_phone_number", void 0);
exports.InitiateResetPasswordDto = InitiateResetPasswordDto;
class UpdateResetPasswordDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateResetPasswordDto.prototype, "email_or_phone_number", void 0);
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
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 6),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateResetPasswordDto.prototype, "otp", void 0);
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
class MessageDto {
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Object)
], MessageDto.prototype, "message", void 0);
exports.MessageDto = MessageDto;
//# sourceMappingURL=update-user.dto.js.map