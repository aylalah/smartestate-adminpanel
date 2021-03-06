import { ModuleRef } from '@nestjs/core';
import { translateOptions } from 'nestjs-i18n';
import { User } from '../api/user';
export declare const randomDigits: (length?: number) => string;
export declare const random: (length?: number) => string;
export declare const environment: string;
export declare const isProduction: boolean;
export declare const isTesting: boolean;
export declare const isLocal: boolean;
export declare let moduleRef: ModuleRef;
export declare const setModuleRef: (aModuleRef: ModuleRef) => void;
export declare const outject: (service: any) => any;
export declare const formatPhoneNumber: (value: string) => string;
export declare const unifyPhoneNumber: (value: string) => string;
export declare const isPhoneNumber: (value: string) => boolean;
export declare const isEmailAddress: (value: string) => boolean;
export declare function isNumeric(str: string): boolean;
export declare function isNullOrUndefined(value: any): boolean;
export declare function isUndefined(value: any): boolean;
export declare function isBlankString(value: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function isObject(x: any): boolean;
export declare function isArray(x: any): boolean;
export declare function toJSON(mayBeJSON: string, returnJSON?: boolean): any;
export declare function ucfirst(phrase: string): string;
export declare const titleCase: (phrase: string) => string;
export declare const prettify: (phrase: string) => string;
export declare type HttpResponse = [boolean, number, string, string, any];
export declare const trimString: (characters: string, replaceWith?: string) => string;
export declare const __: (key: string, options?: translateOptions) => Promise<any>;
export declare function copy(src: string, dest: string): void;
export declare const mkDir: (path: string, callback: (e: any) => void) => void;
export declare const rmDir: (path: string, callback: (e: any) => void) => void;
export declare const mask: (val: string, use?: string) => string;
export declare const makeFilter: (query: string, from: string, to: string, columns: string[]) => any[];
export declare const generateTransactionReference: () => string;
export declare const getTier: (user: User) => 1 | 2 | 0 | 3;
export declare const trimUser: (user: User) => {};
export declare const prettyTimeLeft: (ms: number) => string;
