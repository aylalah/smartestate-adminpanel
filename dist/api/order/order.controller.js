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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const user_1 = require("../user");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const swagger_1 = require("@nestjs/swagger");
const eventemitter2_1 = require("eventemitter2");
const config_1 = require("@nestjs/config");
const moment = require("moment");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
let OrderController = class OrderController {
    constructor(userService, orderService, eventEmitter, configService) {
        this.userService = userService;
        this.orderService = orderService;
        this.eventEmitter = eventEmitter;
        this.configService = configService;
    }
    async create(createOrderDto, authUser) {
        var _a;
        console.log(createOrderDto);
        const validator = this.eventEmitter.emit(utils_1.Event.USER_BEFORE_REGISTER, { createOrderDto });
        let { product_id, plan, school_name, address, about, country, state, town, poster_code, email, mobile, phone, document, fax, website, app_url, contact_person, status } = createOrderDto;
        const existingProduct = (_a = await this.orderService.orderRepository.findOne({
            select: ['id', 'serial_number', 'school_name'],
            where: [{ school_name: school_name }],
        })) !== null && _a !== void 0 ? _a : null;
        if ((existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.school_name) === school_name) {
            return utils_1.error('Registration', 'Looks like you already have this school registered. school already exist');
        }
        const serial_numberExist = async (referral_code) => {
            const order = await this.orderService.orderRepository.findOne(school_name);
            return !!(order === null || order === void 0 ? void 0 : order.serial_number);
        };
        console.log(serial_numberExist);
        let productSerialNumber = utils_1.random(16);
        while ((await serial_numberExist(productSerialNumber)) === true) {
            productSerialNumber = utils_1.random(12);
        }
        console.log(productSerialNumber);
        const newOrder = await this.orderService.create({
            product_id, serial_number: productSerialNumber, plan, school_name, address, about, country, state, town, poster_code,
            email, mobile, phone, document: 'document.pdf', fax, website, app_url, contact_person, status,
            created_by: authUser.id,
            created_at: todatsDate,
            updated_at: now
        });
        return utils_1.success({
            product_name: newOrder.school_name,
            serial_number: newOrder.serial_number,
            product_id,
            about,
            status
        }, 'Order', 'Product successfully ordered');
    }
    async findAll() {
        return this.orderService.findAll();
    }
    async findOne(id) {
        const product = await this.orderService.findOne(id);
        return utils_1.success(product ? Object.assign({}, product) : null, 'product', 'product details');
    }
    async update(id, order, authUser) {
        let { product_id, plan, serial_number, school_name, address, about, country, state, town, poster_code, email, mobile, phone, document, fax, website, app_url, contact_person, status, } = order;
        const serial_numberExist = async (referral_code) => {
            const order = await this.orderService.orderRepository.findOne(school_name);
            return !!(order === null || order === void 0 ? void 0 : order.serial_number);
        };
        console.log(serial_numberExist);
        let productSerialNumber = utils_1.random(16);
        while ((await serial_numberExist(productSerialNumber)) === true) {
            productSerialNumber = utils_1.random(12);
        }
        console.log(productSerialNumber);
        const result = await this.orderService.update(id, {
            product_id, plan, serial_number: productSerialNumber, school_name, address, about, country, state, town, poster_code,
            email, mobile, phone, document, fax, website, app_url, contact_person, status,
            updated_by: authUser.id,
            updated_at: now
        });
        return utils_1.success({
            id,
            result
        }, 'product', 'product details updated');
    }
    async remove(id) {
        const product = await this.userService.remove(id);
        return utils_1.success({
            id,
            product
        }, 'product', 'Product deleted');
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, user_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto, user_1.User]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "remove", null);
OrderController = __decorate([
    common_1.Controller('order'),
    __param(0, common_1.Inject(common_1.forwardRef(() => order_service_1.OrderService))),
    __metadata("design:paramtypes", [user_1.UserService,
        order_service_1.OrderService,
        eventemitter2_1.EventEmitter2,
        config_1.ConfigService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map