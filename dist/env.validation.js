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
exports.validate = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class EnvironmentVariables {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "BASE_PATH", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SERVICE_NAME", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SERVICE_URL", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "PORT", void 0);
__decorate([
    class_validator_1.IsIn([
        'development',
        'staging',
        'simulate',
        'production',
    ]),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_DIALECT", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_NAME", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "DB_SYNC", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], EnvironmentVariables.prototype, "DB_LOG", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "THROTTLE_TTL", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "THROTTLE_LIMIT", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "HTTP_TIMEOUT", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "HTTP_MAX_REDIRECTS", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_SECRET", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "JWT_EXPIRY", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Length(32, 32),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "ENCRYPTION_KEY", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "AWS_S3_KEY", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "AWS_S3_SECRET_KEY", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "AWS_S3_BUCKET", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "AWS_S3_DIR", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "AWS_S3_DIR_STAGE", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "AWS_S3_REGION", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "OTP_EXPIRY_DURATION", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SENTRY_DNS", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "RUDDERSTACK_SOURCE_ID", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "RUDDERSTACK_WRITE_KEY", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "RUDDERSTACK_TOKEN", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "RUDDERSTACK_DATA_PLANE_URL", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NEVER_BOUNCE_API_KEY", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REDIS_HOST", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "REDIS_PORT", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REDIS_PASS", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], EnvironmentVariables.prototype, "REDIS_DB", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "I18N_LANG", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "I18N_SOURCE", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DOCUMENT_BASE_URL", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "BVN_URL", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "PWA_BASE_URL", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([
        'on',
        'off',
    ]),
    class_validator_1.IsOptional(),
    class_validator_1.IsIn([
        'on',
        'off',
    ]),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "SHUTDOWN_SWITCH", void 0);
function validate(config) {
    const validatedConfig = class_transformer_1.plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = class_validator_1.validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
exports.validate = validate;
//# sourceMappingURL=env.validation.js.map