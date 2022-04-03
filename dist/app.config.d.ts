export declare const services: () => {
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
export declare const openServices: () => string[];
export declare const openEndpoints: () => {
    method: string;
    pattern: string;
}[];
export declare const endpointsRequiringPin: () => {
    method: string;
    pattern: string;
}[];
export declare const endpointsRequiringAdmin: () => {
    method: string;
    pattern: string;
}[];
