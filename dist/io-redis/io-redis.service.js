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
exports.IoRedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Redis = require("ioredis");
let IoRedisService = class IoRedisService {
    constructor(configService) {
        this.configService = configService;
        this.connection = new Redis({
            port: this.configService.get('REDIS_PORT'),
            host: this.configService.get('REDIS_HOST'),
            family: 4,
            password: this.configService.get('REDIS_PASS'),
            db: this.configService.get('REDIS_DB'),
        });
    }
    set(key, value, expiryMode, time, setMode) {
        return this.connection.set(key, value, expiryMode, time, setMode);
    }
    get(key) {
        return this.connection.get(key);
    }
};
IoRedisService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], IoRedisService);
exports.IoRedisService = IoRedisService;
//# sourceMappingURL=io-redis.service.js.map