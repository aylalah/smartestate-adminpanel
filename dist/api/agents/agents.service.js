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
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const agent_entity_1 = require("./entities/agent.entity");
let AgentsService = class AgentsService {
    constructor(agentRepository, eventEmitter) {
        this.agentRepository = agentRepository;
        this.eventEmitter = eventEmitter;
    }
    create(agent) {
        return this.agentRepository.save(agent);
    }
    findAll() {
        return this.agentRepository.find();
    }
    findOne(id) {
        return this.agentRepository.findOne(id);
    }
    async update(id, agent) {
        const existingAgent = await this.agentRepository.findOne({
            select: ['id', 'user_id'],
            where: [{ user_id: id }]
        });
        const result = await this.agentRepository.update(id, Object.assign({}, agent));
        return result;
    }
    remove(user_id) {
        return this.agentRepository.delete({ user_id });
    }
};
AgentsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(agent_entity_1.Agent)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], AgentsService);
exports.AgentsService = AgentsService;
//# sourceMappingURL=agents.service.js.map