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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const user_1 = require("../user");
const swagger_1 = require("@nestjs/swagger");
const eventemitter2_1 = require("eventemitter2");
const config_1 = require("@nestjs/config");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
let ProductController = class ProductController {
    constructor(userService, productService, eventEmitter, configService) {
        this.userService = userService;
        this.productService = productService;
        this.eventEmitter = eventEmitter;
        this.configService = configService;
    }
    async create(createProductDto, authUser) {
        var _a;
        console.log(createProductDto);
        const validator = this.eventEmitter.emit(utils_1.Event.USER_BEFORE_REGISTER, { createProductDto });
        let { product_name, product_type, description, image, status } = createProductDto;
        const existingProduct = (_a = await this.productService.productRepository.findOne({
            select: ['id', 'product_name'],
            where: [{ product_name: product_name }],
        })) !== null && _a !== void 0 ? _a : null;
        if ((existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.product_name) === product_name) {
            return utils_1.error('Registration', 'Looks like you already have this product. Product already exist');
        }
        let fileName = '';
        if (image == 'product.jpg') {
            fileName = 'product.jpg';
        }
        else {
            fileName = product_name + '_' + product_type + '.png';
            const base64Data = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (base64Data.length !== 3) {
                return new Error('Invalid input string');
            }
            const fileContents = Buffer.from(base64Data[2], 'base64');
            const imag = fs.writeFile(`public/images/${fileName}`, fileContents, 'base64', (err) => {
                if (err)
                    return console.error(err);
                console.log('file saved to ', `public/images/${fileName}`);
            });
        }
        const newProduct = await this.productService.create({
            product_name,
            product_type,
            description,
            image: fileName,
            status: 1,
            created_by: authUser.id,
            created_at: todatsDate,
            updated_at: now
        });
        return utils_1.success({
            product: {
                product_name: newProduct.product_name,
                product_type: newProduct.product_type,
                description: newProduct.description,
                image: newProduct.image,
                status
            },
            products: await this.productService.findAll(),
        }, 'User Registration', 'User successfully registered');
    }
    async findAll() {
        return this.productService.findAll();
    }
    async findOne(id) {
        const product = await this.productService.findOne(id);
        return utils_1.success(product ? Object.assign({}, product) : null, 'product', 'product details');
    }
    async update(id, product, authUser) {
        let { product_name, product_type, description, image } = product;
        let fileName = '';
        if (image == '') {
            const prod = await this.productService.findOne(id);
            fileName = prod.image;
        }
        else {
            fileName = product_name + '_' + product_type + '.png';
            const base64Data = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if (base64Data.length !== 3) {
                return new Error('Invalid input string');
            }
            const fileContents = Buffer.from(base64Data[2], 'base64');
            const imag = fs.writeFile(`public/images/${fileName}`, fileContents, 'base64', (err) => {
                if (err)
                    return console.error(err);
                console.log('file saved to ', `public/images/${fileName}`);
            });
        }
        const result = await this.productService.update(id, { product_name,
            product_type,
            description,
            image: fileName,
            updated_by: authUser.id,
            updated_at: now
        });
        return utils_1.success({
            id,
            product: await this.productService.findOne(id)
        }, 'product', 'product details updated');
    }
    async suspend(id, authUser, body) {
        const { status } = body;
        let statusDesc = '';
        if (status == 0) {
            statusDesc = 'Inactive';
        }
        if (status == 1) {
            statusDesc = 'Pending';
        }
        if (status == 2) {
            statusDesc = 'Active';
        }
        const existingProduct = await this.productService.findOne(id);
        if (existingProduct.status == status) {
            return utils_1.error('Product Status', `'This Product already ${statusDesc}.'`);
        }
        await this.productService.update(id, {
            status: status,
            updated_at: new Date(),
        });
        return utils_1.success({
            id,
            product: await this.productService.findOne(id)
        }, 'product', 'product activated successfully');
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
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, user_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, user_1.User]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    common_1.Patch(':id/activation'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_product_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "suspend", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
ProductController = __decorate([
    common_1.Controller('product'),
    __param(0, common_1.Inject(common_1.forwardRef(() => product_service_1.ProductService))),
    __metadata("design:paramtypes", [user_1.UserService,
        product_service_1.ProductService,
        eventemitter2_1.EventEmitter2,
        config_1.ConfigService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map