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
const client = new postmark.ServerClient("7e489602-f17a-42db-a0b8-241bb8329b52");
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.appUrl = this.configService.get('APP_URL');
        this.webUrl = this.configService.get('WEB_URL');
    }
    async welcomeUser(data) {
        console.log(data);
        client.sendEmailWithTemplate({
            "From": "balosh@smartestateapp.com",
            "To": data.email,
            "Cc": "kleem78@yahoo.com",
            "Bcc": "ayoadelala@yahoo.com",
            "Tag": "Invitation",
            "Headers": [
                {
                    "Name": "CUSTOM-HEADER",
                    "Value": "BALOSHSMART APP"
                }
            ],
            "TemplateId": 27535821,
            "TemplateAlias": "user-invitation",
            "TemplateModel": {
                "product_url": `${this.webUrl}`,
                "product_name": "BaloshSmart App",
                "name": `${data.first_name} ${data.last_name}`,
                "invite_sender_name": "Balosh Admin",
                "invite_sender_organization_name": "BALOSH ESTATE APP",
                "action_url": `${this.webUrl}/admin/user/${data.id}/confirm-email`,
                "web_confirmation_link": `${this.webUrl}/admin/user/${data.id}/confirm-email`,
                "app_confirmation_link": `${this.appUrl}/${data.id}/confirm-email`,
                "support_email": `${this.webUrl}/admin/user/${data.id}/support-email`,
                "help_url": `${this.webUrl}/admin/user/support-email`,
                "company_name": "BALOSH",
                "company_address": "Lagos",
                "live_chat_url": "live_chat_url_Value",
                "role": data.role,
                "email": data.email,
                "password": data.password,
            }
        });
    }
    async forgotPassword(data) {
        console.log(data);
    }
    async welcomeInstitutionUser(data) {
        console.log(data);
        client.sendEmailWithTemplate({
            "From": "balosh@smartestateapp.com",
            "To": data.email,
            "Cc": "kleem78@yahoo.com",
            "Bcc": "ayoadelala@yahoo.com",
            "Tag": "Welcome",
            "Headers": [
                {
                    "Name": "CUSTOM-HEADER",
                    "Value": "BALOSHSMART APP"
                }
            ],
            "TemplateId": 27588728,
            "TemplateAlias": "welcome",
            "TemplateModel": {
                "product_url": data.web_url,
                "product_name": "BaloshSmart App",
                "name": `${data.first_name} ${data.last_name}`,
                "estate_name": data.estate_name,
                "action_url": `${data.web_url}/admin/user/${data.id}/confirm-email`,
                "login_url": data.web_url,
                "email": data.email,
                "password": data.password,
                "role": data.role,
                "trial_length": "1 Year",
                "estate_code": data.estate_code,
                "home_address": data.home_address,
                "estate_id": data.estate_id,
                "web_url": data.web_url,
                "bank": data.bank,
                "account_name": data.account_name,
                "live_chat_url": "live_chat_url_Value",
                "sender_name": data.email,
                "support_email": `${this.webUrl}/admin/user/${data.id}/support-email`,
                "help_url": `${this.webUrl}/admin/user/support-email`,
                "company_name": data.email,
                "company_address": "company_address_Value",
                "username": `${data.first_name}_${data.last_name}`,
                "trial_start_date": "January",
                "trial_end_date": "December"
            }
        });
    }
    async newInstitution(data) {
        console.log(data);
        client.sendEmailWithTemplate({
            "From": "balosh@smartestateapp.com",
            "To": data.useremail,
            "Cc": "kleem78@yahoo.com",
            "Bcc": "ayoadelala@yahoo.com",
            "Tag": "Welcome",
            "Headers": [
                {
                    "Name": "CUSTOM-HEADER",
                    "Value": "BALOSHSMART APP"
                }
            ],
            "TemplateId": 27588739,
            "TemplateAlias": "welcome-1",
            "TemplateModel": {
                "product_url": data.web_url,
                "product_name": "BaloshSmart App",
                "name": `${data.name}`,
                "estate_name": data.estate_name,
                "estate_code": data.estate_code,
                "home_address": data.address,
                "estate_id": data.estate_id,
                "email": data.email,
                "password": data.password,
                "bank": data.bank,
                "account_name": data.account_name,
                "db_name": data.db_name,
                "web_url": data.web_url,
                "api_url": data.api_url,
                "api_token": data.api_token,
                "plan": data.plan,
                "support_email": `${this.webUrl}/admin/user/${data.id}/support-email`,
                "live_chat_url": "live_chat_url_Value",
                "sender_name": "Balosh Admin",
                "action_url": `${data.web_url}/admin/user/${data.id}/confirm-email`,
                "login_url": data.web_url,
                "help_url": `${this.webUrl}/admin/user/support-email`,
                "company_name": data.email,
                "company_address": "company_address_Value",
                "trial_start_date": "January",
                "trial_end_date": "December"
            }
        });
    }
    async agentOtp(data) {
        console.log(data);
    }
    async newPassword(data) {
        console.log(data);
    }
};
MailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map