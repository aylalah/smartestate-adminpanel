declare class EnvironmentVariables {
    BASE_PATH: string;
    SERVICE_NAME: string;
    SERVICE_URL: string;
    PORT: number;
    NODE_ENV: string;
    DB_DIALECT: string;
    DB_NAME: string;
    DB_SYNC: boolean;
    DB_LOG: boolean;
    THROTTLE_TTL: number;
    THROTTLE_LIMIT: number;
    HTTP_TIMEOUT: number;
    HTTP_MAX_REDIRECTS: number;
    JWT_SECRET: string;
    JWT_EXPIRY: number;
    ENCRYPTION_KEY: string;
    AWS_S3_KEY: string;
    AWS_S3_SECRET_KEY: string;
    AWS_S3_BUCKET: string;
    AWS_S3_DIR: string;
    AWS_S3_DIR_STAGE: string;
    AWS_S3_REGION: string;
    OTP_EXPIRY_DURATION: number;
    SENTRY_DNS: string;
    RUDDERSTACK_SOURCE_ID: string;
    RUDDERSTACK_WRITE_KEY: string;
    RUDDERSTACK_TOKEN: string;
    RUDDERSTACK_DATA_PLANE_URL: string;
    NEVER_BOUNCE_API_KEY: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASS: string;
    REDIS_DB: number;
    I18N_LANG: string;
    I18N_SOURCE: string;
    DOCUMENT_BASE_URL: string;
    BVN_URL: string;
    PWA_BASE_URL: string;
    SHUTDOWN_SWITCH?: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
