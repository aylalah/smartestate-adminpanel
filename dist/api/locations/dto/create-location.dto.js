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
exports.CreateLocationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validation_util_1 = require("../../../utils/validation.util");
class CreateLocationDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "location_name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Transform(({ value }) => {
        console.log('slug', value);
        const slugArr = value.split(' ').join('_');
        return slugArr && slugArr.length > 0 ? slugArr : null;
    }),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "slug", void 0);
__decorate([
    class_validator_1.IsString(),
    validation_util_1.IsName(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "state", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "latitude", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "longitude", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "lga", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateLocationDto.prototype, "geo_political_zone", void 0);
exports.CreateLocationDto = CreateLocationDto;
//# sourceMappingURL=create-location.dto.js.map