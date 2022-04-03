"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRequestsService = void 0;
const common_1 = require("@nestjs/common");
let AccessRequestsService = class AccessRequestsService {
    create(createAccessRequestDto) {
        return 'This action adds a new accessRequest';
    }
    findAll() {
        return `This action returns all accessRequests`;
    }
    findOne(id) {
        return `This action returns a #${id} accessRequest`;
    }
    update(id, updateAccessRequestDto) {
        return `This action updates a #${id} accessRequest`;
    }
    remove(id) {
        return `This action removes a #${id} accessRequest`;
    }
};
AccessRequestsService = __decorate([
    common_1.Injectable()
], AccessRequestsService);
exports.AccessRequestsService = AccessRequestsService;
//# sourceMappingURL=access-requests.service.js.map