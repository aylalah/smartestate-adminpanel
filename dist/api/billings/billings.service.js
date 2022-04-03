"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingsService = void 0;
const common_1 = require("@nestjs/common");
let BillingsService = class BillingsService {
    create(createBillingDto) {
        return 'This action adds a new billing';
    }
    findAll() {
        return `This action returns all billings`;
    }
    findOne(id) {
        return `This action returns a #${id} billing`;
    }
    update(id, updateBillingDto) {
        return `This action updates a #${id} billing`;
    }
    remove(id) {
        return `This action removes a #${id} billing`;
    }
};
BillingsService = __decorate([
    common_1.Injectable()
], BillingsService);
exports.BillingsService = BillingsService;
//# sourceMappingURL=billings.service.js.map