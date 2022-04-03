"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("./jwt-strategy/jwt.service");
const local_service_1 = require("./local-strategy/local.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_1 = require("../user");
const mail_service_1 = require("../../mail/mail.service");
const config_1 = require("@nestjs/config");
const services_1 = require("../../services");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: `${configService.get('JWT_EXPIRY')}s` },
                }),
                inject: [config_1.ConfigService],
            }),
            common_1.forwardRef(() => user_1.UserModule),
            services_1.ServicesModule,
        ],
        providers: [auth_service_1.AuthService, local_service_1.LocalStrategyService, jwt_service_1.JwtStrategyService, mail_service_1.MailService],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule],
        controllers: [
            auth_controller_1.AuthController,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map