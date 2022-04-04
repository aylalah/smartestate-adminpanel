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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const event_emitter_1 = require("@nestjs/event-emitter");
const terminus_1 = require("@nestjs/terminus");
const throttler_1 = require("@nestjs/throttler");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const health_module_1 = require("./health/health.module");
const user_module_1 = require("./api/user/user.module");
const auth_module_1 = require("./api/auth/auth.module");
const error_filter_1 = require("./filters/error.filter");
const log_response_interceptor_1 = require("./interceptors/log-response.interceptor");
const log_request_middleware_1 = require("./middlewares/log-request.middleware");
const common_util_1 = require("./utils/common.util");
const services_1 = require("./services");
const bull_1 = require("@nestjs/bull");
const queues_1 = require("./queues");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const nestjs_i18n_1 = require("nestjs-i18n");
const io_redis_module_1 = require("./io-redis/io-redis.module");
const path = require("path");
const select_language_middleware_1 = require("./middlewares/select-language.middleware");
const i18n_redis_resolver_service_1 = require("./services/i18n-redis-resolver/i18n-redis-resolver.service");
const env_validation_1 = require("./env.validation");
const middlewares_1 = require("./middlewares");
const role_module_1 = require("./api/role/role.module");
const institutions_module_1 = require("./api/estates/institutions.module");
const institution_users_module_1 = require("./api/estate-users/institution-users.module");
const billings_module_1 = require("./api/billings/billings.module");
const settings_module_1 = require("./api/settings/settings.module");
const permissions_module_1 = require("./api/permissions/permissions.module");
const analysis_dashboard_module_1 = require("./api/analysis-dashboard/analysis-dashboard.module");
let AppModule = AppModule_1 = class AppModule {
    constructor(moduleRef, configService) {
        this.moduleRef = moduleRef;
        this.configService = configService;
        common_util_1.setModuleRef(moduleRef);
    }
    configure(consumer) {
        const middlewares = [
            log_request_middleware_1.LogRequestMiddleware,
            select_language_middleware_1.SelectLanguageMiddleware,
            ...(this.configService.get('SHUTDOWN_SWITCH') === 'on' ? [middlewares_1.ShutdownMiddleware] : [])
        ];
        consumer
            .apply(...middlewares)
            .forRoutes('(.*)');
    }
    onApplicationBootstrap() {
    }
};
AppModule = AppModule_1 = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validate: env_validation_1.validate,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'public'),
                exclude: ['/api*'],
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        host: 'in-v3.mailjet.com',
                        port: 587,
                        secure: true
                    },
                    auth: {
                        user: "04212573e56b5bc3ce53a2ea7d7c42df",
                        pass: "99855f2749fa31264885819364aae031"
                    },
                    tls: {
                        rejectUnauthorized: false
                    },
                    defaults: {
                        from: '"Check School" <admin.checkschool@gmail.com>',
                    },
                    template: {
                        dir: process.cwd() + '/templates/welcome',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    }
                })
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    ttl: config.get('THROTTLE_TTL'),
                    limit: config.get('THROTTLE_LIMIT'),
                }),
            }),
            common_1.HttpModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    timeout: configService.get('HTTP_TIMEOUT'),
                    maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
                }),
                inject: [config_1.ConfigService],
            }),
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: false,
                delimiter: '.',
                newListener: false,
                removeListener: false,
                maxListeners: 10,
                verboseMemoryLeak: false,
                ignoreErrors: false,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    replication: {
                        master: {
                            host: configService.get('DB_HOST'),
                            port: +configService.get('DB_PORT'),
                            username: configService.get('DB_USER'),
                            password: configService.get('DB_PASS'),
                            database: configService.get('DB_NAME'),
                        },
                        slaves: [
                            {
                                host: configService.get('DB_HOST'),
                                port: +configService.get('DB_PORT'),
                                username: configService.get('DB_USER'),
                                password: configService.get('DB_PASS'),
                                database: configService.get('DB_NAME'),
                            }
                        ],
                        selector: 'RR',
                        canRetry: true,
                        removeNodeErrorCount: 5,
                        restoreNodeTimeout: 1000,
                    },
                    synchronize: configService.get('DB_SYNC'),
                    logging: configService.get('DB_LOG'),
                    entities:  [__dirname + '/../**/**.entity{.ts,.js}'],
                    cli: {
                        entitiesDir: 'src/api/**/*.entity.ts',
                    },
                    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
                    poolSize: 20,
                }),
                inject: [config_1.ConfigService],
            }),
            bull_1.BullModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    limiter: {
                        max: 100,
                        duration: 5 * 60 * 1000,
                        bounceBack: false,
                    },
                    redis: {
                        host: configService.get('REDIS_HOST'),
                        port: configService.get('REDIS_PORT'),
                        password: configService.get('REDIS_PASS'),
                        db: 0,
                    },
                    prefix: 'bull',
                    defaultJobOptions: {
                        delay: 1000,
                        attempts: 3,
                        lifo: false,
                        timeout: 60 * 1000,
                        removeOnComplete: false,
                        removeOnFail: false,
                    },
                    settings: {
                        lockDuration: 30000,
                        lockRenewTime: 15000,
                        stalledInterval: 30000,
                        maxStalledCount: 1,
                        guardInterval: 5000,
                        retryProcessDelay: 5000,
                        backoffStrategies: {},
                        drainDelay: 5,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            nestjs_i18n_1.I18nModule.forRootAsync({
                useFactory: (configService) => ({
                    fallbackLanguage: configService.get('LANG'),
                    parserOptions: {
                        path: path.join(__dirname, configService.get('I18N_SOURCE')),
                        watch: true,
                    },
                }),
                parser: nestjs_i18n_1.I18nJsonParser,
                resolvers: [
                    { use: nestjs_i18n_1.QueryResolver, options: ['lang', 'locale', 'l'] },
                    new nestjs_i18n_1.HeaderResolver(['x-aella-lang']),
                    new i18n_redis_resolver_service_1.I18nRedisResolverService(),
                ],
                inject: [config_1.ConfigService],
            }),
            services_1.ServicesModule,
            terminus_1.TerminusModule,
            queues_1.QueuesModule,
            health_module_1.HealthModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            io_redis_module_1.IoRedisModule,
            AppModule_1,
            role_module_1.RoleModule,
            institutions_module_1.InstitutionsModule,
            institution_users_module_1.InstitutionUsersModule,
            billings_module_1.BillingsModule,
            settings_module_1.SettingsModule,
            permissions_module_1.PermissionsModule,
            analysis_dashboard_module_1.AnalysisDashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: error_filter_1.ErrorFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: log_response_interceptor_1.LogResponseInterceptor,
            },
        ],
    }),
    __metadata("design:paramtypes", [core_1.ModuleRef,
        config_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map