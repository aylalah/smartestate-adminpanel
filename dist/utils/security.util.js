"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.compare = exports.hash = void 0;
const bcrypt = require("bcryptjs");
const crypto_1 = require("crypto");
const crypto_2 = require("crypto");
const common_util_1 = require("./common.util");
const ENCRYPTION_ALGO = 'aes-256-cbc';
const IV_LENGTH = 16;
const hash = (text) => {
    return bcrypt.hashSync(text, bcrypt.genSaltSync());
};
exports.hash = hash;
const compare = (text, hashedText) => {
    return bcrypt.compareSync(text, hashedText);
};
exports.compare = compare;
const encrypt = (text) => {
    if (common_util_1.isNullOrUndefined(text)) {
        return text;
    }
    const iv = crypto_1.randomBytes(IV_LENGTH);
    const cipher = crypto_1.createCipheriv(ENCRYPTION_ALGO, Buffer.from(process.env.ENCRYPTION_KEY), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};
exports.encrypt = encrypt;
const decrypt = (text) => {
    if (common_util_1.isNullOrUndefined(text)) {
        return text;
    }
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto_2.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), iv);
    const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
//# sourceMappingURL=security.util.js.map