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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const role_entity_1 = require("./entities/role.entity");
const fs = require("fs");
const path = require("path");
let RoleService = class RoleService {
    constructor(roleRepository, eventEmitter) {
        this.roleRepository = roleRepository;
        this.eventEmitter = eventEmitter;
    }
    create(role) {
        return this.roleRepository.save(role);
    }
    findAll() {
        return this.roleRepository.find();
    }
    findOne(id) {
        return this.roleRepository.findOne(id);
    }
    async update(id, role) {
        const existingRole = await this.roleRepository.findOne({
            select: ['id', 'role_name', 'slug'],
            where: [{ id }]
        });
        const result = await this.roleRepository.update(id, Object.assign({}, role));
        return result;
    }
    remove(id) {
        return this.roleRepository.delete(id);
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map