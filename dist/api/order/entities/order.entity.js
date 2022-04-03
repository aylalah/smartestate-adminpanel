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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'product_id', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "product_id", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'app_code', nullable: true, length: 5 }),
    __metadata("design:type", String)
], Order.prototype, "app_code", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'serial_number', nullable: true, length: 16 }),
    __metadata("design:type", String)
], Order.prototype, "serial_number", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'plan', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Order.prototype, "plan", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'school_name', nullable: true, length: 52 }),
    __metadata("design:type", String)
], Order.prototype, "school_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'address', nullable: true, length: 200 }),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'about', nullable: true, length: 200 }),
    __metadata("design:type", String)
], Order.prototype, "about", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'country', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Order.prototype, "country", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'state', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Order.prototype, "state", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'town', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Order.prototype, "town", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'poster_code', nullable: true, length: 20 }),
    __metadata("design:type", String)
], Order.prototype, "poster_code", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'email', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'password', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'mobile', nullable: true, length: 20 }),
    __metadata("design:type", String)
], Order.prototype, "mobile", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'phone', nullable: true, length: 20 }),
    __metadata("design:type", String)
], Order.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'document', nullable: true, length: 255, transformer: {
            to: (value) => value,
            from: (value) => value ? `${process.env.DOCUMENT_BASE_URL}/${value}` : value,
        } }),
    __metadata("design:type", String)
], Order.prototype, "document", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'fax', nullable: true, length: 20 }),
    __metadata("design:type", String)
], Order.prototype, "fax", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'website', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "website", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'app_url', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "app_url", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'contact_person', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "contact_person", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'status', nullable: true, length: 10 }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'created_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "created_by", void 0);
__decorate([
    typeorm_1.Column('varchar', { name: 'updated_by', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Order.prototype, "updated_by", void 0);
__decorate([
    typeorm_1.Column('date', { name: 'created_at', nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column('datetime', { name: 'updated_at', nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'timestamp' }),
    __metadata("design:type", Date)
], Order.prototype, "timestamp", void 0);
Order = __decorate([
    typeorm_1.Entity({
        name: 'orders',
    }),
    typeorm_1.Unique(['id'])
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map