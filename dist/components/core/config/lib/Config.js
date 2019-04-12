"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class Config {
    validate() {
        const errors = class_validator_1.validateSync(this);
        if (errors.length) {
            throw new Error(`Validation failed for config ${this.getName()}, errors: ${JSON.stringify(errors)}`);
        }
    }
    getDefaults() {
        return {};
    }
    validateNested(target, targetConstructor) {
        const instance = class_transformer_1.plainToClass(targetConstructor, target);
        const errors = class_validator_1.validateSync(instance);
        if (errors.length) {
            throw new Error(`Validation failed for config ${this.getName()}, errors: ${JSON.stringify(errors)}`);
        }
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map