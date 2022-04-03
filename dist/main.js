"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./tracer");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const fastify_helmet_1 = require("fastify-helmet");
const app_module_1 = require("./app.module");
const fastify_compress_1 = require("fastify-compress");
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const fastify_multipart_1 = require("fastify-multipart");
const Sentry = require("@sentry/node");
const config_1 = require("@nestjs/config");
Sentry.init({
    dsn: process.env.SENTRY_DNS,
    tracesSampleRate: 0.0,
    maxBreadcrumbs: 50,
    debug: true,
    sampleRate: 1.0,
    attachStacktrace: true,
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter(), {
        logger: process.env.NODE_ENV === 'production' ? ['error'] : ['log', 'error', 'warn', 'debug', 'verbose']
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        disableErrorMessages: false,
        whitelist: true,
        transform: true,
    }));
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    await app.register(fastify_helmet_1.default, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [
                    `'self'`,
                    `'unsafe-inline'`,
                    'cdn.jsdelivr.net',
                    'fonts.googleapis.com',
                ],
                fontSrc: [`'self'`, 'fonts.gstatic.com'],
                imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
            },
        },
    });
    app.register(fastify_compress_1.default, { encodings: ['gzip', 'deflate'] });
    app.register(fastify_multipart_1.default, {
        throwFileSizeLimit: true,
        limits: {
            fileSize: 25 * 1000 * 1000,
        },
    });
    app.setGlobalPrefix('/api/v1');
    const document = swagger_1.SwaggerModule.createDocument(app, new swagger_1.DocumentBuilder()
        .setTitle('SMART ESTATE ADMIN PORTAL')
        .setDescription('API Documentation for Smart Estate Admin Portal Endpoints')
        .setVersion('1.0')
        .setBasePath(process.env.BASE_PATH)
        .addBearerAuth()
        .build(), {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
    });
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'SMART-ESTATE ADMIN PORTAL API DOCS',
    });
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('PORT', 3005), '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map