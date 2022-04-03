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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_guard_1 = require("./local-strategy/local.guard");
const jwt_guard_1 = require("./jwt-strategy/jwt.guard");
const utils_1 = require("../../utils");
const eventemitter2_1 = require("eventemitter2");
const swagger_1 = require("@nestjs/swagger");
const user_1 = require("../user");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const decorators_1 = require("../../decorators");
const moment = require("moment");
const jwt_1 = require("@nestjs/jwt");
const buffer_1 = require("buffer");
const mail_service_1 = require("../../mail/mail.service");
const common_2 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
let AuthController = class AuthController {
    constructor(userService, mailService, authService, eventEmitter, jwtService) {
        this.userService = userService;
        this.mailService = mailService;
        this.authService = authService;
        this.eventEmitter = eventEmitter;
        this.jwtService = jwtService;
    }
    async register(user) {
        var _a;
        this.eventEmitter.emit(utils_1.Event.USER_BEFORE_REGISTER, { user });
        const password = user.first_name + '.' + utils_1.randomDigits(8);
        console.log(password);
        let { role_id, permission_id, first_name, last_name, username, email, image, phone_number, home_address, state_of_residence, lga, geo_political_zone } = user;
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
        let userCustomerId = '' + utils_1.randomDigits(12);
        while ((await customerIdExist(userCustomerId)) === true) {
            userCustomerId = '' + utils_1.randomDigits(12);
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
            const fileContents = buffer_1.Buffer.from(base64Data[2], 'base64');
            const imag = fs.writeFile(`public/images/${fileName}`, fileContents, 'base64', (err) => {
                if (err)
                    return console.error(err);
                console.log('file saved to ', `public/images/${fileName}`);
            });
        }
        const res = this.mailService.welcomeUser({
            first_name,
            last_name,
            email,
            phone_number,
            home_address,
            permission_id,
            image: fileName,
            user_code: userCustomerId,
            password: password
        });
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
            email_valid: false,
            status: false,
            post_status: 'pending',
            user_code: userCustomerId,
            password: utils_1.hash(password),
            ondording_date: todatsDate,
            created_at: timeStamp,
        });
        this.eventEmitter.emit(utils_1.Event.NEVER_BOUNCE_VERIFY, { user: newUser });
        this.eventEmitter.emit(utils_1.Event.USER_AFTER_REGISTER, {
            user: Object.assign(Object.assign({}, newUser), { password: null, pin: null, bvn: null }),
        });
        const token = await this.authService.login(newUser);
        return utils_1.success({
            user: {
                token: token.token,
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                phone_number: newUser.phone_number,
                gender: newUser.gender,
                image: newUser.image,
                permission_id: newUser.permission_id,
                username: newUser.username,
                state_of_residence: newUser.state_of_residence,
                lga: newUser.lga,
                geo_political_zone: newUser.geo_political_zone,
                user_code: newUser.user_code,
                password: null,
                pin: utils_1.mask(newUser.pin),
                bvn: utils_1.mask(newUser.bvn),
            },
            users: await this.userService.findAll(),
        }, 'User Registration', 'User successfully registered');
    }
    async login(user, authUser) {
        var _a, _b;
        this.eventEmitter.emit(utils_1.Event.USER_BEFORE_LOGIN, { user });
        const token = await this.authService.login(authUser);
        const userMeta = {
            device_id: (_a = user === null || user === void 0 ? void 0 : user.device_id) !== null && _a !== void 0 ? _a : authUser.device_id,
            device_type: (_b = user === null || user === void 0 ? void 0 : user.device_type) !== null && _b !== void 0 ? _b : authUser.device_type,
        };
        this.userService.update(authUser.id, userMeta);
        const { first_name, last_name, email, phone_number, device_id, device_type, user_code, permission, } = authUser;
        this.eventEmitter.emit(utils_1.Event.USER_AFTER_LOGIN, { user: Object.assign(Object.assign({}, authUser), userMeta) });
        if (!(authUser === null || authUser === void 0 ? void 0 : authUser.email_valid)) {
            throw new common_2.UnauthorizedException('Your email have not been verified.');
        }
        if ((authUser === null || authUser === void 0 ? void 0 : authUser.status) == false) {
            throw new common_2.UnauthorizedException('Your account have not been activated by the admin');
        }
        if ((authUser === null || authUser === void 0 ? void 0 : authUser.post_status) == 'suspended') {
            throw new common_2.UnauthorizedException('Your account is being reviewed, kindly reach out to us');
        }
        return utils_1.success({
            token: token.token,
            id: authUser.id,
            first_name,
            last_name,
            email,
            image: authUser.image,
            phone_number,
            device_id,
            device_type,
            user_code,
            password: null,
            permission: permission,
        }, 'Sign In', 'Sign in was successful');
    }
    async refresh(refreshToken) {
        const oldToken = refreshToken.token;
        const payload = this.jwtService.decode(oldToken);
        const id = payload === null || payload === void 0 ? void 0 : payload.sub;
        if (!id) {
            return utils_1.error('Token Refresh', 'You need to login again :)');
        }
        const user = await this.userService.findOne(id);
        if (!user) {
            return utils_1.error('Token Refresh', 'You need to login again :)');
        }
        const authUser = await this.authService.login(user);
        return utils_1.success(Object.assign({}, authUser), 'Token Refresh', 'Token refresh was successful');
    }
    async forgotPassword(initialEmail) {
        var _a;
        const existingUser = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'email', 'first_name', 'last_name', 'phone_number', 'image', 'user_code', 'email_token'],
            where: [{ email: initialEmail.email }],
        })) !== null && _a !== void 0 ? _a : null;
        if (!existingUser) {
            return utils_1.error('Failed', 'Email address dose not exist.');
        }
        const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
        const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
        const allUniqueChars = [..."-@#$%"];
        const allNumbers = [..."0123456789"];
        const base = [...allCapsAlpha, ...allNumbers, ...allLowerAlpha];
        const emailtoken = [...Array(15)].map(i => base[Math.random() * base.length | 0]).join('');
        await this.userService.update(existingUser.id, {
            email_token: emailtoken,
            updated_at: timeStamp
        });
        this.eventEmitter.emit(utils_1.Event.NEVER_BOUNCE_VERIFY, { user: Object.assign(Object.assign({}, existingUser), { email_token: emailtoken }) });
        return utils_1.success({ "email_token": emailtoken }, 'New password initiation successful', 'An email have been sent to you, kindly check and reset your password.');
    }
    async tokenStaus(token) {
        var _a;
        const existingToken = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'email', 'email_token', 'updated_at'],
            where: [{ email_token: token }],
        })) !== null && _a !== void 0 ? _a : null;
        if (!existingToken) {
            return {
                status: 'error',
                title: 'Failed',
                message: 'No password request.',
            };
        }
        const date = moment(existingToken.updated_at).format("YYYY-MM-DD HH:mm:ss.SSS");
        const currentTimestamp = moment(new Date()).format('HH:mm:ss');
        const duration = moment().diff(date, 'minutes');
        if (duration <= 30) {
            return utils_1.success({
                email: existingToken.email,
                token: existingToken.email_token,
                minute: duration
            }, 'valid', 'Email token is valid.');
        }
        else {
            return {
                status: 'error',
                title: 'invalide',
                message: 'Email token has expired.',
            };
        }
    }
    async resetPassword(token, passwords) {
        var _a;
        const tokenStatus = await this.tokenStaus(token);
        if (tokenStatus.status == 'error') {
            return {
                status: 'error',
                title: 'invalide',
                message: 'Expired Email token.',
            };
        }
        const existingToken = (_a = await this.userService.userRepository.findOne({
            select: ['id', 'email', 'first_name', 'last_name', 'phone_number', 'image', 'user_code', 'email_token'],
            where: [{ email_token: token }],
        })) !== null && _a !== void 0 ? _a : null;
        await this.userService.update(existingToken.id, {
            password: utils_1.hash(passwords.confirm_new_password),
            email_token: null,
            updated_at: timeStamp,
        });
        return utils_1.success({ "email": existingToken.email }, 'Password Reset Successfuly', 'New password have been reset successfuly.');
    }
    async user(authUser) {
        const user = await this.userService.findOne(authUser.id);
        return utils_1.success(Object.assign(Object.assign({}, user), { password: null, pin: utils_1.mask(user.pin), bvn: utils_1.mask(user.bvn) }), 'User Profile', 'User profile details');
    }
    async update(user, authUser) {
        await this.userService.update(authUser.id, Object.assign({}, user));
        const existingUser = await this.userService.findOne(authUser.id);
        return utils_1.success(Object.assign(Object.assign({}, existingUser), { password: null }), 'Users', 'User details updated');
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    common_1.UseGuards(local_guard_1.LocalGuard),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.LoginUserDto, user_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('refresh-token'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    common_1.Post('forgot-password'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.InitiateResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    common_1.Get('check-email-token/:token'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "tokenStaus", null);
__decorate([
    common_1.Patch('reset-password/:token'),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('token')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    common_1.Get('profile'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "user", null);
__decorate([
    common_1.Patch('profile'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateProfileDto, user_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
AuthController = __decorate([
    common_1.Controller('user'),
    __param(0, common_1.Inject(common_1.forwardRef(() => user_1.UserService))),
    __metadata("design:paramtypes", [user_1.UserService,
        mail_service_1.MailService,
        auth_service_1.AuthService,
        eventemitter2_1.EventEmitter2,
        jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map