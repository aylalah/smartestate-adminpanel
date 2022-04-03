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
exports.InstitutionUser = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const institution_entity_1 = require("../../estates/entities/institution.entity");
let InstitutionUser = class InstitutionUser {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], InstitutionUser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'user_id', nullable: true, length: 200 }),
    __metadata("design:type", String)
], InstitutionUser.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'institution_id', nullable: true, length: 36 }),
    __metadata("design:type", String)
], InstitutionUser.prototype, "institution_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status', nullable: true, length: 50 }),
    __metadata("design:type", Number)
], InstitutionUser.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], InstitutionUser.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], InstitutionUser.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'created_at', nullable: true }),
    __metadata("design:type", Object)
], InstitutionUser.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], InstitutionUser.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'approved_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], InstitutionUser.prototype, "approved_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'approved_at', nullable: true }),
    __metadata("design:type", Object)
], InstitutionUser.prototype, "approved_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'timestamp' }),
    __metadata("design:type", Date)
], InstitutionUser.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.institutionUser, { eager: true }),
    typeorm_1.JoinColumn({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], InstitutionUser.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => institution_entity_1.Institution, (institution) => institution.institutionUser, { eager: true }),
    typeorm_1.JoinColumn({ name: "institution_id" }),
    __metadata("design:type", institution_entity_1.Institution)
], InstitutionUser.prototype, "institution", void 0);
InstitutionUser = __decorate([
    typeorm_1.Entity({
        name: 'institution_users',
    }),
    typeorm_1.Unique(['id'])
], InstitutionUser);
exports.InstitutionUser = InstitutionUser;
//# sourceMappingURL=institution-user.entity.js.map