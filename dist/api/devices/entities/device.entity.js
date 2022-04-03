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
exports.Device = void 0;
const typeorm_1 = require("typeorm");
let Device = class Device {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Device.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'agent_code', nullable: true, length: 10 }),
    __metadata("design:type", String)
], Device.prototype, "agent_code", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'agent_id', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Device.prototype, "agent_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'device_type', nullable: true, length: 36 }),
    __metadata("design:type", String)
], Device.prototype, "device_type", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'device_id', nullable: true, length: 36 }),
    __metadata("design:type", String)
], Device.prototype, "device_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'manufactural_name', nullable: true, length: 36 }),
    __metadata("design:type", String)
], Device.prototype, "manufactural_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'otp', nullable: true, length: 10 }),
    __metadata("design:type", String)
], Device.prototype, "otp", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status', nullable: true, length: 10 }),
    __metadata("design:type", Number)
], Device.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status_text', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Device.prototype, "status_text", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Device.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Device.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'created_at', nullable: true }),
    __metadata("design:type", Object)
], Device.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], Device.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'approved_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Device.prototype, "approved_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'approved_at', nullable: true }),
    __metadata("design:type", Object)
], Device.prototype, "approved_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'timestamp' }),
    __metadata("design:type", Date)
], Device.prototype, "timestamp", void 0);
Device = __decorate([
    typeorm_1.Entity({
        name: 'devices',
    }),
    typeorm_1.Unique(['id'])
], Device);
exports.Device = Device;
//# sourceMappingURL=device.entity.js.map