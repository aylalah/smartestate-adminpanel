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
exports.UpdateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_order_dto_1 = require("./create-order.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validation_util_1 = require("../../../utils/validation.util");
class UpdateOrderDto extends swagger_1.PartialType(create_order_dto_1.CreateOrderDto) {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 20),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "product_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 16),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "serial_number", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "plan", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 10),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "app_code", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "school_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 100),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "about", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "country", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "state", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "town", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "poster_code", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 20),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "mobile", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 15),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.Length(1, 200),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "document", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "fax", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 60),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "website", void 0);
__decorate([
    class_validator_1.Length(1, 11),
    swagger_2.ApiProperty(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "app_url", void 0);
__decorate([
    class_validator_1.IsOptional(),
    validation_util_1.IsName(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 56),
    swagger_2.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "contact_person", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 255),
    swagger_2.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "status", void 0);
exports.UpdateOrderDto = UpdateOrderDto;
//# sourceMappingURL=update-order.dto.js.map