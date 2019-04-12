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
const lib_1 = require("./lib");
const class_validator_1 = require("class-validator");
var LoggerName;
(function (LoggerName) {
    LoggerName["application"] = "application";
    LoggerName["access"] = "access";
    LoggerName["db"] = "db";
})(LoggerName = exports.LoggerName || (exports.LoggerName = {}));
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["trace"] = "trace";
    LoggerLevel["debug"] = "debug";
    LoggerLevel["info"] = "info";
    LoggerLevel["warn"] = "warn";
    LoggerLevel["error"] = "error";
    LoggerLevel["fatal"] = "fatal";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
class LoggerConfig {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsEnum(LoggerName),
    __metadata("design:type", String)
], LoggerConfig.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsEnum(LoggerLevel),
    __metadata("design:type", String)
], LoggerConfig.prototype, "level", void 0);
exports.LoggerConfig = LoggerConfig;
class PinoLogging extends lib_1.Config {
    getName() {
        return 'logging';
    }
    validate() {
        super.validate();
        this.validateNested(this.application, LoggerConfig);
        this.validateNested(this.access, LoggerConfig);
        this.validateNested(this.db, LoggerConfig);
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", LoggerConfig)
], PinoLogging.prototype, "application", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", LoggerConfig)
], PinoLogging.prototype, "access", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.ValidateNested(),
    __metadata("design:type", LoggerConfig)
], PinoLogging.prototype, "db", void 0);
exports.PinoLogging = PinoLogging;
//# sourceMappingURL=Logging.js.map