"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolmentDailyLogModule = void 0;
const common_1 = require("@nestjs/common");
const enrolment_daily_log_service_1 = require("./enrolment-daily-log.service");
const enrolment_daily_log_controller_1 = require("./enrolment-daily-log.controller");
let EnrolmentDailyLogModule = class EnrolmentDailyLogModule {
};
EnrolmentDailyLogModule = __decorate([
    common_1.Module({
        controllers: [enrolment_daily_log_controller_1.EnrolmentDailyLogController],
        providers: [enrolment_daily_log_service_1.EnrolmentDailyLogService]
    })
], EnrolmentDailyLogModule);
exports.EnrolmentDailyLogModule = EnrolmentDailyLogModule;
//# sourceMappingURL=enrolment-daily-log.module.js.map