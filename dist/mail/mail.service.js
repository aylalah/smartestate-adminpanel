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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const downloadPath = path.resolve('./download');
const handlebars = require("handlebars");
const today = moment().format("YYYY-MM-DD_HH:mm:ss");
const config_1 = require("@nestjs/config");
const postmark = require("postmark");
var client = new postmark.ServerClient("7e489602-f17a-42db-a0b8-241bb8329b52");
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.appUrl = this.configService.get('APP_URL');
        this.webUrl = this.configService.get('WEB_URL');
    }
    async welcomeUser(data) {
        client.sendEmailWithTemplate({
            "From": "kleem78@yahoo.com",
            "To": data.email,
            "TemplateAlias": "user-invitation",
            "TemplateModel": {
                "product_url": `${this.webUrl}`,
                "product_name": "Smart Estate",
                "name": `${data.first_name} ${data.last_name}`,
                "invite_sender_name": "Smart Estate: Admin",
                "invite_sender_organization_name": "invite_sender_organization_name_Value",
                "action_url": `${this.appUrl}/admin/user/${data.id}/confirm-email`,
                "support_email": `${this.appUrl}/admin/user/${data.id}/support-email`,
                "help_url": "help_url_Value",
                "company_name": "Balosh",
                "company_address": "Lagos",
                "live_chat_url": "live_chat_url_Value"
            }
        });
    }
};
MailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map