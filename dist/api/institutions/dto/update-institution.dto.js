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
exports.StatusDto = exports.UpdateInstitutionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_institution_dto_1 = require("./create-institution.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validation_util_1 = require("../../../utils/validation.util");
class UpdateInstitutionDto extends swagger_1.PartialType(create_institution_dto_1.CreateInstitutionDto) {
}
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 100),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "institution_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "institution_code", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 50),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 20),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "account_number", void 0);
__decorate([
    class_validator_1.IsOptional(),
    validation_util_1.IsName(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 50),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "account_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 20),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "bank_code", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "state", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "lga", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "geo_political_zone", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateInstitutionDto.prototype, "logo", void 0);
exports.UpdateInstitutionDto = UpdateInstitutionDto;
class StatusDto {
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    swagger_2.ApiProperty(),
    __metadata("design:type", Number)
], StatusDto.prototype, "status", void 0);
exports.StatusDto = StatusDto;
//# sourceMappingURL=update-institution.dto.js.map