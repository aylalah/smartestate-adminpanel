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
exports.Institution = void 0;
const typeorm_1 = require("typeorm");
const institution_user_entity_1 = require("../../estate-users/entities/institution-user.entity");
let Institution = class Institution {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Institution.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'estate_name', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "estate_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'estate_code', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Institution.prototype, "estate_code", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'estate_slug', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "estate_slug", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'contact_person', nullable: true, length: 15 }),
    __metadata("design:type", String)
], Institution.prototype, "contact_person", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'phone_number', nullable: true, length: 15 }),
    __metadata("design:type", String)
], Institution.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'email', nullable: true, length: 52 }),
    __metadata("design:type", String)
], Institution.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'email_valid', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], Institution.prototype, "email_valid", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'base_url', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "base_url", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'api_url', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "api_url", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'web_url', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "web_url", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'db_name', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "db_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'plan', nullable: true, length: 30 }),
    __metadata("design:type", String)
], Institution.prototype, "plan", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'address', nullable: true, length: 200 }),
    __metadata("design:type", String)
], Institution.prototype, "address", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'state', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'lga', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "lga", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'api_token', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "api_token", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'logo', nullable: true, length: 255 }),
    __metadata("design:type", String)
], Institution.prototype, "logo", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'bank', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "bank", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'account_number', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "account_number", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'account_name', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "account_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status', nullable: true, length: 50 }),
    __metadata("design:type", Number)
], Institution.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'created_at', nullable: true }),
    __metadata("design:type", Object)
], Institution.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], Institution.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'approved_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Institution.prototype, "approved_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'approved_at', nullable: true }),
    __metadata("design:type", Object)
], Institution.prototype, "approved_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'timestamp' }),
    __metadata("design:type", Date)
], Institution.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.OneToMany((type) => institution_user_entity_1.InstitutionUser, (institutionUser) => institutionUser.institution),
    __metadata("design:type", institution_user_entity_1.InstitutionUser)
], Institution.prototype, "institutionUser", void 0);
Institution = __decorate([
    typeorm_1.Entity({
        name: 'estates',
    }),
    typeorm_1.Unique(['id'])
], Institution);
exports.Institution = Institution;
//# sourceMappingURL=estate.entity.js.map