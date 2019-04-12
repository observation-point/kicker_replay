"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const _framework_1 = require("@framework");
const routing_controllers_1 = require("routing-controllers");
const _error_1 = require("@error");
let ErrorHandlingMiddleware = class ErrorHandlingMiddleware {
    constructor() {
        this.errorExtractor = new _error_1.ErrorExtractor();
    }
    error(error, _request, response, next) {
        const extractedError = this.errorExtractor.extract(error);
        this.logError(extractedError);
        const { httpCode, code, message, errorData } = extractedError;
        if (errorData) {
            errorData.stack = undefined;
        }
        response.status(httpCode).json(Object.assign({ code, message }, errorData));
        next();
    }
    logError(error) {
        if (error.httpCode === _error_1.HttpErrorCode.INTERNAL_SERVER_CODE) {
            this.logger.fatal(error);
        }
        else {
            this.logger.error(error);
        }
    }
};
__decorate([
    _framework_1.di.inject(_framework_1.di.Type.AppLogger),
    __metadata("design:type", Object)
], ErrorHandlingMiddleware.prototype, "logger", void 0);
ErrorHandlingMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: 'after' }),
    __metadata("design:paramtypes", [])
], ErrorHandlingMiddleware);
exports.ErrorHandlingMiddleware = ErrorHandlingMiddleware;
//# sourceMappingURL=ErrorHandlingMiddleware.js.map