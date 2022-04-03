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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const location_entity_1 = require("./entities/location.entity");
const fs = require("fs");
const path = require("path");
let LocationsService = class LocationsService {
    constructor(locationRepository, eventEmitter) {
        this.locationRepository = locationRepository;
        this.eventEmitter = eventEmitter;
    }
    create(location) {
        return this.locationRepository.save(location);
    }
    findAll() {
        return this.locationRepository.find();
    }
    findOne(id) {
        return this.locationRepository.findOne(id);
    }
    async update(id, location) {
        const existingLocation = await this.locationRepository.findOne({
            select: ['id', 'location_name', 'slug'],
            where: [{ id }]
        });
        const result = await this.locationRepository.update(id, Object.assign({}, location));
        return result;
    }
    remove(id) {
        return this.locationRepository.delete(id);
    }
};
LocationsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(location_entity_1.Location)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], LocationsService);
exports.LocationsService = LocationsService;
//# sourceMappingURL=locations.service.js.map