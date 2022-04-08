"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionsModule = void 0;
const common_1 = require("@nestjs/common");
const institutions_service_1 = require("./institutions.service");
const institutions_controller_1 = require("./institutions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const estate_entity_1 = require("./entities/estate.entity");
const services_1 = require("../../services");
const mail_service_1 = require("../../mail/mail.service");
const institution_users_service_1 = require("../estate-users/institution-users.service");
const institution_user_entity_1 = require("../estate-users/entities/institution-user.entity");
const user_1 = require("../user");
let InstitutionsModule = class InstitutionsModule {
};
InstitutionsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([estate_entity_1.Institution, institution_user_entity_1.InstitutionUser, user_1.User]), services_1.ServicesModule],
        controllers: [institutions_controller_1.InstitutionsController],
        providers: [institutions_service_1.InstitutionsService, mail_service_1.MailService, institution_users_service_1.InstitutionUsersService, user_1.UserService],
        exports: [institutions_service_1.InstitutionsService, institution_users_service_1.InstitutionUsersService, user_1.UserService]
    })
], InstitutionsModule);
exports.InstitutionsModule = InstitutionsModule;
//# sourceMappingURL=institutions.module.js.map