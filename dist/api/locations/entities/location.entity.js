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
exports.Location = void 0;
const typeorm_1 = require("typeorm");
let Location = class Location {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Location.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'institution_name', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "location_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'bank_code', nullable: true, length: 30 }),
    __metadata("design:type", String)
], Location.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'address', nullable: true, length: 200 }),
    __metadata("design:type", String)
], Location.prototype, "address", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'state', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'lga', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "lga", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'geo_political_zone', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "geo_political_zone", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'latitude', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'longitude', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status', nullable: true, length: 50 }),
    __metadata("design:type", Number)
], Location.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'created_at', nullable: true }),
    __metadata("design:type", Object)
], Location.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], Location.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'approved_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "approved_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'approved_at', nullable: true }),
    __metadata("design:type", Object)
], Location.prototype, "approved_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'timestamp' }),
    __metadata("design:type", Date)
], Location.prototype, "timestamp", void 0);
Location = __decorate([
    typeorm_1.Entity({
        name: 'locations',
    }),
    typeorm_1.Unique(['id'])
], Location);
exports.Location = Location;
//# sourceMappingURL=location.entity.js.map