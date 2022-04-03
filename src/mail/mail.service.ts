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
var client = new postmark.ServerClient("7e489602-f17a-42db-a0b8-241bb8329b52");


@Injectable()
export class MailService {

    appUrl = this.configService.get('APP_URL');
    webUrl = this.configService.get('WEB_URL');
    constructor(
        // private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
        ) {}


    

    async welcomeUser(data) {

    // console.log(data)

    //     const request = mailjet
    //     .post("send", {'version': 'v3.1'})
    //     .request({
    //     "Messages":[
    //         {
    //         "From": {
    //             "Email": "admin@5starcompany.com.ng",
    //             "Name": "NIBSS ONBOARDING"
    //         },
    //         "To": [
    //             {
    //                 "Email": data.email,
    //                 "Name": `${data.first_name} ${data.last_name}`
    //             }
    //         ],
    //         "cc": [
    //             {
    //                 "Email": "ayoadelala@yahoo.com",
    //                 "Name": "Engineering"
    //             },
    //             {
    //                 "Email": "odejinmisamuel@gmail.com",
    //                 "Name": "System Admin"
    //             }
    //         ],
    //         "Subject": `Welcome to NIBSS, [[data:firstname: ${data.first_name}]]`,
    //         "TemplateID": 3754506,
    //         "TemplateLanguage": true,
    //         "CustomID": "AppGettingStartedTest",
    //         "Variables": {
    //             "confirmation_link": `${this.appUrl}/admin/user/${data.id}/confirm-email`,
    //             "email": data.email,
    //             "password": data.password,
    //             "firstname": data.first_name,
    //             "lastname": data.last_name,
    //             "role": data.role,
    //             "user_code": data.user_code
    //         }

    //         }
    //     ]
    //     })
    //     request
    //     .then((result) => {
    //         console.log(result.body)
    //         return result.body;
    //     })
    //     .catch((err) => {
    //         console.log(err.statusCode)
    //         return err.statusCode;
    //     })

    //     console.log(request);

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

    // async forgotPassword(data) {
    
    // console.log(data)

    //     const request = mailjet
    //     .post("send", {'version': 'v3.1'})
    //     .request({
    //     "Messages":[
    //         {
    //             "From": {
    //                 "Email": "admin@5starcompany.com.ng",
    //                 "Name": "NIBSS"
    //               },
    //               "To": [
    //                 {
    //                     "Email": data.email,
    //                     "Name": `${data.first_name} ${data.last_name}`
    //                 }
    //             ],
    //             "cc": [
    //                 {
    //                     "Email": "ayoadelala@yahoo.com",
    //                     "Name": "Engineering"
    //                 },
    //                 {
    //                     "Email": "odejinmisamuel@gmail.com",
    //                     "Name": "System Admin"
    //                 }
    //             ],
    //         "Subject": "NIBSS: RESET PASSWORD",
    //         "TemplateID": 3754756,
    //         "TemplateLanguage": true,
    //         "CustomID": "AppGettingStartedTest",
    //         "Variables": {
    //             "firstname": data.first_name,
    //             "lastname": data.last_name,
    //             "reset_link": `${this.webUrl}/auth/reset-password/${data.id}/${data.token}`
    //             }
    //         }
    //     ]
    //     })
    //     request
    //     .then((result) => {
    //         console.log(result.body)
    //         return result.body;
    //     })
    //     .catch((err) => {
    //         console.log(err.statusCode)
    //         return err.statusCode;
    //     })

    //     console.log(request);
    // }

    // async welcomeInstitution(data) {
        
    //     console.log(data)
    
    //         const request = mailjet
    //         .post("send", {'version': 'v3.1'})
    //         .request({
    //         "Messages":[
    //             {
    //             "From": {
    //                 "Email": "alala@aellacredit.com",
    //                 "Name": "NIBSS INSTITUTION ONBOARD"
    //             },
    //             "To": [
    //                 {
    //                     "Email": data.email,
    //                     "Name": `${data.first_name} ${data.last_name}`
    //                 }
    //             ],
    //             "cc": [
    //                 {
    //                     "Email": "ayoadelala@yahoo.com",
    //                     "Name": "Engineering"
    //                 },
    //                 {
    //                     "Email": "odejinmisamuel@gmail.com",
    //                     "Name": "System Admin"
    //                 }
    //             ],
    //             "Subject": "Greetings from NIBSS.",
    //             "TemplateID": 3754974,
    //             "TemplateLanguage": true,
    //             "CustomID": "AppGettingStartedTest",
    //             "Variables": {
    //                 "email": data.email,
    //                 "code": data.institution_code,
    //                 "name": data.institution_name,
    //             }
    //             }
    //         ]
    //         })
    //         request
    //         .then((result) => {
    //             console.log(result.body)
    //             return result.body;
    //         })
    //         .catch((err) => {
    //             console.log(err.statusCode)
    //             return err.statusCode;
    //         })
    
    //         console.log(request);
    // }

    // async agentOtp(data) {
        
    //     console.log(data)
    
    //         const request = mailjet
    //         .post("send", {'version': 'v3.1'})
    //         .request({
    //         "Messages":[
    //             {
    //                 "From": {
    //                     "Email": "admin@5starcompany.com.ng",
    //                     "Name": "Nibss Agent OTP"
    //                   },
    //             "To": [
    //                 {
    //                     "Email": data.email,
    //                     "Name": `${data.first_name} ${data.last_name}`
    //                 }
    //             ],
    //             "cc": [
    //                 {
    //                     "Email": "ayoadelala@yahoo.com",
    //                     "Name": "Engineering"
    //                 },
    //                 {
    //                     "Email": "odejinmisamuel@gmail.com",
    //                     "Name": "System Admin"
    //                 }
    //             ],
    //             "Subject": "NIBSS AGENT OTP",
    //             "TemplateID": 3833579,
    //             "TemplateLanguage": true,
    //             "CustomID": "AppGettingStartedTest",
    //             "Variables": {
    //                 "firstname": data.first_name,
    //                 "otp": data.otp,
    //             }
    //             }
    //         ]
    //         })
    //         request
    //         .then((result) => {
    //             console.log(result.body)
    //             return result.body;
    //         })
    //         .catch((err) => {
    //             console.log(err.statusCode)
    //             return err.statusCode;
    //         })
    
    //         console.log(request);
    // }

    // async newPassword(data) {
        
    //     console.log(data)
    
    //         const request = mailjet
    //         .post("send", {'version': 'v3.1'})
    //         .request({
    //         "Messages":[
    //             {
    //                 "From": {
    //                     "Email": "admin@5starcompany.com.ng",
    //                     "Name": "Nibss: New Password"
    //                   },
    //             "To": [
    //                 {
    //                     "Email": data.email,
    //                     "Name": `${data.first_name} ${data.last_name}`
    //                 }
    //             ],
    //             "cc": [
    //                 {
    //                     "Email": "ayoadelala@yahoo.com",
    //                     "Name": "Engineering"
    //                 },
    //                 {
    //                     "Email": "odejinmisamuel@gmail.com",
    //                     "Name": "System Admin"
    //                 }
    //             ],
    //             "Subject": "New Password",
    //             "TemplateID": 3835861,
    //             "TemplateLanguage": true,
    //             "CustomID": "AppGettingStartedTest",
    //             "Variables": {
    //                 "firstname": data.first_name,
    //             }
    //             }
    //         ]
    //         })
    //         request
    //         .then((result) => {
    //             console.log(result.body)
    //             return result.body;
    //         })
    //         .catch((err) => {
    //             console.log(err.statusCode)
    //             return err.statusCode;
    //         })
    
    //         console.log(request);
    //     }

}
