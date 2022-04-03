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
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const devices_service_1 = require("./devices.service");
const create_device_dto_1 = require("./dto/create-device.dto");
const update_device_dto_1 = require("./dto/update-device.dto");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const user_1 = require("../user");
const swagger_1 = require("@nestjs/swagger");
const eventemitter2_1 = require("eventemitter2");
const typeorm_1 = require("typeorm");
const moment = require("moment");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const AWS = require('aws-sdk');
const converter = require('json-2-csv');
const { Buffer } = require('buffer');
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
const mail_service_1 = require("../../mail/mail.service");
let DevicesController = class DevicesController {
    constructor(devicesService, mailService, eventEmitter) {
        this.devicesService = devicesService;
        this.mailService = mailService;
        this.eventEmitter = eventEmitter;
    }
    async uploadFileToAws(file) {
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_KEY,
            secretAccessKey: process.env.AWS_S3_SECRET_KEY
        });
        const fileName = file.name;
        const setPath = (filename) => `${process.env.FILE_PATH}/${filename}`;
        const awsLink = `${process.env.FILE_URL}/${process.env.FILE_PATH}/${fileName}`;
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `${setPath(fileName)}.${file.type}`,
            Body: file.data,
            ContentEncoding: 'base64',
            ContentType: `image/${file.type}`,
        };
        const res = await new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
        });
        console.log(`File uploaded successfully. ${res.Location}`);
        if (res) {
            return { status: 200, message: 'File uploaded successfully', fileUrl: res.Location };
        }
        else {
            return { status: 404, message: 'File not uploaded', fileUrl: '' };
        }
    }
    async create(createDeviceDto, authUser) {
        var _a;
        let { agent_id, device_type, device_id, manufactural_name, } = createDeviceDto;
        const existingDevice = (_a = await this.devicesService.deviceRepository.findOne({
            select: ['id', 'agent_id', 'device_type', 'device_id', 'manufactural_name', 'status'],
            where: [{ device_id: device_id }],
        })) !== null && _a !== void 0 ? _a : null;
        if ((existingDevice === null || existingDevice === void 0 ? void 0 : existingDevice.agent_id) === agent_id) {
            return utils_1.error('New institution name exist', 'Looks like you already have this institution. Institution already exist');
        }
        const newDevice = await this.devicesService.create({
            agent_id,
            manufactural_name,
            device_id,
            device_type,
            status: 0,
            status_text: 'new',
            created_by: authUser.id,
            created_at: timeStamp,
        });
        return utils_1.success({
            device: await this.devicesService.findOne(newDevice.id),
        }, 'New device created', 'Your app had just been registered, Admin will approve your device after been reviewed');
    }
    async search(query, perPage = 12) {
        let devices;
        devices = await this.devicesService.deviceRepository.find({
            where: ['id', 'agent_id', 'device_type', 'device_id', 'manufactural_name', 'status'].map((column) => ({ [column]: typeorm_1.Like(`%${query}%`) })),
            skip: 0,
            take: perPage,
        });
        const total = devices.length;
        return utils_1.success(devices.map((device) => {
            return Object.assign({}, device);
        }), 'Devices', 'Devices list', {
            current_page: 1,
            next_page: null,
            prev_page: null,
            per_page: total,
            total,
        });
    }
    async findAll(page = 1, perPage = 12, query, from, to) {
        const _page = page < 1 ? 1 : page;
        const _nextPage = _page + 1;
        const _prevPage = _page - 1;
        const _perPage = perPage;
        const _filter = {
            take: perPage,
            skip: (page - 1) * perPage,
        };
        const total = await this.devicesService.deviceRepository.count(_filter);
        const devices = await this.devicesService.deviceRepository.find({
            take: perPage,
            skip: (page - 1) * perPage,
            order: {
                created_at: "DESC",
            },
        });
        return utils_1.success(devices.map((institution) => {
            return Object.assign({}, institution);
        }), 'Devices', 'Devices list', {
            current_page: _page,
            next_page: _nextPage > total ? total : _nextPage,
            prev_page: _prevPage < 1 ? null : _prevPage,
            per_page: _perPage,
            total,
        });
    }
    async findAllNoPagination() {
        const institutions = await this.devicesService.findAll();
        return utils_1.success(institutions.map((institution) => {
            return Object.assign({}, institution);
        }), 'Devices', 'Devices list');
    }
    async findOne(id) {
        const institution = await this.devicesService.findOne(id);
        return utils_1.success(institution ? Object.assign({}, institution) : null, 'Device', 'Device Detail');
    }
    async update(id, updateDeviceDto, authUser) {
        var _a;
        let { agent_id, device_type, device_id, manufactural_name, } = updateDeviceDto;
        const existingInstitution = (_a = await this.devicesService.deviceRepository.findOne({
            select: ['id', 'agent_id', 'device_type', 'device_id', 'manufactural_name', 'status'],
            where: [{ id: id }],
        })) !== null && _a !== void 0 ? _a : null;
        const result = await this.devicesService.update(id, {
            agent_id,
            device_type,
            device_id,
            manufactural_name,
            updated_by: authUser.id,
            updated_at: todatsDate
        });
        return utils_1.success({
            id,
            device: await this.devicesService.findOne(id)
        }, 'Device', 'Device details updated');
    }
    async generateDeviceOpt(id, authUser) {
        const device = await this.devicesService.findOne(id);
        if (device) {
            const date = moment(device.updated_at).format("YYYY-MM-DD HH:mm:ss.SSS");
            const duration = moment().diff(date, 'minutes');
            if (duration <= 10) {
                return utils_1.success({
                    id: authUser.id,
                    first_name: authUser.first_name,
                    last_name: authUser.last_name,
                    email: authUser.email,
                    image: authUser.image,
                    device: device.id,
                    device_id: device.device_id,
                    agent_id: device.agent_id,
                    manufactural_name: device.manufactural_name,
                    device_type: device.device_type,
                    user_code: authUser.user_code,
                    minute: duration
                }, 'valid', 'Your OTP is still valid.');
            }
            else {
                const otp = '' + utils_1.randomDigits(5);
                const newUpdate = await this.devicesService.update(id, { otp: otp, updated_by: authUser.id, updated_at: timeStamp });
                const res = this.mailService.agentOtp({
                    first_name: authUser.first_name,
                    last_name: authUser.last_name,
                    email: authUser.email,
                    phone_number: authUser.phone_number,
                    token: authUser.email_token,
                    otp: otp
                });
                return utils_1.success({
                    id: authUser.id,
                    first_name: authUser.first_name,
                    last_name: authUser.last_name,
                    email: authUser.email,
                    image: authUser.image,
                    device: device.id,
                    device_id: device.device_id,
                    agent_id: device.agent_id,
                    manufactural_name: device.manufactural_name,
                    device_type: device.device_type,
                    user_code: authUser.user_code,
                }, 'OTP generated Successfully', 'OTP have been sent to your email');
            }
        }
        else {
            return utils_1.error('OTP not valid', 'You need to generate another otp');
        }
    }
    async validateAgentOpt(id, authUser, newOtp) {
        const oldToken = newOtp.otp;
        const device = await this.devicesService.findOne(id);
        if (device.otp == oldToken) {
            const date = moment(device.updated_at).format("YYYY-MM-DD HH:mm:ss.SSS");
            const duration = moment().diff(date, 'minutes');
            if (duration <= 10) {
                return utils_1.success({
                    id: authUser.id,
                    first_name: authUser.first_name,
                    last_name: authUser.last_name,
                    email: authUser.email,
                    image: authUser.image,
                    device: device.id,
                    device_id: device.device_id,
                    agent_id: device.agent_id,
                    manufactural_name: device.manufactural_name,
                    device_type: device.device_type,
                    user_code: authUser.user_code,
                    minute: duration
                }, 'OTP validated', 'Your OTP is still valid.');
            }
            else {
                const otp = '' + utils_1.randomDigits(5);
                const newUpdate = await this.devicesService.update(id, { otp: otp, updated_by: authUser.id, updated_at: timeStamp });
                const res = this.mailService.agentOtp({
                    first_name: authUser.first_name,
                    last_name: authUser.last_name,
                    email: authUser.email,
                    phone_number: authUser.phone_number,
                    token: authUser.email_token,
                    otp: otp
                });
                return utils_1.error('OTP has expired', 'Please generate a new otp');
            }
        }
        else {
            return utils_1.error('OTP not valid', 'You need to generate another otp');
        }
    }
    async suspend(id, authUser, body) {
        const { status } = body;
        let statusDesc = '';
        if (status == 0) {
            statusDesc = 'inactive';
        }
        if (status == 1) {
            statusDesc = 'active';
        }
        const existingInstitution = await this.devicesService.findOne(id);
        if (existingInstitution.status == status) {
            return utils_1.error('Device Status', `'Device already ${statusDesc}.'`);
        }
        await this.devicesService.update(id, {
            status: status,
            status_text: statusDesc,
            approved_at: timeStamp,
            approved_by: authUser.id,
            updated_at: timeStamp,
            updated_by: authUser.id,
        });
        return utils_1.success({
            device: await this.devicesService.findOne(id),
        }, 'Device', 'Device activated successfully');
    }
    async close(id, authUser, body) {
        const { status } = body;
        let statusDesc = '';
        if (status == 0) {
            statusDesc = 'inactive';
        }
        if (status == 1) {
            statusDesc = 'active';
        }
        const existingInstitution = await this.devicesService.findOne(id);
        if (existingInstitution.status == status) {
            return utils_1.error('Institution Status', `'This institution is already ${statusDesc}.'`);
        }
        await this.devicesService.update(id, {
            status: status,
            status_text: statusDesc,
            updated_at: timeStamp,
            updated_by: authUser.id,
        });
        return utils_1.success({
            device: await this.devicesService.findOne(id),
        }, 'Device', 'Device Locked successfully');
    }
    async remove(id) {
        const role = await this.devicesService.remove(id);
        return utils_1.success({
            id,
            role
        }, 'Device', 'Device deleted');
    }
    async usersMgntDashboard() {
        const total_device = await this.devicesService.findAll();
        const newDevice = await this.devicesService.deviceRepository.find({
            select: ['id', 'agent_id', 'device_type', 'device_id', 'manufactural_name', 'status'],
            where: [{ status_text: 'new' }]
        });
        const activeDevice = await this.devicesService.deviceRepository.find({
            select: ['id', 'agent_id', 'device_type', 'device_id', 'manufactural_name', 'status'],
            where: [{ status: 1 }]
        });
        const inActiveDevice = await this.devicesService.deviceRepository.find({
            select: ['id', 'agent_id', 'device_type', 'device_id', 'manufactural_name', 'status'],
            where: [{ status: 0 }]
        });
        const lockedDevice = await this.devicesService.deviceRepository.find({
            select: ['id', 'agent_id', 'device_type', 'device_id', 'manufactural_name', 'status'],
            where: [{ status_text: 'inactive' }]
        });
        const onlineDevice = await this.devicesService.deviceRepository.find({
            select: ['id', 'agent_id', 'device_type', 'device_id', 'manufactural_name', 'status'],
            where: [{ status_text: 'online' }]
        });
        return utils_1.success({
            total_device: total_device.length,
            newDevice: newDevice.length,
            activeDevice: activeDevice.length,
            inActiveDevice: inActiveDevice.length,
            lockedDevice: lockedDevice.length,
            onlineUsers: onlineDevice.length
        }, 'Devices Analysis', 'Device dashboard analysis');
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_device_dto_1.CreateDeviceDto, user_1.User]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "create", null);
__decorate([
    common_1.Get('search'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('query')),
    __param(1, common_1.Query('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "search", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('per_page')),
    __param(2, common_1.Query('query')),
    __param(3, common_1.Query('from')),
    __param(4, common_1.Query('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "findAll", null);
__decorate([
    common_1.Get('no-pagination'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "findAllNoPagination", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_device_dto_1.UpdateDeviceDto, user_1.User]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "update", null);
__decorate([
    common_1.Patch('regenerate_agent-otp/:id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "generateDeviceOpt", null);
__decorate([
    common_1.Patch('validate-agent-otp/:id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_device_dto_1.ValidateAgentOptDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "validateAgentOpt", null);
__decorate([
    common_1.Patch(':id/activation'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_device_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "suspend", null);
__decorate([
    common_1.Patch(':id/close'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_device_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "close", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "remove", null);
__decorate([
    common_1.Get('device-managment-analysis'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "usersMgntDashboard", null);
DevicesController = __decorate([
    common_1.Controller('devices'),
    __param(0, common_1.Inject(common_1.forwardRef(() => devices_service_1.DevicesService))),
    __metadata("design:paramtypes", [devices_service_1.DevicesService,
        mail_service_1.MailService,
        eventemitter2_1.EventEmitter2])
], DevicesController);
exports.DevicesController = DevicesController;
//# sourceMappingURL=devices.controller.js.map