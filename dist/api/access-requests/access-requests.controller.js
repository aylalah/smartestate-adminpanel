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
exports.AccessRequestsController = void 0;
const common_1 = require("@nestjs/common");
const access_requests_service_1 = require("./access-requests.service");
const create_access_request_dto_1 = require("./dto/create-access-request.dto");
const update_access_request_dto_1 = require("./dto/update-access-request.dto");
let AccessRequestsController = class AccessRequestsController {
    constructor(accessRequestsService) {
        this.accessRequestsService = accessRequestsService;
    }
    create(createAccessRequestDto) {
        return this.accessRequestsService.create(createAccessRequestDto);
    }
    findAll() {
        return this.accessRequestsService.findAll();
    }
    findOne(id) {
        return this.accessRequestsService.findOne(+id);
    }
    update(id, updateAccessRequestDto) {
        return this.accessRequestsService.update(+id, updateAccessRequestDto);
    }
    remove(id) {
        return this.accessRequestsService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_access_request_dto_1.CreateAccessRequestDto]),
    __metadata("design:returntype", void 0)
], AccessRequestsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccessRequestsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccessRequestsController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_access_request_dto_1.UpdateAccessRequestDto]),
    __metadata("design:returntype", void 0)
], AccessRequestsController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccessRequestsController.prototype, "remove", null);
AccessRequestsController = __decorate([
    common_1.Controller('access-requests'),
    __metadata("design:paramtypes", [access_requests_service_1.AccessRequestsService])
], AccessRequestsController);
exports.AccessRequestsController = AccessRequestsController;
//# sourceMappingURL=access-requests.controller.js.map