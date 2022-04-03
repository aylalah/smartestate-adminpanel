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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const utils_1 = require("../../utils");
const event_emitter_1 = require("@nestjs/event-emitter");
let UserService = class UserService {
    constructor(userRepository, eventEmitter) {
        this.userRepository = userRepository;
        this.eventEmitter = eventEmitter;
    }
    create(user) {
        return this.userRepository.save(user);
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.findOne(id);
    }
    async findOneByEmailOrPhoneNumber(emailOrPhoneNumber) {
        let existingUser = null;
        if (utils_1.isNumeric(emailOrPhoneNumber)) {
            existingUser = await this.userRepository.findOne({
                where: [{ phone_number: emailOrPhoneNumber }, { phone_number: utils_1.formatPhoneNumber(emailOrPhoneNumber) }]
            });
        }
        else {
            existingUser = await this.userRepository.findOne({
                email: emailOrPhoneNumber,
            });
        }
        return existingUser;
    }
    async update(id, user) {
        this.eventEmitter.emit(utils_1.Event.USER_BEFORE_PROFILE_UPDATE, Object.assign({ id }, user));
        const existingUser = await this.userRepository.findOne({
            select: ['id', 'image', 'phone_number'],
            where: [{ id }]
        });
        const result = await this.userRepository.update(id, Object.assign({}, user));
        this.eventEmitter.emit(utils_1.Event.USER_AFTER_PROFILE_UPDATE, Object.assign({ id }, user));
        return result;
    }
    remove(id) {
        return this.userRepository.delete(id);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map