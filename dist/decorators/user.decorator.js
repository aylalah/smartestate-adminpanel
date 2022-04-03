"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = common_1.createParamDecorator((data, ctx) => {
    var _a, _b;
    const req = ctx.switchToHttp().getRequest();
    return (_a = req === null || req === void 0 ? void 0 : req.user) !== null && _a !== void 0 ? _a : (_b = req === null || req === void 0 ? void 0 : req.raw) === null || _b === void 0 ? void 0 : _b.user;
});
//# sourceMappingURL=user.decorator.js.map