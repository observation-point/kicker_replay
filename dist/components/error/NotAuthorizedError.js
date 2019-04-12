"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerializableError_1 = require("./SerializableError");
const HttpErrorCode_1 = require("./HttpErrorCode");
class NotAuthorizedError extends SerializableError_1.SerializableError {
    constructor() {
        super('User must be authorized');
        this.code = 'NotAuthorizedError';
        this.httpCode = HttpErrorCode_1.HttpErrorCode.FORBIDDEN_ERROR_CODE;
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
//# sourceMappingURL=NotAuthorizedError.js.map