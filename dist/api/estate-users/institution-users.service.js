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
exports.InstitutionUsersService = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../user");
const institutions_service_1 = require("../estates/institutions.service");
const utils_1 = require("../../utils");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const institution_user_entity_1 = require("./entities/institution-user.entity");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
const mail_service_1 = require("../../mail/mail.service");
let InstitutionUsersService = class InstitutionUsersService {
    constructor(userService, institutionsService, institutionUserRepository, eventEmitter, mailService) {
        this.userService = userService;
        this.institutionsService = institutionsService;
        this.institutionUserRepository = institutionUserRepository;
        this.eventEmitter = eventEmitter;
        this.mailService = mailService;
    }
    create(institutionUser) {
        return this.institutionUserRepository.save(institutionUser);
    }
    async createEstateUser(createInstitutionUserDto) {
        var _a;
        const password = createInstitutionUserDto.first_name + '.' + utils_1.randomDigits(8);
        console.log(password);
        let { role_id, role, permission_id, permission, first_name, last_name, username, name, email, phone_number, home_address, state_of_residence, lga, estate_id, estate_name, estate_code, account_name, bank, web_url, created_by } = createInstitutionUserDto;
        const raw_phone_number = phone_number;
        phone_number = utils_1.unifyPhoneNumber(phone_number);
        const existingUser = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'phone_number', 'email'],
            where: [{ email }],
        })) !== null && _a !== void 0 ? _a : null;
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
        if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.email) === email) {
            const newAgent = await this.institutionUserRepository.save({
                user_id: existingUser.id,
                estate_id,
                status: 2,
                created_by: created_by,
                created_at: todatsDate,
            });
            const res = await this.mailService.welcomeInstitutionUser({
                id: newAgent.id,
                first_name,
                last_name,
                email,
                name,
                estate_id,
                phone_number,
                home_address,
                permission_id,
                estate_name,
                estate_code,
                account_name,
                bank,
                web_url,
                user_code: userCustomerId,
                role: role,
                permission: permission,
                password: password
            });
            return utils_1.success({
                user: await this.institutionUserRepository.findOne(existingUser.id),
            }, 'Estate User Registration', 'Estate User successfully registered');
        }
        else {
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
                image: 'user.png',
                user_code: userCustomerId,
                email_valid: false,
                status: false,
                post_status: 'pending',
                password: utils_1.hash(password),
                created_by: created_by,
                ondording_date: todatsDate,
                created_at: timeStamp,
            });
            if (newUser) {
                const newAgent = await this.institutionUserRepository.save({
                    user_id: newUser.id,
                    estate_id,
                    status: 2,
                    created_by: created_by,
                    created_at: todatsDate,
                });
                const res = this.mailService.welcomeInstitutionUser({
                    id: newAgent.id,
                    first_name,
                    last_name,
                    name,
                    email,
                    estate_id,
                    phone_number,
                    home_address,
                    permission_id,
                    estate_name,
                    estate_code,
                    account_name,
                    bank,
                    web_url,
                    user_code: userCustomerId,
                    role: role,
                    permission: permission,
                    password: password
                });
            }
            this.eventEmitter.emit(utils_1.Event.NEVER_BOUNCE_VERIFY, { user: newUser });
            this.eventEmitter.emit(utils_1.Event.USER_AFTER_REGISTER, {
                user: Object.assign(Object.assign({}, newUser), { password: null }),
            });
            return utils_1.success({
                user: await this.institutionUserRepository.findOne(newUser.id),
            }, 'Estate User Registration', 'Estate User successfully registered');
        }
    }
    findAll() {
        return this.institutionUserRepository.find();
    }
    findOne(id) {
        return this.institutionUserRepository.findOne(id);
    }
    async update(id, agent) {
        const existingAgent = await this.institutionUserRepository.findOne({
            select: ['id', 'user_id'],
            where: [{ user_id: id }]
        });
        const result = await this.institutionUserRepository.update(id, Object.assign({}, agent));
        return result;
    }
    remove(user_id) {
        return this.institutionUserRepository.delete({ user_id });
    }
};
InstitutionUsersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => user_1.UserService))),
    __param(1, common_1.Inject(common_1.forwardRef(() => institutions_service_1.InstitutionsService))),
    __param(2, typeorm_1.InjectRepository(institution_user_entity_1.InstitutionUser)),
    __metadata("design:paramtypes", [user_1.UserService,
        institutions_service_1.InstitutionsService,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2,
        mail_service_1.MailService])
], InstitutionUsersService);
exports.InstitutionUsersService = InstitutionUsersService;
//# sourceMappingURL=institution-users.service.js.map