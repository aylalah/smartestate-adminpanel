import { DiskHealthIndicator, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private readonly health;
    private readonly database;
    private readonly memory;
    private readonly disk;
    private readonly http;
    services: {
        eligibility: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        transfer: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        loan: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        'wallet-interest': {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        marketplace: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        card: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        account: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        wallet: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        cards: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        settlement: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        bill: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        'bank-statement': {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        faq: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        pwa: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
        merchant: {
            name: string;
            alias: string;
            baseUrl: string;
            slug: string;
        };
    };
    constructor(health: HealthCheckService, database: TypeOrmHealthIndicator, memory: MemoryHealthIndicator, disk: DiskHealthIndicator, http: HttpHealthIndicator);
    check(): Promise<{
        status: string;
        title: string;
        message: string;
        data: any;
        meta: any;
    }>;
}
