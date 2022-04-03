"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyTimeLeft = exports.trimUser = exports.getTier = exports.generateTransactionReference = exports.makeFilter = exports.mask = exports.rmDir = exports.mkDir = exports.copy = exports.__ = exports.trimString = exports.prettify = exports.titleCase = exports.ucfirst = exports.toJSON = exports.isArray = exports.isObject = exports.isFunction = exports.isBlankString = exports.isUndefined = exports.isNullOrUndefined = exports.isNumeric = exports.isEmailAddress = exports.isPhoneNumber = exports.unifyPhoneNumber = exports.formatPhoneNumber = exports.outject = exports.setModuleRef = exports.moduleRef = exports.isLocal = exports.isTesting = exports.isProduction = exports.environment = exports.random = exports.randomDigits = void 0;
const nestjs_i18n_1 = require("nestjs-i18n");
const path_1 = require("path");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const time_utils_1 = require("./time.utils");
const crypto_1 = require("crypto");
const os_1 = require("os");
const randomDigits = (length = 5) => {
    return Math.random().toString().substr(2, length);
};
exports.randomDigits = randomDigits;
const random = (length = 8) => {
    return crypto_1.randomBytes(Math.ceil(length)).toString('hex').substr(0, length);
};
exports.random = random;
exports.environment = process.env.NODE_ENV;
exports.isProduction = exports.environment === 'production';
exports.isTesting = exports.environment === 'testing';
exports.isLocal = exports.environment === 'local';
const setModuleRef = (aModuleRef) => {
    if (!exports.moduleRef) {
        exports.moduleRef = aModuleRef;
    }
};
exports.setModuleRef = setModuleRef;
const outject = (service) => {
    return exports.moduleRef.get(service);
};
exports.outject = outject;
const formatPhoneNumber = (value) => {
    if (!value) {
        return value;
    }
    return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};
