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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const moment = require("moment");
const user_entity_1 = require("./entities/user.entity");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const event_emitter_1 = require("@nestjs/event-emitter");
const mail_service_1 = require("../../mail/mail.service");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const AWS = require('aws-sdk');
const converter = require('json-2-csv');
const { Buffer } = require('buffer');
const fs = require("fs");
const path = require("path");
const date = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
const currentTimestamp = moment(new Date()).format('HH:mm:ss');
const duration = moment().diff(date, 'minutes');
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
let UserController = class UserController {
    constructor(userService, configService, mailService, eventEmitter, httpService) {
        this.userService = userService;
        this.configService = configService;
        this.mailService = mailService;
        this.eventEmitter = eventEmitter;
        this.httpService = httpService;
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
    async create(createUserDto, authUser) {
        var _a;
        this.eventEmitter.emit(utils_1.Event.USER_BEFORE_REGISTER, { createUserDto });
        const password = createUserDto.first_name + '.' + utils_1.randomDigits(8);
        console.log(password);
        let { role_id, permission_id, first_name, last_name, username, email, image, phone_number, home_address, state_of_residence, lga, geo_political_zone } = createUserDto;
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
        this.eventEmitter.emit(utils_1.Event.NEVER_BOUNCE_VERIFY, { user: newUser });
        this.eventEmitter.emit(utils_1.Event.USER_AFTER_REGISTER, {
            user: Object.assign(Object.assign({}, newUser), { password: null }),
        });
        return utils_1.success({
            user: {
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                phone_number: newUser.phone_number,
                gender: newUser.gender,
                image: newUser.image,
                permisson_id: newUser.permission_id,
                username: newUser.username,
                state_of_residence: newUser.state_of_residence,
                lga: newUser.lga,
                geo_political_zone: newUser.geo_political_zone,
                user_code: newUser.user_code,
                password: null,
                email_valid: false,
                status: false,
                post_status: 'pending',
                role_id: newUser.role_id,
            },
            users: await this.userService.findAll(),
        }, 'User Registration', 'User successfully registered');
    }
    async search(role, query, perPage = 12) {
        let users;
        if (role == 0) {
            users = await this.userService.userRepository.find({
                where: [
                    'first_name',
                    'last_name',
                    'phone_number',
                    'email',
                    'bvn',
                    'user_code',
                ].map((column) => ({ [column]: typeorm_1.Like(`%${query}%`) })),
                skip: 0,
                take: perPage,
            });
        }
        else {
            users = await this.userService.userRepository.find({
                where: [
                    'first_name',
                    'last_name',
                    'phone_number',
                    'email',
                    'bvn',
                    'user_code',
                ].map((column) => ({ [column]: typeorm_1.Like(`%${query}%`) })),
                skip: 0,
                take: perPage,
            });
        }
        const total = users.length;
        return utils_1.success(users.map((user) => {
            return Object.assign(Object.assign({}, user), { password: null });
        }), 'Users', 'Users list', {
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
        const total = await this.userService.userRepository.count(_filter);
        const users = await this.userService.userRepository.find({
            take: perPage,
            skip: (page - 1) * perPage,
            order: {
                created_at: "DESC",
            },
        });
        return utils_1.success(users.map((user) => {
            return Object.assign(Object.assign({}, user), { password: null });
        }), 'Users', 'Users list', {
            current_page: _page,
            next_page: _nextPage > total ? total : _nextPage,
            prev_page: _prevPage < 1 ? null : _prevPage,
            per_page: _perPage,
            total,
        });
    }
    async findOne(id) {
        const user = await this.userService.findOne(id);
        return utils_1.success(user ? Object.assign(Object.assign({}, user), { password: null, pin: utils_1.mask(user.pin), bvn: utils_1.mask(user.bvn) }) : null, 'Users', 'User details');
    }
    async update(id, user) {
        let userCustomerId = '' + utils_1.randomDigits(8);
        let fileName = '';
        if (user.image == '') {
            const useer = await this.userService.findOne(id);
            fileName = useer.image;
        }
        else {
            const imageName = user.first_name.replace(' ', "_") + `_${userCustomerId}`;
            const base64Data = new Buffer.from(user.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const type = user.image.split(';')[0].split('/')[1];
            const uploaded = await this.uploadFileToAws({ name: imageName, type: type, data: base64Data });
            fileName = uploaded.fileUrl;
        }
        const result = await this.userService.update(id, Object.assign(Object.assign(Object.assign({}, user), ((user === null || user === void 0 ? void 0 : user.image) ? { image: fileName } : {})), ((user === null || user === void 0 ? void 0 : user.phone_number) ? { phone_number: user.phone_number } : {})));
        return utils_1.success({
            id,
            user: await this.userService.findOne(id)
        }, 'Users', 'User details updated');
    }
    async remove(id) {
        await this.userService.remove(id);
        return utils_1.success({
            id,
        }, 'Users', 'User deleted');
    }
    async metrics(page = 1, perPage = 12, query, from, to) {
        const users = await this.userService.userRepository.count({
            take: perPage,
            skip: (page - 1) * perPage,
            where: utils_1.makeFilter(query, from, to, [
                'first_name',
                'last_name',
                'phone_number',
                'email',
                'bvn',
                'user_code',
            ]),
        });
        return utils_1.success({ users }, 'User Metrics', 'Collection of user metrics');
    }
    async resetPassword(id, passwords) {
        var _a;
        const existingUser = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'email', 'first_name', 'last_name', 'phone_number', 'image', 'user_code', 'password'],
            where: [{ id: id }],
        })) !== null && _a !== void 0 ? _a : null;
        const checkCurrentPassword = bcrypt.compareSync(passwords.current_password, existingUser.password);
        if (checkCurrentPassword) {
            if (passwords.new_password == passwords.confirm_new_password) {
                if (passwords.new_password == existingUser.password) {
                    return utils_1.error('Failed', 'Your new password can not be the same with the old password');
                }
                else {
                    await this.userService.update(existingUser.id, {
                        password: utils_1.hash(passwords.confirm_new_password),
                        updated_at: timeStamp,
                    });
                    return utils_1.success({
                        first_name: existingUser.first_name,
                        last_name: existingUser.last_name,
                        email: existingUser.email,
                        phone_number: existingUser.phone_number,
                        image: existingUser.image,
                    }, 'Password Updated', 'Password Changes Successfuly.');
                }
            }
            else {
                return utils_1.error('Failed', 'Your new password does not match.');
            }
        }
        else {
            return utils_1.error('Failed', 'Your current password does not match.');
        }
    }
    async confirmEmail(id) {
        var _a;
        const existingUser = await this.userService.findOne(id);
        if (existingUser.email_valid == true) {
            return utils_1.error('Email Confirmed', 'You have a verified email already. You cannot confirm email.');
        }
        const duplicateUser = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'email'],
            where: [{ email: existingUser.email }],
        })) !== null && _a !== void 0 ? _a : null;
        if (!(duplicateUser === null || duplicateUser === void 0 ? void 0 : duplicateUser.email)) {
            return utils_1.error('Fail', 'Email address not exists');
        }
        await this.userService.update(id, {
            email_valid: true,
            post_status: 'verified',
        });
        this.eventEmitter.emit(utils_1.Event.NEVER_BOUNCE_VERIFY, { user: Object.assign(Object.assign({}, existingUser), { email_valid: true }) });
        return utils_1.success([], 'Email Confirmed', 'Email address successfully verified.');
    }
    async updateUserCode(id, body) {
        var _a;
        const existingCode = await this.userService.userRepository.findOne({
            select: ['id', 'user_code'],
            where: [{ id: id, user_code: body.code }]
        });
        if (!existingCode) {
            return utils_1.error('Code Update', 'User code dose not exist. To chance to new code kindly provide the previous user code.');
        }
        let userCode = '' + utils_1.randomDigits(8);
        const confirmCode = await this.userService.userRepository.findOne({
            select: ['id', 'user_code'],
            where: [{ user_code: userCode }]
        });
        if (confirmCode) {
            userCode = '' + utils_1.randomDigits(8);
        }
        const duplicateUser = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'user_code'],
            where: [{ user_code: userCode }]
        })) !== null && _a !== void 0 ? _a : null;
        if (duplicateUser === null || duplicateUser === void 0 ? void 0 : duplicateUser.user_code) {
            return utils_1.error('User Code', 'User Code already exists, Kindly run again');
        }
        await this.userService.update(id, {
            user_code: userCode
        });
        return utils_1.success(userCode, 'User Code Update', 'User code successfully Changed.');
    }
    async updateEmail(id, body) {
        var _a;
        const existingUser = await this.userService.findOne(id);
        if (existingUser.email_otp_verified) {
            return utils_1.error('Email Update', 'You have a verified email already. You cannot update email.');
        }
        const duplicateUser = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'email'],
            where: [{ email: body.email }],
        })) !== null && _a !== void 0 ? _a : null;
        if (duplicateUser === null || duplicateUser === void 0 ? void 0 : duplicateUser.email) {
            return utils_1.error('Email Update', 'Email address already exists');
        }
        await this.userService.update(id, {
            email: body.email,
        });
        this.eventEmitter.emit(utils_1.Event.NEVER_BOUNCE_VERIFY, { user: Object.assign(Object.assign({}, existingUser), { email: body.email }) });
        return utils_1.success(body, 'Email Update', 'Email address successfully updated.');
    }
    async updatePhoneNumber(id, body) {
        var _a;
        const existingUser = await this.userService.findOne(id);
        if (existingUser.phone_otp_verified) {
            return utils_1.error('Phone Number Update', 'You have a verified phone number already. You cannot update phone number.');
        }
        const phone_number = utils_1.unifyPhoneNumber(body.phone_number);
        const duplicateUser = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'phone_number'],
            where: [{ phone_number }, { phone_number: body.phone_number }],
        })) !== null && _a !== void 0 ? _a : null;
        if (duplicateUser === null || duplicateUser === void 0 ? void 0 : duplicateUser.phone_number) {
            return utils_1.error('Phone Number Update', 'Phone number already exists');
        }
        await this.userService.update(id, {
            phone_number,
        });
        return utils_1.success(body, 'Phone Number Update', 'Phone Number address successfully updated.');
    }
    async suspend(id, authUser, body) {
        const { message } = body;
        const existingUser = await this.userService.findOne(id);
        if (existingUser.closed_at !== null) {
            return utils_1.error('Account Status', 'This account is currently being reviewed.');
        }
        const updatedRes = await this.userService.update(id, {
            suspended_at: timeStamp,
            post_status: 'suspended',
            status: false,
            updated_at: timeStamp,
            updated_by: authUser.id,
        });
        if (updatedRes) {
            const newUpate = await this.userService.findOne(id);
            return utils_1.success({
                user: newUpate,
                users: await this.userService.findAll()
            }, 'Account Status', 'This account has been placed under review.');
        }
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
        if (updatedRes) {
            const newUpate = await this.userService.findOne(id);
            return utils_1.success({
                user: newUpate,
                users: await this.userService.findAll()
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
        if (updatedRes) {
            const newUpate = await this.userService.findOne(id);
            return utils_1.success({
                user: newUpate,
                users: await this.userService.findAll()
            }, 'Account Status', 'Your account has been closed');
        }
    }
    async openAccount(id, authUser, body) {
        const { message } = body;
        const existingUser = await this.userService.findOne(id);
        if (existingUser.closed_at === null) {
            return utils_1.error('Open Account', 'Your account is not closed.');
        }
        await this.userService.update(id, {
            closed_at: null,
        });
        this.eventEmitter.emit(utils_1.Event.LOG_ACTIVITY, {
            action: 'Open',
            category: 'User',
            message: null,
            data: {
                message,
                id,
            },
            user: {
                id: authUser.id,
            },
        });
        return utils_1.success({
            user: await this.userService.findOne(id),
            users: await this.userService.findAll()
        }, 'Account Status', 'Your account is now active');
    }
    async usersMgntDashboard() {
        const total_user = await this.userService.findAll();
        const pendingUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'pending' }]
        });
        const activeUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ status: 1 }]
        });
        const inActiveUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ status: 0 }]
        });
        const closedUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'closed' }]
        });
        const emailValid = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ email_valid: 0 }]
        });
        const onlineUsers = await this.userService.userRepository.find({
            select: ['id', 'user_code'],
            where: [{ post_status: 'online' }]
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
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Get('search'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Query('role')),
    __param(1, common_1.Query('query')),
    __param(2, common_1.Query('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "search", null);
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
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    common_1.Get('metrics'),
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
], UserController.prototype, "metrics", null);
__decorate([
    common_1.Patch('change-password/:id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.ChangeResetPasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    common_1.Get(':id/confirm-email'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmEmail", null);
__decorate([
    common_1.Patch(':id/update-user-code'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserCodeDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserCode", null);
__decorate([
    common_1.Patch(':id/update-email'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateEmailDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateEmail", null);
__decorate([
    common_1.Patch(':id/update-phone-number'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdatePhoneNumberDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePhoneNumber", null);
__decorate([
    common_1.Patch(':id/suspend'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, update_user_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "suspend", null);
__decorate([
    common_1.Patch(':id/unsuspend'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, update_user_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unsuspend", null);
__decorate([
    common_1.Patch(':id/close-account'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, update_user_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "closeAccount", null);
__decorate([
    common_1.Patch(':id/open-account'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User, update_user_dto_1.MessageDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "openAccount", null);
__decorate([
    common_1.Get('users-managment-analysis'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "usersMgntDashboard", null);
UserController = __decorate([
    common_1.Controller('admin/user'),
    __param(0, common_1.Inject(common_1.forwardRef(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService,
        mail_service_1.MailService,
        event_emitter_1.EventEmitter2,
        common_1.HttpService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map