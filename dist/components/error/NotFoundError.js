"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileOverview Error, which occurs when entity not found or does not exists
 */
const lodash_1 = require("lodash");
const SerializableError_1 = require("./SerializableError");
const HttpErrorCode_1 = require("./HttpErrorCode");
class NotFoundError extends SerializableError_1.SerializableError {
    constructor(entityName, message) {
        const name = lodash_1.upperFirst(entityName);
        const errorMessage = message || `${name} not found`;
        super(errorMessage);
        this.httpCode = HttpErrorCode_1.HttpErrorCode.NOT_FOUND_CODE;
        this.code = `${name}NotFoundError`;
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map