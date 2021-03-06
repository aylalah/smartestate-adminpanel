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
exports.PermissionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const permission_entity_1 = require("./entities/permission.entity");
let PermissionsService = class PermissionsService {
    constructor(permissionRepository, eventEmitter) {
        this.permissionRepository = permissionRepository;
        this.eventEmitter = eventEmitter;
    }
    create(permission) {
        return this.permissionRepository.save(permission);
    }
    findAll() {
        return this.permissionRepository.find();
    }
    findOne(id) {
        return this.permissionRepository.findOne(id);
    }
    async update(id, permission) {
        const existingPermission = await this.permissionRepository.findOne({
            select: ['id', 'permission_name', 'slug'],
            where: [{ id }]
        });
        const result = await this.permissionRepository.update(id, Object.assign({}, permission));
        return result;
    }
    remove(id) {
        return this.permissionRepository.delete(id);
    }
};
PermissionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], PermissionsService);
exports.PermissionsService = PermissionsService;
//# sourceMappingURL=permissions.service.js.map