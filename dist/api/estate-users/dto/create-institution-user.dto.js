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
exports.CreateInstitutionUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validation_util_1 = require("../../../utils/validation.util");
class CreateInstitutionUserDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "role_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "permission_id", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "last_name", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 10),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "home_address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "state_of_residence", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "lga", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "geo_political_zone", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionUserDto.prototype, "estate_id", void 0);
exports.CreateInstitutionUserDto = CreateInstitutionUserDto;
//# sourceMappingURL=create-institution-user.dto.js.map