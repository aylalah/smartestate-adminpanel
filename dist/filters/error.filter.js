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
exports.ErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const config_1 = require("@nestjs/config");
const utils_1 = require("../utils");
const http_1 = require("http");
let ErrorFilter = class ErrorFilter {
    constructor(eventEmitter, configService) {
        this.eventEmitter = eventEmitter;
        this.configService = configService;
    }
    catch(exception, host) {
        var _a, _b, _c, _d, _e;
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const req = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        this.eventEmitter.emit(utils_1.Event.LOG_ERROR, {
            error: {
                exception,
                status,
                serviceName: this.configService.get('SERVICE_NAME'),
                serviceBaseUrl: this.configService.get('SERVICE_URL'),
                serviceSlugs: req.url,
            },
        });
        let title = 'Something went wrong';
        let message;
        let data;
        let exceptionResource;
        switch (status) {
            case 400:
                exceptionResource = exception.getResponse();
                title = (exceptionResource === null || exceptionResource === void 0 ? void 0 : exceptionResource.title) ? exceptionResource.title : 'Request Validation';
                message =
                    typeof (exceptionResource === null || exceptionResource === void 0 ? void 0 : exceptionResource.message) === 'string'
                        ? `${exceptionResource.message}. Check your input and try again.`
                        : `${utils_1.ucfirst(utils_1.prettify((_a = exceptionResource.message[0]) !== null && _a !== void 0 ? _a : ''))}. Check your input and try again.`;
                data = (exceptionResource === null || exceptionResource === void 0 ? void 0 : exceptionResource.data) ? exceptionResource.data : exceptionResource === null || exceptionResource === void 0 ? void 0 : exceptionResource.message;
                break;
            case 401:
                message = exception.message;
                break;
            case 403:
                message = utils_1.Message.FORBIDDEN;
                break;
            case 404:
                title = 'Not found';
                message = 'Check the request and try again.';
                break;
            case 429:
                title = 'Too many requests';
                message = (_c = (_b = exception) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : "You've had your fair share of requests. Try again in a minute.";
                break;
            case 413:
                title = 'Request too large';
                message = "You tried uploading a file or data that's larger than what we expect";
            case 500:
            default:
                message = (_e = (_d = exception) === null || _d === void 0 ? void 0 : _d.message) !== null && _e !== void 0 ? _e : utils_1.Message.FINAL_ERROR;
                break;
        }
        if (res instanceof http_1.ServerResponse) {
            res.writeHead(status);
            res.write(JSON.stringify(utils_1.response('error', title, message)));
            res.end();
        }
        else {
            res.status(status).send(utils_1.response('error', title, message));
        }
    }
};
ErrorFilter = __decorate([
    common_1.Catch(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        config_1.ConfigService])
], ErrorFilter);
exports.ErrorFilter = ErrorFilter;
//# sourceMappingURL=error.filter.js.map