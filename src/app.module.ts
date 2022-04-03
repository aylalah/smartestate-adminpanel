import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  ModuleRef,
} from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { ErrorFilter } from './filters/error.filter';
import { LogResponseInterceptor } from './interceptors/log-response.interceptor';
import { LogRequestMiddleware } from './middlewares/log-request.middleware';
import { setModuleRef } from './utils/common.util';
import { ServicesModule } from './services';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { QueuesModule } from './queues';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { IoRedisModule } from './io-redis/io-redis.module';
import * as path from 'path';
import { SelectLanguageMiddleware } from './middlewares/select-language.middleware';
import { I18nRedisResolverService } from './services/i18n-redis-resolver/i18n-redis-resolver.service';
import { validate } from './env.validation';
import { Queue } from 'bull';
import { ShutdownMiddleware } from './middlewares';
import { RoleModule } from './api/role/role.module';
import { InstitutionsModule } from './api/estates/institutions.module';
import { InstitutionUsersModule } from './api/estate-users/institution-users.module';
import { AccessRequestsModule } from './api/access-requests/access-requests.module';
import { BillingsModule } from './api/billings/billings.module';
import { SettingsModule } from './api/settings/settings.module';
import { PermissionsModule } from './api/permissions/permissions.module';
import { AnalysisDashboardModule } from './api/analysis-dashboard/analysis-dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),

    // MailerModule.forRootAsync({
    //   useFactory: () => ({
    //     transport: 'smtps://bd85414986a586:296256b7067c3f@smtp.mailtrap.io',
    //     defaults: {
    //       from: '"nest-modules" <alala@gmail.com.com>',
    //     },
    //     template: {
    //       dir: __dirname + '/templates/welcome',
    //       adapter: new HandlebarsAdapter(),
    //       options: {
    //         strict: true,
    //       },
    //     },
    //   }),
    // }),

    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
        host: 'in-v3.mailjet.com',
        port: 587,
        secure: true // upgrade later with STARTTLS
      },
        auth: {
          user: "04212573e56b5bc3ce53a2ea7d7c42df",
          pass: "99855f2749fa31264885819364aae031"
        },
        tls: {
          rejectUnauthorized: false
      },
        defaults: {
          from:'"Check School" <admin.checkschool@gmail.com>',
        },
        template: {
          dir: process.cwd() + '/templates/welcome',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
      }})
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        
        replication: {
          master: {
            host: configService.get('DB_HOST'),
            port: +configService.get<number>('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASS'),
            database: configService.get('DB_NAME'),
          },
          slaves: [
            {
              host: configService.get('DB_HOST'),
              port: +configService.get<number>('DB_PORT'),
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
        entities: ['dist/api/**/*.entity.js'],
        cli: {
          entitiesDir: 'src/api/**/*.entity.ts',
        },
        namingStrategy: new SnakeNamingStrategy(),
        poolSize: 20,
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        limiter: {
          max: 100, // Max number of jobs processed
          duration: 5 * 60 * 1000, // per duration in milliseconds
          bounceBack: false, // When jobs get rate limited, they stay in the waiting queue or moved to the delayed queue
        },
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASS'),
          db: 0,
        },
        prefix: 'bull',
        defaultJobOptions: {
          delay: 1000, // An amount of miliseconds to wait until this job can be processed. Note that for accurate delays, both
          attempts: 3, // The total number of attempts to try the job until it completes.
          // backoff: number | BackoffOpts; // Backoff setting for automatic retries if the job fails
          lifo: false, // if true, adds the job to the right of the queue instead of the left (default false)
          timeout: 60 * 1000, // The number of milliseconds after which the job should be fail with a timeout error [optional]
          removeOnComplete: false, // If true, removes the job when it successfully
          removeOnFail: false, // If true, removes the job when it fails after all attempts. A number specified the amount of jobs to keep
        },
        settings: {
          lockDuration: 30000, // Key expiration time for job locks.
          lockRenewTime: 15000, // Interval on which to acquire the job lock
          stalledInterval: 30000, // How often check for stalled jobs (use 0 for never checking).
          maxStalledCount: 1, // Max amount of times a stalled job will be re-processed.
          guardInterval: 5000, // Poll interval for delayed jobs and added jobs.
          retryProcessDelay: 5000, // delay before processing next job in case of internal error.
          backoffStrategies: {}, // A set of custom backoff strategies keyed by name.
          drainDelay: 5, // A timeout for when the queue is in drained state (empty waiting for jobs).
        },
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('LANG'),
        parserOptions: {
          path: path.join(__dirname, configService.get('I18N_SOURCE')),
          watch: true,
        },
      }),
      parser: I18nJsonParser,
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-aella-lang']),
        new I18nRedisResolverService(),
      ],
      inject: [ConfigService],
    }),
    ServicesModule,
    TerminusModule,
    QueuesModule,
    HealthModule,
    AuthModule,
    UserModule,
    IoRedisModule,
    AppModule,
    RoleModule,
    InstitutionsModule,
    InstitutionUsersModule,
    AccessRequestsModule,
    BillingsModule,
    SettingsModule,
    PermissionsModule,
    AnalysisDashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogResponseInterceptor,
    },
  ],
})
export class AppModule {
  
  constructor(
    private readonly moduleRef: ModuleRef,
    // @InjectQueue("kabani") private kabaniQueue: Queue,
    private readonly configService: ConfigService,
  ) {
    setModuleRef(moduleRef);
  }

  configure(consumer: MiddlewareConsumer) {
    const middlewares = [
      LogRequestMiddleware,
      SelectLanguageMiddleware,
      ...(this.configService.get('SHUTDOWN_SWITCH') === 'on' ? [ ShutdownMiddleware ] : [])
    ]
    consumer      
      .apply(...middlewares)
      .forRoutes('(.*)');
  }

  onApplicationBootstrap() {
    // this.kabaniQueue.add("push-messages-to-slack", {}, {
    //   repeat: {
    //     cron: '0 * * * *',
    //   }
    // })
    // this.kabaniQueue.add("refresh-bvns", {}, {
    //   repeat: {
    //     cron: '0 * * * *',
    //   }
    // })
  }

}
