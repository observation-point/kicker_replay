"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerializableError_1 = require("./SerializableError");
const InternalServerError_1 = require("./InternalServerError");
class ErrorExtractor {
    extract(error) {
        let serializedError;
        if (this.isDomainError(error)) {
            serializedError = this.createCoreError(error);
        }
        else {
            serializedError = this.createInternalServerError(error);
        }
        return serializedError;
    }
    createCoreError(error) {
        const errorData = error.serialize();
        return errorData;
    }
    createValidationError(error) {
        const errorData = error.serialize();
        return errorData;
    }
    createInternalServerError(error) {
        const internalServerError = InternalServerError_1.InternalServerError.fromError(error);
        return internalServerError.serialize();
    }
    isDomainError(error) {
        return error instanceof SerializableError_1.SerializableError;
    }
}
exports.ErrorExtractor = ErrorExtractor;
//# sourceMappingURL=ErrorExtractor.js.map