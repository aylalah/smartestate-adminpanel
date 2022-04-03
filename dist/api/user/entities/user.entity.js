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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const role_entity_1 = require("../../role/entities/role.entity");
const permission_entity_1 = require("../../permissions/entities/permission.entity");
const institution_user_entity_1 = require("../../estate-users/entities/institution-user.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'role_id', nullable: true, length: 36 }),
    __metadata("design:type", String)
], User.prototype, "role_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'permission_id', nullable: true, length: 36 }),
    __metadata("design:type", String)
], User.prototype, "permission_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'user_code', nullable: true, length: 26 }),
    __metadata("design:type", String)
], User.prototype, "user_code", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'first_name', nullable: true, length: 52 }),
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'last_name', nullable: true, length: 52 }),
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'username', nullable: true, length: 52 }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'email', nullable: true, length: 52 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'email_valid', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], User.prototype, "email_valid", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'password', length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'phone_number', nullable: true, length: 26 }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'bvn', nullable: true, length: 11 }),
    __metadata("design:type", String)
], User.prototype, "bvn", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'bvn_valid', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], User.prototype, "bvn_valid", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'gender', nullable: true, length: 26 }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'home_address', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "home_address", void 0);
__decorate([
    typeorm_1.Column('varchar', {
        name: 'state_of_residence',
        nullable: true,
        length: 100,
    }),
    __metadata("design:type", String)
], User.prototype, "state_of_residence", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'lga', nullable: true, length: 200 }),
    __metadata("design:type", String)
], User.prototype, "lga", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'geo_political_zone', nullable: true, length: 200 }),
    __metadata("design:type", String)
], User.prototype, "geo_political_zone", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'image', nullable: true, length: 255, transformer: {
            to: (value) => value,
            from: (value) => value ? `${process.env.PROFILE_BASE_URL}/${value}` : value,
        } }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'document', nullable: true, length: 255, transformer: {
            to: (value) => value,
            from: (value) => value ? `${process.env.DOCUMENT_BASE_URL}/${value}` : value,
        } }),
    __metadata("design:type", String)
], User.prototype, "document", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'document_state', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], User.prototype, "document_state", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'pin', nullable: true, length: 60 }),
    __metadata("design:type", String)
], User.prototype, "pin", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'phone_otp', nullable: true, length: 20 }),
    __metadata("design:type", String)
], User.prototype, "phone_otp", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'phone_otp_verified', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], User.prototype, "phone_otp_verified", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'email_otp', nullable: true, length: 20 }),
    __metadata("design:type", String)
], User.prototype, "email_otp", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'email_otp_verified', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], User.prototype, "email_otp_verified", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'email_token', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "email_token", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'bvn_otp_verified', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], User.prototype, "bvn_otp_verified", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'bvn_phone_number', nullable: true, length: 26 }),
    __metadata("design:type", String)
], User.prototype, "bvn_phone_number", void 0);
__decorate([
    typeorm_1.Column('tinyint', { name: 'status', nullable: true, width: 1 }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'post_status', length: 26 }),
    __metadata("design:type", String)
], User.prototype, "post_status", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'device_type', nullable: true, length: 26 }),
    __metadata("design:type", String)
], User.prototype, "device_type", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'device_id', nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "device_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => permission_entity_1.Permission, (permission) => permission.user, { eager: true }),
    __metadata("design:type", permission_entity_1.Permission)
], User.prototype, "permission", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'ondording_date' }),
    __metadata("design:type", String)
], User.prototype, "ondording_date", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'suspended_at', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "suspended_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'closed_at', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "closed_at", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 50 }),
    __metadata("design:type", String)
], User.prototype, "created_by", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", String)
], User.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 50 }),
    __metadata("design:type", String)
], User.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', select: false }),
    __metadata("design:type", String)
], User.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at', select: false }),
    __metadata("design:type", String)
], User.prototype, "deleted_at", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'approved_by', nullable: true, length: 50 }),
    __metadata("design:type", String)
], User.prototype, "approved_by", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'approved_at', select: false }),
    __metadata("design:type", String)
], User.prototype, "approved_at", void 0);
__decorate([
    typeorm_1.Column('timestamp', { name: 'last_activity', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "last_activity", void 0);
__decorate([
    typeorm_1.OneToMany((type) => institution_user_entity_1.InstitutionUser, (institutionUser) => institutionUser.institution),
    __metadata("design:type", institution_user_entity_1.InstitutionUser)
], User.prototype, "institutionUser", void 0);
User = __decorate([
    typeorm_1.Entity({
        name: 'users',
    }),
    typeorm_1.Unique(['id'])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map