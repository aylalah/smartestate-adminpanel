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
exports.CreateInstitutionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validation_util_1 = require("../../../utils/validation.util");
class CreateInstitutionDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "estate_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 50),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    validation_util_1.IsName(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "contact_person_first_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    validation_util_1.IsName(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "contact_person_last_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 50),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "website_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 20),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "plan", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "state", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "lga", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "logo", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "bank", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "account_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "account_name", void 0);
exports.CreateInstitutionDto = CreateInstitutionDto;
//# sourceMappingURL=create-institution.dto.js.map