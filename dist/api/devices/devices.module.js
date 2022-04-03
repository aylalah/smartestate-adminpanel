"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevicesModule = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const typeorm_1 = require("@nestjs/typeorm");
const services_1 = require("../../services");
const devices_controller_1 = require("./devices.controller");
const device_entity_1 = require("./entities/device.entity");
const mail_service_1 = require("../../mail/mail.service");
let DevicesModule = class DevicesModule {
};
DevicesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([device_entity_1.Device]), services_1.ServicesModule],
        controllers: [devices_controller_1.DevicesController],
        providers: [devices_service_1.DevicesService, mail_service_1.MailService],
        exports: [devices_service_1.DevicesService, mail_service_1.MailService]
    })
], DevicesModule);
exports.DevicesModule = DevicesModule;
//# sourceMappingURL=devices.module.js.map