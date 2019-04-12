"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const ConfigSource_1 = require("./ConfigSource");
class ConfigFactory {
    constructor(pathToConfigDir, env) {
        this.configSource = new ConfigSource_1.ConfigSource(pathToConfigDir, env);
    }
    create(configConstructor) {
        const config = new configConstructor;
        class_transformer_1.plainToClassFromExist(config, Object.assign(config.getDefaults(), this.configSource.getConfig(config.getName())));
        config.validate();
        return config;
    }
}
exports.ConfigFactory = ConfigFactory;
//# sourceMappingURL=ConfigFactory.js.map