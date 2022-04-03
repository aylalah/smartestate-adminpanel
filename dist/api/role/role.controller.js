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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/jwt-strategy/jwt.guard");
const decorators_1 = require("../../decorators");
const utils_1 = require("../../utils");
const user_1 = require("../user");
const swagger_1 = require("@nestjs/swagger");
const eventemitter2_1 = require("eventemitter2");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
let now = moment().format();
let timeStamp = moment(new Date().getTime()).format("YYYY-MM-DD HH:mm:ss.SSS");
let todatsDate = moment(new Date().getTime()).format("YYYY-MM-DD");
const role_service_1 = require("./role.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const RolesMock = require("../../rolesdata/roles.csv.json");
const word = RolesMock;
let RoleController = class RoleController {
    constructor(userService, roleService, eventEmitter) {
        this.userService = userService;
        this.roleService = roleService;
        this.eventEmitter = eventEmitter;
    }
    async autoCreate(createRoleDto, authUser) {
        console.log(word);
        const newRole = await this.roleService.create(word);
        return utils_1.success({
            roles: await this.roleService.findAll(),
        }, 'Role Imported', 'Role successfuly created');
    }
    async create(createRoleDto, authUser) {
        var _a;
        console.log(createRoleDto);
        let { user_type, role_name, description, slug, } = createRoleDto;
        const existingRole = (_a = await this.roleService.roleRepository.findOne({
            select: ['id', 'role_name', 'slug'],
            where: [{ role_name: role_name }],
        })) !== null && _a !== void 0 ? _a : null;
        if ((existingRole === null || existingRole === void 0 ? void 0 : existingRole.role_name) === role_name) {
            return utils_1.error('New role exist', 'Looks like you already have this role. role already exist');
        }
        const newRole = await this.roleService.create({
            user_type,
            role_name,
            description,
            slug,
            status: 1,
            created_by: authUser.id,
            created_at: todatsDate,
            updated_at: now
        });
        return utils_1.success({
            role: {
                role_name: newRole.role_name,
                description: newRole.description,
                slug: newRole.slug,
                status
            },
            roles: await this.roleService.findAll(),
        }, 'New Role', 'Role successfuly created');
    }
    async findAll() {
        return utils_1.success(await this.roleService.findAll(), 'Roles', 'Role List');
    }
    async findRoleByUserType(type) {
        var _a;
        const roles = (_a = await this.roleService.roleRepository.find({
            select: ['id', 'user_type', 'role_name', 'slug'],
            where: [{ user_type: type }],
        })) !== null && _a !== void 0 ? _a : null;
        return utils_1.success(roles ? roles : null, 'Roles', 'Roles by user type');
    }
    async findOne(id) {
        const role = await this.roleService.findOne(id);
        return utils_1.success(role ? Object.assign({}, role) : null, 'Role', 'Role details');
    }
    async update(id, role, authUser) {
        let { user_type, role_name, description, slug } = role;
        const result = await this.roleService.update(id, {
            user_type,
            role_name,
            description,
            slug,
            updated_by: authUser.id,
            updated_at: now
        });
        return utils_1.success({
            id,
            product: await this.roleService.findOne(id)
        }, 'Role', 'Role details updated');
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
        const existingRole = await this.roleService.findOne(id);
        if (existingRole.status == status) {
            return utils_1.error('Role Status', `'This role already ${statusDesc}.'`);
        }
        await this.roleService.update(id, {
            status: status,
            updated_at: new Date(),
        });
        return utils_1.success({
            id,
            role: await this.roleService.findOne(id)
        }, 'Role', 'Role activated successfully');
    }
    async remove(id) {
        const role = await this.roleService.remove(id);
        return utils_1.success({
            id,
            role
        }, 'Role', 'Role deleted');
    }
};
__decorate([
    common_1.Post('seed_role'),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto, user_1.User]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "autoCreate", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto, user_1.User]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findAll", null);
__decorate([
    common_1.Get(':type/user-type'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findRoleByUserType", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto, user_1.User]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    common_1.Patch(':id/activation'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_role_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "suspend", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "remove", null);
RoleController = __decorate([
    common_1.Controller('role'),
    __param(0, common_1.Inject(common_1.forwardRef(() => role_service_1.RoleService))),
    __metadata("design:paramtypes", [user_1.UserService,
        role_service_1.RoleService,
        eventemitter2_1.EventEmitter2])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map