"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileOverview Common error class
 */
const HttpErrorCode_1 = require("./HttpErrorCode");
class SerializableError extends Error {
    constructor(message) {
        super(message);
        this.httpCode = HttpErrorCode_1.HttpErrorCode.BAD_REQUEST_CODE;
    }
    serialize() {
        return {
            code: this.code,
            message: this.message,
            httpCode: this.httpCode
        };
    }
}
exports.SerializableError = SerializableError;
//# sourceMappingURL=SerializableError.js.map