exports.formatPhoneNumber = formatPhoneNumber;
const unifyPhoneNumber = (value) => {
    if (![11, 13, 14].includes(value === null || value === void 0 ? void 0 : value.length)) {
        throw new common_1.BadRequestException(`Invalid phone number. Phone number must start with +234, 234 or 0`);
    }
    if (!value.startsWith('+234') &&
        !value.startsWith('234') &&
        !value.startsWith('0')) {
        throw new common_1.BadRequestException(`Invalid phone number. Phone number must start with +234, 234 or 0`);
    }
    return value.replace(/(^0)/, '234').replace(/(^\+)/, '');
};
exports.unifyPhoneNumber = unifyPhoneNumber;
const isPhoneNumber = (value) => {
    return (class_validator_1.isNumberString(value) &&
        [11, 13, 14].includes(value === null || value === void 0 ? void 0 : value.length) &&
        (value.startsWith('+234') ||
            value.startsWith('234') ||
            value.startsWith('0')));
};
exports.isPhoneNumber = isPhoneNumber;
const isEmailAddress = (value) => {
    return class_validator_1.isEmail(value);
};
exports.isEmailAddress = isEmailAddress;
function isNumeric(str) {
    return !isNullOrUndefined(str) && /^\d+$/.test(str);
}
exports.isNumeric = isNumeric;
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isUndefined(value) {
    return value === undefined;
}
exports.isUndefined = isUndefined;
function isBlankString(value) {
    return value === '';
}
exports.isBlankString = isBlankString;
function isFunction(value) {
    return typeof value === 'function';
}
exports.isFunction = isFunction;
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
function isArray(x) {
    return x != null && typeof x === 'object' && Array.isArray(x);
}
exports.isArray = isArray;
function toJSON(mayBeJSON, returnJSON = false) {
    try {
        const obj = JSON.parse(mayBeJSON);
        if (obj && typeof obj === 'object') {
            return returnJSON ? obj : true;
        }
    }
    catch (e) { }
    return false;
}
exports.toJSON = toJSON;
function ucfirst(phrase) {
    var firstLetter = phrase.substr(0, 1);
    return firstLetter.toUpperCase() + phrase.substr(1);
}
exports.ucfirst = ucfirst;
const titleCase = (phrase) => {
    if (!phrase) {
        return phrase;
    }
    let upper = true;
    let newPhrase = '';
    for (let i = 0, l = phrase === null || phrase === void 0 ? void 0 : phrase.length; i < l; i++) {
        if (phrase[i] == ' ') {
            upper = true;
            newPhrase += phrase[i];
            continue;
        }
        newPhrase += upper ? phrase[i].toUpperCase() : phrase[i].toLowerCase();
        upper = false;
    }
    return newPhrase;
};
exports.titleCase = titleCase;
const prettify = (phrase) => {
    return phrase.replace(/_/g, ' ');
};
exports.prettify = prettify;
const trimString = (characters, replaceWith = '') => {
    return characters.replace(/^\//, replaceWith).replace(/\/$/, replaceWith);
};
exports.trimString = trimString;
const __ = (key, options) => {
    const i18n = exports.outject(nestjs_i18n_1.I18nContext);
    return i18n.translate(key, options);
};
exports.__ = __;
function copy(src, dest) {
    if (!fs_1.existsSync(dest))
        fs_1.mkdirSync(dest);
    fs_1.readdirSync(src).forEach((dirent) => {
        const [srcPath, destPath] = [src, dest].map((dirPath) => path_1.default.join(dirPath, dirent));
        const stat = fs_1.lstatSync(srcPath);
        switch (true) {
            case stat.isFile():
                fs_1.copyFileSync(srcPath, destPath);
                break;
            case stat.isDirectory():
                copy(srcPath, destPath);
                break;
            case stat.isSymbolicLink():
                fs_1.symlinkSync(fs_1.readlinkSync(srcPath), destPath);
                break;
        }
    });
}
exports.copy = copy;
const mkDir = (path, callback) => {
    fs_1.mkdir(path, { recursive: false }, callback);
};
exports.mkDir = mkDir;
const rmDir = (path, callback) => {
    fs_1.rmdir(path, { recursive: false }, callback);
};
exports.rmDir = rmDir;
const mask = (val, use = '*') => {
    if (!val) {
        return null;
    }
    return '*******';
};
exports.mask = mask;
const makeFilter = (query, from, to, columns) => {
    let dateRange = {};
    let filter = [];
    if (!!from && !!to) {
        dateRange = { created_at: typeorm_1.Between(time_utils_1.dateForSearch(from), time_utils_1.dateForSearch(to)) };
    }
    try {
        const parsedQuery = JSON.parse(query);
        if (Array.isArray(parsedQuery)) {
            filter = [...filter, ...parsedQuery];
        }
        else {
            throw new Error("JSON parsed, but its not an array");
        }
    }
    catch (error) {
        filter = [
            ...filter,
            ...(!!query ? columns.map((column) => (Object.assign({ [column]: typeorm_1.Like(`%${query}%`) }, dateRange))) : [dateRange]),
        ];
    }
    return filter;
};
exports.makeFilter = makeFilter;
const maxLength = 32;
const service = 'KBN';
const host = crypto_1.createHash('md5').update(os_1.hostname()).digest('hex').substr(0, 6);
const processId = ('' + process.pid).padStart(3, '0');
const generateTransactionReference = () => {
    const time = new Date().getTime();
    const wildcard = crypto_1.randomBytes(256 / 8).toString('hex').substr(0, 7);
    return `${time}-${host}-${service}-${processId}-${wildcard}`.substr(0, maxLength).toUpperCase();
};
exports.generateTransactionReference = generateTransactionReference;
const getTier = (user) => {
    const tier0 = !!user.phone_otp_verified;
    const tier1 = tier0 && !!user.image;
    const tier2 = tier1 && !!user.bvn_otp_verified;
    const tier3 = tier2 && !!user.document_state;
    if (tier3) {
        return 3;
    }
    if (tier2) {
        return 2;
    }
    if (tier1) {
        return 1;
    }
    if (tier0) {
        return 0;
    }
    return null;
};
exports.getTier = getTier;
const trimUser = (user) => {
    if (!user) {
        return user;
    }
    return Object.keys(user).filter((k) => [
        'id',
        'customer_id',
        'gender',
        'date_of_birth',
        'document_state',
        'next_of_kin_title',
        'next_of_kin_name',
        'next_of_kin_relationship',
        'next_of_kin_state',
        'first_name',
        'last_name',
        'email',
        'email_valid',
        'phone_number',
        'bvn',
        'bvn_valid',
        'next_of_kin_phone',
        'device_type',
        'device_id',
        'suspended_at',
        'closed_at',
        'state_of_residence',
        'created_at',
        'state_of_residence',
        'home_address',
    ].includes(k)).reduce((prev, curr) => {
        return Object.assign(Object.assign({}, prev), { [curr]: user[curr] });
    }, {});
};
exports.trimUser = trimUser;
const prettyTimeLeft = (ms) => {
    if (!ms || ms < 0 || ms <= (1000 * 60)) {
        return `a minute`;
    }
    const s = Math.round(ms / 1000);
    const m = Math.round(s / 60);
    if (m <= 60) {
        return `${m} minute(s)`;
    }
    const h = Math.round(m / 60);
    if (h <= 24) {
        return `${m} hour(s)`;
    }
    const d = Math.round(h / 24);
    return `${d} day(s)`;
};
exports.prettyTimeLeft = prettyTimeLeft;
//# sourceMappingURL=common.util.js.map