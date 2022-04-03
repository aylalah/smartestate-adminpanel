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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const estate_entity_1 = require("../../estates/entities/estate.entity");
const device_entity_1 = require("../../devices/entities/device.entity");
let Agent = class Agent {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Agent.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'user_id', nullable: true, length: 200 }),
    __metadata("design:type", String)
], Agent.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'institution_id', nullable: true, length: 36 }),
    __metadata("design:type", String)
], Agent.prototype, "institution_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'location_id', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Agent.prototype, "location_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'bank_code', nullable: true, length: 36 }),
    __metadata("design:type", String)
], Agent.prototype, "bank_code", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'bank_name', nullable: true, length: 36 }),
    __metadata("design:type", String)
], Agent.prototype, "bank_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'account_number', nullable: true, length: 20 }),
    __metadata("design:type", String)
], Agent.prototype, "account_number", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'account_name', nullable: true, length: 30 }),
    __metadata("design:type", String)
], Agent.prototype, "account_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status', nullable: true, length: 50 }),
    __metadata("design:type", Number)
], Agent.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Agent.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Agent.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'created_at', nullable: true }),
    __metadata("design:type", Object)
], Agent.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], Agent.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'approved_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Agent.prototype, "approved_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'approved_at', nullable: true }),
    __metadata("design:type", Object)
], Agent.prototype, "approved_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'timestamp' }),
    __metadata("design:type", Date)
], Agent.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.agent, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], Agent.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => estate_entity_1.Institution, (institution) => institution.agent, { eager: true }),
    typeorm_1.JoinColumn({ name: "institution_id" }),
    __metadata("design:type", estate_entity_1.Institution)
], Agent.prototype, "institution", void 0);
__decorate([
    typeorm_1.OneToMany((type) => device_entity_1.Device, (device) => device.agent),
    __metadata("design:type", device_entity_1.Device)
], Agent.prototype, "device", void 0);
Agent = __decorate([
    typeorm_1.Entity({
        name: 'agents',
    }),
    typeorm_1.Unique(['id'])
], Agent);
exports.Agent = Agent;
//# sourceMappingURL=agent.entity.js.map