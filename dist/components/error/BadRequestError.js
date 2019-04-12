"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerializableError_1 = require("./SerializableError");
const HttpErrorCode_1 = require("./HttpErrorCode");
class BadRequestError extends SerializableError_1.SerializableError {
    constructor(message) {
        super(message);
        this.code = 'BadRequestError';
        this.httpCode = HttpErrorCode_1.HttpErrorCode.BAD_REQUEST_CODE;
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map