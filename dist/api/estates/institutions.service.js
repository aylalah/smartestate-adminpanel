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
exports.InstitutionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const estate_entity_1 = require("./entities/estate.entity");
let InstitutionsService = class InstitutionsService {
    constructor(institutionRepository, eventEmitter) {
        this.institutionRepository = institutionRepository;
        this.eventEmitter = eventEmitter;
    }
    create(institution) {
        return this.institutionRepository.save(institution);
    }
    findAll() {
        return this.institutionRepository.find();
    }
    findOne(id) {
        return this.institutionRepository.findOne(id);
    }
    async update(id, institution) {
        const existingInstitution = await this.institutionRepository.findOne({
            select: ['id', 'estate_name', 'estate_code', 'email'],
            where: [{ id }]
        });
        const result = await this.institutionRepository.update(id, Object.assign({}, institution));
        return result;
    }
    remove(id) {
        return this.institutionRepository.delete(id);
    }
};
InstitutionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(estate_entity_1.Institution)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], InstitutionsService);
exports.InstitutionsService = InstitutionsService;
//# sourceMappingURL=institutions.service.js.map