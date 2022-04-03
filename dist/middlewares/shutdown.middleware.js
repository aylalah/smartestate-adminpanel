"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShutdownMiddleware = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
let ShutdownMiddleware = class ShutdownMiddleware {
    constructor() {
        this.headers = {
            'content-type': 'application/json',
            'access-control-allow-origin': '*',
            'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            'access-control-allow-headers': '*',
        };
    }
    use(req, res, next) {
        return this.serverResponse(res, common_1.HttpStatus.BAD_REQUEST, 'error', 'Service Information', 'This service is temporary down. We would be back soon');
    }
    serverResponse(res, httpStatus, status, title, message, data, meta) {
        res === null || res === void 0 ? void 0 : res.writeHead(httpStatus, this.headers);
        res === null || res === void 0 ? void 0 : res.write(JSON.stringify(utils_1.response(status, title, message, null, data, meta)));
        res === null || res === void 0 ? void 0 : res.end();
    }
};
ShutdownMiddleware = __decorate([
    common_1.Injectable()
], ShutdownMiddleware);
exports.ShutdownMiddleware = ShutdownMiddleware;
//# sourceMappingURL=shutdown.middleware.js.map