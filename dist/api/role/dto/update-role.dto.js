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
exports.StatusDto = exports.UpdateRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_role_dto_1 = require("./create-role.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validation_util_1 = require("../../../utils/validation.util");
class UpdateRoleDto extends swagger_1.PartialType(create_role_dto_1.CreateRoleDto) {
}
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateRoleDto.prototype, "user_type", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateRoleDto.prototype, "role_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateRoleDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateRoleDto.prototype, "slug", void 0);
exports.UpdateRoleDto = UpdateRoleDto;
class StatusDto {
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    swagger_2.ApiProperty(),
    __metadata("design:type", Number)
], StatusDto.prototype, "status", void 0);
exports.StatusDto = StatusDto;
//# sourceMappingURL=update-role.dto.js.map