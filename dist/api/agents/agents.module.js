"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsModule = void 0;
const common_1 = require("@nestjs/common");
const institutions_service_1 = require("../estates/institutions.service");
const estate_entity_1 = require("../estates/entities/estate.entity");
const user_1 = require("../user");
const agents_service_1 = require("./agents.service");
const agents_controller_1 = require("./agents.controller");
const typeorm_1 = require("@nestjs/typeorm");
const agent_entity_1 = require("./entities/agent.entity");
const services_1 = require("../../services");
const mail_service_1 = require("../../mail/mail.service");
let AgentsModule = class AgentsModule {
};
AgentsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([agent_entity_1.Agent, estate_entity_1.Institution, user_1.User]), services_1.ServicesModule],
        controllers: [agents_controller_1.AgentsController],
        providers: [agents_service_1.AgentsService, institutions_service_1.InstitutionsService, user_1.UserService, mail_service_1.MailService],
        exports: [agents_service_1.AgentsService, institutions_service_1.InstitutionsService, user_1.UserService]
    })
], AgentsModule);
exports.AgentsModule = AgentsModule;
//# sourceMappingURL=agents.module.js.map