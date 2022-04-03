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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("./../../permissions/entities/permission.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let Role = class Role {
};
__decorate([
    typeorm_1.Column("char", { primary: true, name: "id", length: 36 }),
    __metadata("design:type", String)
], Role.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'user_type', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Role.prototype, "user_type", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'role_name', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Role.prototype, "role_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'description', nullable: true, length: 200 }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'slug', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Role.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status', nullable: true, length: 50 }),
    __metadata("design:type", Number)
], Role.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany((type) => permission_entity_1.Permission, (permission) => permission.role),
    __metadata("design:type", permission_entity_1.Permission)
], Role.prototype, "permission", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Role.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Role.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'created_at', nullable: true }),
    __metadata("design:type", Object)
], Role.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], Role.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'timestamp' }),
    __metadata("design:type", Date)
], Role.prototype, "timestamp", void 0);
Role = __decorate([
    typeorm_1.Entity({
        name: 'roles',
    }),
    typeorm_1.Unique(['id'])
], Role);
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map