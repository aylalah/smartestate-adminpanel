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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions.service");
const create_permission_dto_1 = require("./dto/create-permission.dto");
const update_permission_dto_1 = require("./dto/update-permission.dto");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const user_1 = require("../user");
const swagger_1 = require("@nestjs/swagger");
const eventemitter2_1 = require("eventemitter2");
const PermissionMock = require("../../rolesdata/permissions.json");
const word = PermissionMock;
const moment = require("moment");
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
let PermissionsController = class PermissionsController {
    constructor(userService, permissionsService, eventEmitter) {
        this.userService = userService;
        this.permissionsService = permissionsService;
        this.eventEmitter = eventEmitter;
    }
    async autoCreate(authUser) {
        console.log(word);
        const newPermission = await this.permissionsService.create(word);
        return utils_1.success({
            roles: await this.permissionsService.findAll(),
        }, 'Permission Imported', 'Permission successfuly created');
    }
    async create(createPermissionDto, authUser) {
        var _a;
        let { role_id, permission_name, description, module_access, } = createPermissionDto;
        const slug = permission_name.replace(' ', '_');
        const existingPermission = (_a = await this.permissionsService.permissionRepository.findOne({
            select: ['id', 'permission_name', 'slug', 'status'],
            where: [{ permission_name: permission_name }],
        })) !== null && _a !== void 0 ? _a : null;
        if ((existingPermission === null || existingPermission === void 0 ? void 0 : existingPermission.permission_name) === permission_name) {
            return utils_1.error('New role permission exist', 'Looks like you already have this role permission. permission already exist');
        }
        const newPermission = await this.permissionsService.create({
            role_id,
            permission_name,
            description,
            module_access,
            slug,
            status: 0,
            created_by: authUser.id,
            created_at: todatsDate,
            updated_at: now
        });
        const permissionRes = await this.permissionsService.findOne(newPermission.id);
        return utils_1.success({
            permission: permissionRes,
            permissions: await this.permissionsService.findAll(),
        }, 'New Permission', 'Permission successfuly created');
    }
    async findAll() {
        return utils_1.success(await this.permissionsService.findAll(), 'Permissions', 'Permissions list');
    }
    async findOne(id) {
        const permission = await this.permissionsService.findOne(id);
        return utils_1.success(permission ? Object.assign({}, permission) : null, 'Permission', 'Permission details');
    }
    async findByRoleId(id) {
        var _a;
        const permissions = (_a = await this.permissionsService.permissionRepository.find({
            select: ['id', 'permission_name', 'slug', 'status'],
            where: [{ role_id: id }],
        })) !== null && _a !== void 0 ? _a : null;
        return utils_1.success(permissions ? permissions : null, 'Permission', 'Permission details');
    }
    async update(id, permission, authUser) {
        let { role_id, permission_name, description, module_access, } = permission;
        const slug = permission_name.replace(' ', '_');
        const result = await this.permissionsService.update(id, {
            role_id,
            permission_name,
            description,
            module_access,
            slug,
            updated_by: authUser.id,
            updated_at: now
        });
        const permissionRes = await this.permissionsService.findOne(id);
        return utils_1.success({
            permission: permissionRes,
            permissions: await this.permissionsService.findAll(),
        }, 'Permission', 'Permission details updated');
    }
    async suspend(id, authUser) {
        const existingPermission = await this.permissionsService.findOne(id);
        if (existingPermission.status >= 1) {
            return utils_1.error('Permission Status', `'This Permission is already active.'`);
        }
        await this.permissionsService.update(id, {
            status: 1,
            updated_by: authUser.id,
            updated_at: new Date(),
        });
        const permissionRes = await this.permissionsService.findOne(id);
        return utils_1.success({
            permission: permissionRes,
            permissions: await this.permissionsService.findAll(),
        }, 'Permission', 'Permission activated successfully');
    }
    async onDeactivate(id, authUser) {
        const existingPermission = await this.permissionsService.findOne(id);
        if (existingPermission.status == 0) {
            return utils_1.error('Permission Status', `'This Permission is already de-active.'`);
        }
        await this.permissionsService.update(id, {
            status: 0,
            updated_by: authUser.id,
            updated_at: new Date(),
        });
        const permissionRes = await this.permissionsService.findOne(id);
        return utils_1.success({
            permission: permissionRes,
            permissions: await this.permissionsService.findAll(),
        }, 'Permission', 'Permission de-activated successfully');
    }
    async remove(id) {
        const role = await this.permissionsService.remove(id);
        return utils_1.success({
            id,
            role
        }, 'Permission', 'Permission deleted');
    }
};
__decorate([
    common_1.Post('seed_permission'),
    __param(0, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "autoCreate", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto, user_1.User]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findOne", null);
__decorate([
    common_1.Get('role_id/:id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "findByRoleId", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permission_dto_1.UpdatePermissionDto, user_1.User]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "update", null);
__decorate([
    common_1.Get(':id/activation'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "suspend", null);
__decorate([
    common_1.Get(':id/close'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "onDeactivate", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionsController.prototype, "remove", null);
PermissionsController = __decorate([
    common_1.Controller('permissions'),
    __param(0, common_1.Inject(common_1.forwardRef(() => permissions_service_1.PermissionsService))),
    __metadata("design:paramtypes", [user_1.UserService,
        permissions_service_1.PermissionsService,
        eventemitter2_1.EventEmitter2])
], PermissionsController);
exports.PermissionsController = PermissionsController;
//# sourceMappingURL=permissions.controller.js.map