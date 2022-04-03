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
exports.AgentsController = void 0;
const common_1 = require("@nestjs/common");
const agents_service_1 = require("./agents.service");
const create_agent_dto_1 = require("./dto/create-agent.dto");
const update_agent_dto_1 = require("./dto/update-agent.dto");
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
let AgentsController = class AgentsController {
    constructor(agentsService, userService, institutionsService, eventEmitter, mailService) {
        this.agentsService = agentsService;
        this.userService = userService;
        this.institutionsService = institutionsService;
        this.eventEmitter = eventEmitter;
        this.mailService = mailService;
    }
    async create(createAgentDto, authUser) {
        var _a;
        this.eventEmitter.emit(utils_1.Event.USER_BEFORE_REGISTER, { createAgentDto });
        const password = createAgentDto.first_name + '.' + utils_1.randomDigits(8);
        console.log(password);
        let { role_id, permission_id, first_name, last_name, username, email, image, phone_number, home_address, state_of_residence, lga, geo_political_zone, institution_id, location_id, bank_code, bank_name, account_name, account_number } = createAgentDto;
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
        let fileName = '';
        if (image == '') {
            fileName = 'user.png';
        }
        else {
            fileName = first_name + '_' + last_name + '_' + userCustomerId + '.png';
            const base64Data = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (base64Data.length !== 3) {
                return new Error('Invalid input string');
            }
            const fileContents = Buffer.from(base64Data[2], 'base64');
            const imag = fs.writeFile(`public/images/${fileName}`, fileContents, 'base64', (err) => {
                if (err)
                    return console.error(err);
                console.log('file saved to ', `public/images/${fileName}`);
            });
        }
        let newAgent;
        const newUser = await this.userService.create({
            first_name,
            last_name,
            email,
            phone_number,
            home_address,
            role_id,
            permission_id,
            username,
            state_of_residence,
            lga,
            geo_political_zone,
            image: fileName,
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
            const newAgent = await this.agentsService.create({
                user_id: newUser.id,
                institution_id,
                location_id,
                bank_code,
                bank_name,
                account_name,
                account_number,
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
                image: fileName,
                user_code: userCustomerId,
                role: newUser.role_id,
                password: password
            });
        }
        this.eventEmitter.emit(utils_1.Event.NEVER_BOUNCE_VERIFY, { user: newUser });
        this.eventEmitter.emit(utils_1.Event.USER_AFTER_REGISTER, {
            user: Object.assign(Object.assign({}, newUser), { password: null }),
        });
        return utils_1.success({
            user: await this.agentsService.findOne(newUser.id),
        }, 'Agent Registration', 'Agent successfully registered');
    }
    async search(query, perPage = 12) {
        const users = await this.agentsService.agentRepository.find({
            where: [
                'user_id',
                'agent_code',
            ].map((column) => ({ [column]: typeorm_1.Like(`%${query}%`) })),
            skip: 0,
            take: perPage,
        });
        const total = users.length;
        return utils_1.success(users.map((user) => {
            return Object.assign({}, user);
        }), 'Agents', 'Agents list', {
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
        const total = await this.agentsService.agentRepository.count(_filter);
        const users = await this.agentsService.agentRepository.find({
            take: perPage,
            skip: (page - 1) * perPage,
            order: {
                created_at: "DESC",
            },
        });
        return utils_1.success(users, 'Agents', 'Agents list', {
            current_page: _page,
            next_page: _nextPage > total ? total : _nextPage,
            prev_page: _prevPage < 1 ? null : _prevPage,
            per_page: _perPage,
            total,
        });
    }
    async findOne(id) {
        const user = await this.agentsService.findOne(id);
        return utils_1.success(user ? Object.assign({}, user) : null, 'Agents', 'Agents details');
    }
    async update(id, user) {
        const result = await this.agentsService.update(id, Object.assign({}, user));
        return utils_1.success({
            id,
            user: await this.userService.findOne(id)
        }, 'Users', 'User details updated');
    }
    async remove(id) {
        const user = await this.agentsService.agentRepository.find({
            where: [{ user_id: id }],
        });
        if (!user) {
            return utils_1.error('404', 'User deleted already');
        }
        await this.userService.remove(id);
        await this.agentsService.remove(user[0].id);
        return utils_1.success({
            id,
        }, 'Users', user[0].user.first_name + ' account is now deleted');
    }
    async usersMgntDashboard() {
        const total_user = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ role_id: 4 }]
        });
        const pendingUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'pending', role_id: 4 }]
        });
        const activeUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ status: 1, role_id: 4 }]
        });
        const inActiveUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ status: 0, role_id: 4 }]
        });
        const closedUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'closed', role_id: 4 }]
        });
        const emailValid = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ email_valid: 0, role_id: 4 }]
        });
        const onlineUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'online', role_id: 4 }]
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
    __metadata("design:paramtypes", [create_agent_dto_1.CreateAgentDto, user_1.User]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "create", null);
__decorate([
    common_1.Get('search'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('query')),
    __param(1, common_1.Query('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "search", null);
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
], AgentsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_agent_dto_1.UpdateAgentDto]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "remove", null);
__decorate([
    common_1.Get('agent-managment-analysis'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgentsController.prototype, "usersMgntDashboard", null);
AgentsController = __decorate([
    common_1.Controller('agents'),
    __param(0, common_1.Inject(common_1.forwardRef(() => agents_service_1.AgentsService))),
    __param(1, common_1.Inject(common_1.forwardRef(() => user_1.UserService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => institutions_service_1.InstitutionsService))),
    __metadata("design:paramtypes", [agents_service_1.AgentsService,
        user_1.UserService,
        institutions_service_1.InstitutionsService,
        eventemitter2_1.EventEmitter2,
        mail_service_1.MailService])
], AgentsController);
exports.AgentsController = AgentsController;
//# sourceMappingURL=agents.controller.js.map