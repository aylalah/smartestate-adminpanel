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
exports.InstitutionsController = void 0;
const common_1 = require("@nestjs/common");
const institutions_service_1 = require("./institutions.service");
const create_institution_dto_1 = require("./dto/create-institution.dto");
const update_institution_dto_1 = require("./dto/update-institution.dto");
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
let InstitutionsController = class InstitutionsController {
    constructor(institutionsService, mailService, eventEmitter) {
        this.institutionsService = institutionsService;
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
    async create(createInstitutionDto, authUser) {
        var _a;
        console.log(createInstitutionDto);
        let { institution_name, phone_number, email, account_number, account_name, bank_code, address, state, lga, geo_political_zone, logo } = createInstitutionDto;
        const existingInstitution = (_a = await this.institutionsService.institutionRepository.findOne({
            select: ['id', 'institution_name', 'email'],
            where: [{ institution_name: institution_name }],
        })) !== null && _a !== void 0 ? _a : null;
        if ((existingInstitution === null || existingInstitution === void 0 ? void 0 : existingInstitution.institution_name) === institution_name) {
            return utils_1.error('New institution name exist', 'Looks like you already have this institution. Institution already exist');
        }
        let institutionCode = '' + utils_1.randomDigits(5);
        const institutionIdExist = async (institution_code) => {
            const institution = await this.institutionsService.institutionRepository.findOne({
                institution_code,
            });
            return !!(institution === null || institution === void 0 ? void 0 : institution.institution_code);
        };
        while ((await institutionIdExist(institutionCode)) === true) {
            institutionCode = '' + utils_1.randomDigits(5);
        }
        const institution_code = '' + institutionCode;
        let fileName = '';
        if (logo == '') {
            fileName = 'user.png';
        }
        else {
            const lagoName = institution_name.replace(' ', "_") + `_${institution_code}`;
            const base64Data = new Buffer.from(logo.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = logo.split(';')[0].split('/')[1];
            const uploaded = await this.uploadFileToAws({ name: lagoName, type: type, data: base64Data });
            fileName = uploaded.fileUrl;
        }
        const newInstitution = await this.institutionsService.create({
            institution_name,
            phone_number,
            email,
            account_number,
            account_name,
            bank_code,
            address,
            state,
            lga,
            geo_political_zone,
            logo: fileName,
            institution_code,
            email_valid: false,
            status: 0,
            onboarding_date: todatsDate,
            created_by: authUser.id,
            created_at: todatsDate,
            updated_at: todatsDate
        });
        const res = this.mailService.welcomeUser({
            id: newInstitution.id,
            institution_name,
            phone_number,
            email,
            onboarding_date: todatsDate,
            logo: fileName,
            institution_code,
        });
        return utils_1.success({
            institution: {
                institution_name: newInstitution.institution_name,
                institution_code: newInstitution.institution_code,
                email: newInstitution.email,
                email_valid: newInstitution.email_valid,
            },
            institutions: await this.institutionsService.findAll(),
        }, 'New Institution', 'Institution successfuly created');
    }
    async search(query, perPage = 12) {
        let institutions;
        institutions = await this.institutionsService.institutionRepository.find({
            where: [
                'institution_name',
                'phone_number',
                'email',
                'account_name',
                'state',
                'lga',
            ].map((column) => ({ [column]: typeorm_1.Like(`%${query}%`) })),
            skip: 0,
            take: perPage,
        });
        const total = institutions.length;
        return utils_1.success(institutions.map((institution) => {
            return Object.assign({}, institution);
        }), 'Institutions', 'Institutions list', {
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
        const total = await this.institutionsService.institutionRepository.count(_filter);
        const institutions = await this.institutionsService.institutionRepository.find(_filter);
        return utils_1.success(institutions.map((institution) => {
            return Object.assign({}, institution);
        }), 'Institutions', 'Institutions list', {
            current_page: _page,
            next_page: _nextPage > total ? total : _nextPage,
            prev_page: _prevPage < 1 ? null : _prevPage,
            per_page: _perPage,
            total,
        });
    }
    async findAllNoPagination() {
        const institutions = await this.institutionsService.findAll();
        return utils_1.success(institutions.map((institution) => {
            return Object.assign({}, institution);
        }), 'Institutions', 'Institutions list');
    }
    async findOne(id) {
        const institution = await this.institutionsService.findOne(id);
        return utils_1.success(institution ? Object.assign({}, institution) : null, 'Institution', 'Institution details');
    }
    async update(id, institution, authUser) {
        var _a;
        let { institution_name, institution_code, phone_number, email, account_number, account_name, bank_code, address, state, lga, geo_political_zone, logo } = institution;
        const existingInstitution = (_a = await this.institutionsService.institutionRepository.findOne({
            select: ['id', 'institution_name', 'institution_code', 'email', 'logo'],
            where: [{ id: id }],
        })) !== null && _a !== void 0 ? _a : null;
        let fileName = '';
        if (logo == existingInstitution.logo) {
            fileName = existingInstitution.logo;
        }
        else {
            const lagoName = institution_name.replace(' ', "_") + `_${institution_code}`;
            const base64Data = new Buffer.from(logo.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = logo.split(';')[0].split('/')[1];
            const uploaded = await this.uploadFileToAws({ name: lagoName, type: type, data: base64Data });
            fileName = uploaded.fileUrl;
        }
        const result = await this.institutionsService.update(id, {
            institution_name,
            phone_number,
            email,
            account_number,
            account_name,
            bank_code,
            address,
            state,
            lga,
            geo_political_zone,
            onboarding_date: todatsDate,
            logo: fileName,
            institution_code,
            updated_by: authUser.id,
            updated_at: todatsDate
        });
        return utils_1.success({
            id,
            institution: await this.institutionsService.findOne(id)
        }, 'Institution', 'Institution details updated');
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
        const existingInstitution = await this.institutionsService.findOne(id);
        if (existingInstitution.status == status) {
            return utils_1.error('Institution Status', `'This institution already ${statusDesc}.'`);
        }
        await this.institutionsService.update(id, {
            status: status,
            updated_at: timeStamp,
            updated_by: authUser.id,
        });
        return utils_1.success({
            institution: await this.institutionsService.findOne(id),
            institutions: await this.institutionsService.findAll()
        }, 'Institution', 'Institution activated successfully');
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
        const existingInstitution = await this.institutionsService.findOne(id);
        if (existingInstitution.status == status) {
            return utils_1.error('Institution Status', `'This institution is already ${statusDesc}.'`);
        }
        await this.institutionsService.update(id, {
            status: status,
            updated_at: timeStamp,
            updated_by: authUser.id,
        });
        return utils_1.success({
            institution: await this.institutionsService.findOne(id),
            institutions: await this.institutionsService.findAll()
        }, 'Institution', 'Institution activated successfully');
    }
    async remove(id) {
        const role = await this.institutionsService.remove(id);
        return utils_1.success({
            id,
            role
        }, 'Institution', 'Institution deleted');
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_institution_dto_1.CreateInstitutionDto, user_1.User]),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "create", null);
__decorate([
    common_1.Get('search'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('query')),
    __param(1, common_1.Query('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "search", null);
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
], InstitutionsController.prototype, "findAll", null);
__decorate([
    common_1.Get('no-pagination'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "findAllNoPagination", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_institution_dto_1.UpdateInstitutionDto, user_1.User]),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "update", null);
__decorate([
    common_1.Patch(':id/activation'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_institution_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "suspend", null);
__decorate([
    common_1.Patch(':id/close'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_institution_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "close", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "remove", null);
InstitutionsController = __decorate([
    common_1.Controller('institutions'),
    __param(0, common_1.Inject(common_1.forwardRef(() => institutions_service_1.InstitutionsService))),
    __metadata("design:paramtypes", [institutions_service_1.InstitutionsService,
        mail_service_1.MailService,
        eventemitter2_1.EventEmitter2])
], InstitutionsController);
exports.InstitutionsController = InstitutionsController;
//# sourceMappingURL=institutions.controller.js.map