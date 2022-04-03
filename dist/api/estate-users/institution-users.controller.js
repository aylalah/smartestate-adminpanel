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
exports.InstitutionUsersController = void 0;
const common_1 = require("@nestjs/common");
const institution_users_service_1 = require("./institution-users.service");
const create_institution_user_dto_1 = require("./dto/create-institution-user.dto");
const update_institution_user_dto_1 = require("./dto/update-institution-user.dto");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const user_1 = require("../user");
const institutions_service_1 = require("../estates/institutions.service");
const estate_entity_1 = require("../estates/entities/estate.entity");
const swagger_1 = require("@nestjs/swagger");
const eventemitter2_1 = require("eventemitter2");
const typeorm_1 = require("typeorm");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
const mail_service_1 = require("../../mail/mail.service");
let InstitutionUsersController = class InstitutionUsersController {
    constructor(institutionUsersService, userService, institutionsService, eventEmitter, mailService) {
        this.institutionUsersService = institutionUsersService;
        this.userService = userService;
        this.institutionsService = institutionsService;
        this.eventEmitter = eventEmitter;
        this.mailService = mailService;
    }
    async create(createInstitutionUserDto, authUser) {
        var _a;
        this.eventEmitter.emit(utils_1.Event.USER_BEFORE_REGISTER, { createInstitutionUserDto });
        const password = createInstitutionUserDto.first_name + '.' + utils_1.randomDigits(8);
        console.log(password);
        let { role_id, permission_id, first_name, last_name, username, email, phone_number, home_address, state_of_residence, lga, geo_political_zone, estate_id } = createInstitutionUserDto;
        const raw_phone_number = phone_number;
        phone_number = utils_1.unifyPhoneNumber(phone_number);
        const existingUser = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'phone_number', 'email'],
            where: [{ phone_number: raw_phone_number }, { phone_number }, { email }],
        })) !== null && _a !== void 0 ? _a : null;
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.phone_number) === raw_phone_number || (existingUser === null || existingUser === void 0 ? void 0 : existingUser.phone_number) === phone_number) {
            return utils_1.error('Registration', 'Looks like you already have an account. Phone number already exist');
        }
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.email) === email) {
            return utils_1.error('Registration', 'Looks like you already have an account. Email already exist');
        }
        const customerIdExist = async (user_code) => {
            const user = await this.userService.userRepository.findOne({
                user_code,
            });
            return !!(user === null || user === void 0 ? void 0 : user.user_code);
        };
        let userCustomerId = '' + utils_1.randomDigits(8);
        while ((await customerIdExist(userCustomerId)) === true) {
            userCustomerId = '' + utils_1.randomDigits(8);
        }
        let newAgent;
        const newUser = await this.userService.create({
            role_id,
            first_name,
            last_name,
            email,
            phone_number,
            home_address,
            permission_id,
            username,
            state_of_residence,
            lga,
            geo_political_zone,
            image: 'user.png',
            user_code: userCustomerId,
            email_valid: false,
            status: false,
            post_status: 'pending',
            password: utils_1.hash(password),
            created_by: authUser.id,
            ondording_date: todatsDate,
            created_at: timeStamp,
            updated_at: timeStamp,
            updated_by: authUser.id,
        });
        if (newUser) {
            const newAgent = await this.institutionUsersService.create({
                user_id: newUser.id,
                estate_id,
                status: 2,
                created_by: authUser.id,
                created_at: todatsDate,
            });
            const res = this.mailService.welcomeUser({
                id: newUser.id,
                first_name,
                last_name,
                email,
                phone_number,
                home_address,
                permission_id,
                user_code: userCustomerId,
                role: newUser.role_id,
                password: password
            });
        }
        this.eventEmitter.emit(utils_1.Event.NEVER_BOUNCE_VERIFY, { user: newUser });
        this.eventEmitter.emit(utils_1.Event.USER_AFTER_REGISTER, {
            user: Object.assign(Object.assign({}, newUser), { password: null, pin: null, bvn: null }),
        });
        return utils_1.success({
            user: await this.institutionUsersService.findOne(newUser.id),
        }, 'Estate User Registration', 'Estate User successfully registered');
    }
    async search(query, perPage = 12) {
        const users = await this.institutionUsersService.institutionUserRepository.find({
            where: [
                'user_id',
                'user_code',
                'institution_id',
            ].map((column) => ({ [column]: typeorm_1.Like(`%${query}%`) })),
            skip: 0,
            take: perPage,
        });
        const total = users.length;
        return utils_1.success(users.map((user) => {
            return Object.assign({}, user);
        }), 'Estate User', 'Estate User List', {
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
        const total = await this.institutionUsersService.institutionUserRepository.count(_filter);
        const users = await this.institutionUsersService.institutionUserRepository.find({
            take: perPage,
            skip: (page - 1) * perPage,
            order: {
                created_at: "DESC",
            },
        });
        return utils_1.success(users, 'Estate User', 'Estate User List', {
            current_page: _page,
            next_page: _nextPage > total ? total : _nextPage,
            prev_page: _prevPage < 1 ? null : _prevPage,
            per_page: _perPage,
            total,
        });
    }
    async findOne(id) {
        const user = await this.institutionUsersService.findOne(id);
        return utils_1.success(user ? Object.assign({}, user) : null, 'Estate User', 'Estate User Details');
    }
    async update(id, user) {
        const result = await this.institutionUsersService.update(id, Object.assign({}, user));
        return utils_1.success({
            id,
            user: await this.institutionUsersService.findOne(id)
        }, 'Estate User', 'Estate User Details Updated');
    }
    async unsuspend(id, authUser, body) {
        const { message } = body;
        const existingUser = await this.userService.findOne(id);
        if (existingUser.status == true) {
            return utils_1.error('Account Status', 'Your account is still active.');
        }
        const updatedRes = await this.userService.update(id, {
            suspended_at: null,
            closed_at: null,
            post_status: 'activated',
            status: true,
            approved_at: timeStamp,
            approved_by: authUser.id,
            updated_at: timeStamp,
            updated_by: authUser.id,
        });
        const users = await this.institutionUsersService.institutionUserRepository.find({
            take: 10,
            skip: 10,
            order: {
                created_at: "DESC",
            },
        });
        if (updatedRes) {
            const newUpate = await this.userService.findOne(id);
            return utils_1.success({
                user: newUpate,
                users: users
            }, 'Account Status', 'Your account is now active.');
        }
    }
    async closeAccount(id, authUser, body) {
        const { message } = body;
        const existingUser = await this.userService.findOne(id);
        if (existingUser.closed_at !== null) {
            return utils_1.error('Close Account', 'Your account is closed already.');
        }
        const updatedRes = await this.userService.update(id, {
            closed_at: timeStamp,
            post_status: 'closed',
            status: false,
            updated_at: timeStamp,
            updated_by: authUser.id,
        });
        const users = await this.institutionUsersService.institutionUserRepository.find({
            take: 10,
            skip: 10,
            order: {
                created_at: "DESC",
            },
        });
        if (updatedRes) {
            const newUpate = await this.userService.findOne(id);
            return utils_1.success({
                user: newUpate,
                users: users
            }, 'Account Status', 'Your account has been closed');
        }
    }
    async remove(id) {
        const user = await this.institutionUsersService.institutionUserRepository.find({
            where: [{ user_id: id }],
        });
        if (!user) {
            return utils_1.error('404', 'User deleted already');
        }
        await this.userService.remove(id);
        await this.institutionUsersService.remove(user[0].id);
        return utils_1.success({
            id,
        }, 'Users', user[0].user.first_name + ' account is now deleted');
    }
    async usersMgntDashboard() {
        const total_user = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ role_id: 3 }]
        });
        const pendingUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'pending', role_id: 3 }]
        });
        const activeUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ status: 1, role_id: 3 }]
        });
        const inActiveUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ status: 0, role_id: 3 }]
        });
        const closedUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'closed', role_id: 3 }]
        });
        const emailValid = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ email_valid: 0, role_id: 3 }]
        });
        const onlineUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'online', role_id: 3 }]
        });
        return utils_1.success({
            totalUsers: total_user.length,
            pendingUsers: pendingUsers.length,
            activeUsers: activeUsers.length,
            inActiveUsers: inActiveUsers.length,
            closedUsers: closedUsers.length,
            emailValid: emailValid.length,
            onlineUsers: onlineUsers.length
        }, 'Users Analysis', 'Users dashboard analysis');
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_institution_user_dto_1.CreateInstitutionUserDto, user_1.User]),
    __metadata("design:returntype", Promise)
], InstitutionUsersController.prototype, "create", null);
__decorate([
    common_1.Get('search'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('query')),
    __param(1, common_1.Query('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], InstitutionUsersController.prototype, "search", null);
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
], InstitutionUsersController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstitutionUsersController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_institution_user_dto_1.UpdateInstitutionUserDto]),
    __metadata("design:returntype", Promise)
], InstitutionUsersController.prototype, "update", null);
__decorate([
    common_1.Patch(':id/activate'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_institution_user_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], InstitutionUsersController.prototype, "unsuspend", null);
__decorate([
    common_1.Patch(':id/close-account'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_institution_user_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], InstitutionUsersController.prototype, "closeAccount", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstitutionUsersController.prototype, "remove", null);
__decorate([
    common_1.Get('estate-users-managment-analysis'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InstitutionUsersController.prototype, "usersMgntDashboard", null);
InstitutionUsersController = __decorate([
    common_1.Controller('estate-users'),
    __param(0, common_1.Inject(common_1.forwardRef(() => institution_users_service_1.InstitutionUsersService))),
    __param(1, common_1.Inject(common_1.forwardRef(() => user_1.UserService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => institutions_service_1.InstitutionsService))),
    __metadata("design:paramtypes", [institution_users_service_1.InstitutionUsersService,
        user_1.UserService,
        institutions_service_1.InstitutionsService,
        eventemitter2_1.EventEmitter2,
        mail_service_1.MailService])
], InstitutionUsersController);
exports.InstitutionUsersController = InstitutionUsersController;
//# sourceMappingURL=institution-users.controller.js.map