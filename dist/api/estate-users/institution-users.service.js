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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const institution_user_entity_1 = require("./entities/institution-user.entity");
let InstitutionUsersService = class InstitutionUsersService {
    constructor(institutionUserRepository, eventEmitter) {
        this.institutionUserRepository = institutionUserRepository;
        this.eventEmitter = eventEmitter;
    }
    create(institutionUser) {
        return this.institutionUserRepository.save(institutionUser);
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
    __param(0, typeorm_1.InjectRepository(institution_user_entity_1.InstitutionUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], InstitutionUsersService);
exports.InstitutionUsersService = InstitutionUsersService;
//# sourceMappingURL=institution-users.service.js.map