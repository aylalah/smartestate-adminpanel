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
exports.BillingsController = void 0;
const common_1 = require("@nestjs/common");
const billings_service_1 = require("./billings.service");
const create_billing_dto_1 = require("./dto/create-billing.dto");
const update_billing_dto_1 = require("./dto/update-billing.dto");
let BillingsController = class BillingsController {
    constructor(billingsService) {
        this.billingsService = billingsService;
    }
    create(createBillingDto) {
        return this.billingsService.create(createBillingDto);
    }
    findAll() {
        return this.billingsService.findAll();
    }
    findOne(id) {
        return this.billingsService.findOne(+id);
    }
    update(id, updateBillingDto) {
        return this.billingsService.update(+id, updateBillingDto);
    }
    remove(id) {
        return this.billingsService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_billing_dto_1.CreateBillingDto]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_billing_dto_1.UpdateBillingDto]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "remove", null);
BillingsController = __decorate([
    common_1.Controller('billings'),
    __metadata("design:paramtypes", [billings_service_1.BillingsService])
], BillingsController);
exports.BillingsController = BillingsController;
//# sourceMappingURL=billings.controller.js.map