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
exports.ResetAgentCodeDto = exports.UpdateAgentDto = void 0;
const create_agent_dto_1 = require("./create-agent.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateAgentDto extends swagger_1.PartialType(create_agent_dto_1.CreateAgentDto) {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateAgentDto.prototype, "role_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateAgentDto.prototype, "institution_id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.Length(1, 220),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateAgentDto.prototype, "location_id", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateAgentDto.prototype, "bank_code", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 52),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateAgentDto.prototype, "bank_name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateAgentDto.prototype, "account_name", void 0);
__decorate([
    class_validator_1.IsNumberString(),
    class_validator_1.Length(1, 15),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateAgentDto.prototype, "account_number", void 0);
exports.UpdateAgentDto = UpdateAgentDto;
class ResetAgentCodeDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ResetAgentCodeDto.prototype, "current_password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ResetAgentCodeDto.prototype, "new_password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(1, 26),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ResetAgentCodeDto.prototype, "confirm_new_password", void 0);
exports.ResetAgentCodeDto = ResetAgentCodeDto;
//# sourceMappingURL=update-agent.dto.js.map