"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisDashboardModule = void 0;
const common_1 = require("@nestjs/common");
const institutions_service_1 = require("../estates/institutions.service");
const estate_entity_1 = require("../estates/entities/estate.entity");
const user_1 = require("../user");
const analysis_dashboard_service_1 = require("./analysis-dashboard.service");
const analysis_dashboard_controller_1 = require("./analysis-dashboard.controller");
const typeorm_1 = require("@nestjs/typeorm");
const services_1 = require("../../services");
let AnalysisDashboardModule = class AnalysisDashboardModule {
};
AnalysisDashboardModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([estate_entity_1.Institution, user_1.User]), services_1.ServicesModule],
        controllers: [analysis_dashboard_controller_1.AnalysisDashboardController],
        providers: [analysis_dashboard_service_1.AnalysisDashboardService, institutions_service_1.InstitutionsService, user_1.UserService],
        exports: [analysis_dashboard_service_1.AnalysisDashboardService, institutions_service_1.InstitutionsService, user_1.UserService]
    })
], AnalysisDashboardModule);
exports.AnalysisDashboardModule = AnalysisDashboardModule;
//# sourceMappingURL=analysis-dashboard.module.js.map