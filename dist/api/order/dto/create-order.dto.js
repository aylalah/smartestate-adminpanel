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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validation_util_1 = require("../../../utils/validation.util");
class CreateOrderDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 56),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "product_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 56),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "plan", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "school_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 200),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "about", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "country", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "state", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "town", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "poster_code", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 20),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "mobile", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 15),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.Length(1, 200),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "document", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "fax", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 60),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "website", void 0);
__decorate([
    class_validator_1.Length(1, 11),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "app_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    validation_util_1.IsName(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 56),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "contact_person", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
exports.CreateOrderDto = CreateOrderDto;
//# sourceMappingURL=create-order.dto.js.map