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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisDashboardController = void 0;
const common_1 = require("@nestjs/common");
const analysis_dashboard_service_1 = require("./analysis-dashboard.service");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const utils_1 = require("../../utils");
const user_1 = require("../user");
const institutions_service_1 = require("../estates/institutions.service");
const estate_entity_1 = require("../estates/entities/estate.entity");
const swagger_1 = require("@nestjs/swagger");
const eventemitter2_1 = require("eventemitter2");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
let AnalysisDashboardController = class AnalysisDashboardController {
    constructor(analysisDashboardService, userService, institutionsService, eventEmitter) {
        this.analysisDashboardService = analysisDashboardService;
        this.userService = userService;
        this.institutionsService = institutionsService;
        this.eventEmitter = eventEmitter;
    }
    async getAdminDashboard() {
        const total_user = await this.userService.findAll();
        const total_institutions = await this.institutionsService.findAll();
        return utils_1.success({
            users: total_user.length,
            institutions: total_institutions.length,
        }, 'admin', 'Admin dashboard analysis');
    }
};
__decorate([
    common_1.Get('admin'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalysisDashboardController.prototype, "getAdminDashboard", null);
AnalysisDashboardController = __decorate([
    common_1.Controller('analysis-dashboard'),
    __param(0, common_1.Inject(common_1.forwardRef(() => analysis_dashboard_service_1.AnalysisDashboardService))),
    __param(1, common_1.Inject(common_1.forwardRef(() => user_1.UserService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => institutions_service_1.InstitutionsService))),
    __metadata("design:paramtypes", [analysis_dashboard_service_1.AnalysisDashboardService,
        user_1.UserService,
        institutions_service_1.InstitutionsService,
        eventemitter2_1.EventEmitter2])
], AnalysisDashboardController);
exports.AnalysisDashboardController = AnalysisDashboardController;
//# sourceMappingURL=analysis-dashboard.controller.js.map