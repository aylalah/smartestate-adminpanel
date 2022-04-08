import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from "moment";
// Send an email:
const fs = require("fs");
const path = require("path");
const downloadPath = path.resolve('./download');
const handlebars = require("handlebars");
const today: any = moment().format("YYYY-MM-DD_HH:mm:ss");
import { ConfigService } from "@nestjs/config";

// const mailjet = require ('node-mailjet')
// .connect('5e4c6a900c8fa6b436bd02b4dc312928', 'e06961412e2d2df60d998768e12acf9b')
// .connect('04212573e56b5bc3ce53a2ea7d7c42df', '99855f2749fa31264885819364aae031')

// Require:
const postmark = require("postmark");
// Send an email:
const client = new postmark.ServerClient("7e489602-f17a-42db-a0b8-241bb8329b52");


@Injectable()
export class MailService {

    appUrl = this.configService.get('APP_URL');
    webUrl = this.configService.get('WEB_URL');
    constructor(
        // private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        ) {}
    

    async welcomeUser(data) {

        console.log(data)

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
    
        console.log(data)

    }

    async welcomeInstitutionUser(data) {
        console.log(data)

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
        
        console.log(data)
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
        
        console.log(data)
    
    }

    async newPassword(data) {
        
        console.log(data)
    
        }

}
