"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileOverview Common error class
 */
const SerializableError_1 = require("./SerializableError");
const HttpErrorCode_1 = require("./HttpErrorCode");
class InternalServerError extends SerializableError_1.SerializableError {
    constructor(error) {
        let message;
        let stack;
        if (typeof error === 'string') {
            message = error;
        }
        else {
            message = error.message || InternalServerError.DEFAULT_MESSAGE;
            stack = error.stack;
        }
        super(message);
        this.code = 'InternalServerError';
        this.httpCode = HttpErrorCode_1.HttpErrorCode.INTERNAL_SERVER_CODE;
        this.stack = stack;
    }
    static fromError(error) {
        return new InternalServerError(error);
    }
    static fromMessage(message) {
        return new InternalServerError(message);
    }
    serialize() {
        return {
            code: this.code,
            message: this.message,
            httpCode: this.httpCode,
            errorData: {
                stack: this.stack
            }
        };
    }
}
InternalServerError.DEFAULT_MESSAGE = 'Internal server error';
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=InternalServerError.js.map