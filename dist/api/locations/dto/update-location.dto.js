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
exports.StatusDto = exports.UpdateLocationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_location_dto_1 = require("./create-location.dto");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validation_util_1 = require("../../../utils/validation.util");
class UpdateLocationDto extends swagger_1.PartialType(create_location_dto_1.CreateLocationDto) {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "location_name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(({ value }) => {
        console.log('slug', value);
        const slugArr = value.split(' ').join('_');
        return slugArr && slugArr.length > 0 ? slugArr : null;
    }),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "slug", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "state", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "longitude", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "lga", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateLocationDto.prototype, "geo_political_zone", void 0);
exports.UpdateLocationDto = UpdateLocationDto;
class StatusDto {
}
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], StatusDto.prototype, "status", void 0);
exports.StatusDto = StatusDto;
//# sourceMappingURL=update-location.dto.js.map