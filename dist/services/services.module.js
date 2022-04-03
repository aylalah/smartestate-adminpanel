"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const i18n_redis_resolver_service_1 = require("./i18n-redis-resolver/i18n-redis-resolver.service");
const io_redis_1 = require("../io-redis");
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    common_1.Module({
        controllers: [],
        providers: [
            i18n_redis_resolver_service_1.I18nRedisResolverService,
        ],
        imports: [common_1.HttpModule, event_emitter_1.EventEmitterModule, io_redis_1.IoRedisModule],
        exports: [
            event_emitter_1.EventEmitterModule,
            i18n_redis_resolver_service_1.I18nRedisResolverService,
            common_1.HttpModule,
        ],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=services.module.js.map