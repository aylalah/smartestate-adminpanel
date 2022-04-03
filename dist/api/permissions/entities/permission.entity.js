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
exports.Permission = void 0;
const role_entity_1 = require("../../role/entities/role.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Permission = class Permission {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Permission.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'role_id', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Permission.prototype, "role_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'permission_name', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Permission.prototype, "permission_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'description', nullable: true, length: 200 }),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'slug', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Permission.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ type: "json", name: 'module_access', nullable: true }),
    __metadata("design:type", Object)
], Permission.prototype, "module_access", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status', nullable: true, length: 50 }),
    __metadata("design:type", Number)
], Permission.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToMany((type) => user_entity_1.User, (user) => user.permission),
    __metadata("design:type", user_entity_1.User)
], Permission.prototype, "user", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Permission.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Permission.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'approved_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Permission.prototype, "approved_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'created_at', nullable: true }),
    __metadata("design:type", Object)
], Permission.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], Permission.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'approved_at', nullable: true }),
    __metadata("design:type", Object)
], Permission.prototype, "approved_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'timestamp' }),
    __metadata("design:type", Date)
], Permission.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => role_entity_1.Role, (role) => role.permission, { eager: true }),
    __metadata("design:type", role_entity_1.Role)
], Permission.prototype, "role", void 0);
Permission = __decorate([
    typeorm_1.Entity({
        name: 'permissions',
    }),
    typeorm_1.Unique(['id'])
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=permission.entity.js.map