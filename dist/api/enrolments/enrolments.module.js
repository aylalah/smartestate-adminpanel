"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolmentsModule = void 0;
const common_1 = require("@nestjs/common");
const enrolments_service_1 = require("./enrolments.service");
const enrolments_controller_1 = require("./enrolments.controller");
let EnrolmentsModule = class EnrolmentsModule {
};
EnrolmentsModule = __decorate([
    common_1.Module({
        controllers: [enrolments_controller_1.EnrolmentsController],
        providers: [enrolments_service_1.EnrolmentsService]
    })
], EnrolmentsModule);
exports.EnrolmentsModule = EnrolmentsModule;
//# sourceMappingURL=enrolments.module.js.map