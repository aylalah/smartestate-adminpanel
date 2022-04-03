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
exports.LogRequestMiddleware = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const utils_1 = require("../utils");
let LogRequestMiddleware = class LogRequestMiddleware {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    use(req, res, next) {
        this.eventEmitter.emit(utils_1.Event.LOG_REQUEST, { request: req });
        next();
    }
};
LogRequestMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], LogRequestMiddleware);
exports.LogRequestMiddleware = LogRequestMiddleware;
//# sourceMappingURL=log-request.middleware.js.map