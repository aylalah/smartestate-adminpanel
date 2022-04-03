"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionUsersModule = void 0;
const common_1 = require("@nestjs/common");
const institution_users_service_1 = require("./institution-users.service");
const institution_users_controller_1 = require("./institution-users.controller");
const institutions_service_1 = require("../estates/institutions.service");
const institution_entity_1 = require("../estates/entities/institution.entity");
const institution_user_entity_1 = require("./entities/institution-user.entity");
const user_1 = require("../user");
const typeorm_1 = require("@nestjs/typeorm");
const services_1 = require("../../services");
const mail_service_1 = require("../../mail/mail.service");
let InstitutionUsersModule = class InstitutionUsersModule {
};
InstitutionUsersModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([institution_user_entity_1.InstitutionUser, institution_entity_1.Institution, user_1.User]), services_1.ServicesModule],
        controllers: [institution_users_controller_1.InstitutionUsersController],
        providers: [institution_users_service_1.InstitutionUsersService, institutions_service_1.InstitutionsService, user_1.UserService, mail_service_1.MailService],
        exports: [institution_users_service_1.InstitutionUsersService, institutions_service_1.InstitutionsService, user_1.UserService]
    })
], InstitutionUsersModule);
exports.InstitutionUsersModule = InstitutionUsersModule;
//# sourceMappingURL=institution-users.module.js.map