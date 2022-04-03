"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nRedisResolverService = void 0;
const common_1 = require("@nestjs/common");
let I18nRedisResolverService = class I18nRedisResolverService {
    async resolve(context) {
        return 'en';
    }
};
I18nRedisResolverService = __decorate([
    common_1.Injectable()
], I18nRedisResolverService);
exports.I18nRedisResolverService = I18nRedisResolverService;
//# sourceMappingURL=i18n-redis-resolver.service.js.map