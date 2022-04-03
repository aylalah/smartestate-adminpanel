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
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const locations_service_1 = require("./locations.service");
const create_location_dto_1 = require("./dto/create-location.dto");
const update_location_dto_1 = require("./dto/update-location.dto");
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
const RolesMock = require("../../rolesdata/roles.csv.json");
const word = RolesMock;
let LocationsController = class LocationsController {
    constructor(locationsService, eventEmitter) {
        this.locationsService = locationsService;
        this.eventEmitter = eventEmitter;
    }
    async create(createLocationDto, authUser) {
        var _a;
        console.log(createLocationDto);
        let { location_name, address, state, slug, latitude, longitude, lga, geo_political_zone } = createLocationDto;
        slug: createLocationDto.location_name;
        const existingLocation = (_a = await this.locationsService.locationRepository.findOne({
            select: ['id', 'location_name', 'slug'],
            where: [{ location_name: location_name }],
        })) !== null && _a !== void 0 ? _a : null;
        if ((existingLocation === null || existingLocation === void 0 ? void 0 : existingLocation.location_name) === location_name) {
            return utils_1.error('New location exist', 'Looks like you already have this location. location already exist');
        }
        const newLocation = await this.locationsService.create({
            location_name,
            address,
            state,
            slug,
            latitude,
            longitude,
            lga,
            geo_political_zone,
            status: 1,
            created_by: authUser.id,
            created_at: todatsDate,
            updated_at: now
        });
        return utils_1.success({
            location: {
                location_name: newLocation.location_name,
                description: newLocation.address,
                slug: newLocation.slug,
            },
            locations: await this.locationsService.findAll(),
        }, 'New Location', 'Rocation successfuly created');
    }
    async findAll() {
        return this.locationsService.findAll();
    }
    async findOne(id) {
        const location = await this.locationsService.findOne(id);
        return utils_1.success(location ? Object.assign({}, location) : null, 'Location', 'Location details');
    }
    async update(id, location, authUser) {
        let { location_name, address, state, slug, latitude, longitude, lga, geo_political_zone } = location;
        const result = await this.locationsService.update(id, {
            location_name,
            address,
            state,
            slug,
            latitude,
            longitude,
            lga,
            geo_political_zone,
            status: 2,
            updated_by: authUser.id,
            updated_at: now
        });
        return utils_1.success({
            id,
            product: await this.locationsService.findOne(id)
        }, 'Location', 'Location details updated');
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
        const existingLocation = await this.locationsService.findOne(id);
        if (existingLocation.status == status) {
            return utils_1.error('Location Status', `'This location already ${statusDesc}.'`);
        }
        await this.locationsService.update(id, {
            status: status,
            updated_at: new Date(),
        });
        return utils_1.success({
            id,
            location: await this.locationsService.findOne(id)
        }, 'Location', 'Location activated successfully');
    }
    async remove(id) {
        const location = await this.locationsService.remove(id);
        return utils_1.success({
            id,
            location
        }, 'Location', 'Location deleted');
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Body()), __param(1, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto, user_1.User]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findOne", null);
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()), __param(2, decorators_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_location_dto_1.UpdateLocationDto, user_1.User]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "update", null);
__decorate([
    common_1.Patch(':id/activation'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')), __param(1, decorators_1.GetUser()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_1.User, update_location_dto_1.StatusDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "suspend", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(jwt_guard_1.JwtGuard),
    swagger_1.ApiBearerAuth(),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "remove", null);
LocationsController = __decorate([
    common_1.Controller('locations'),
    __param(0, common_1.Inject(common_1.forwardRef(() => locations_service_1.LocationsService))),
    __metadata("design:paramtypes", [locations_service_1.LocationsService,
        eventemitter2_1.EventEmitter2])
], LocationsController);
exports.LocationsController = LocationsController;
//# sourceMappingURL=locations.controller.js.map