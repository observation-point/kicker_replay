"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const requireConfigObject_1 = require("./requireConfigObject");
class ConfigSource {
    constructor(pathToConfigDir, env) {
        this.environment = env;
        const wildcard = '*';
        const defaultConfigName = 'base';
        this.defaultConfigPath = path_1.resolve(pathToConfigDir, defaultConfigName, wildcard);
        this.configPath = path_1.resolve(pathToConfigDir, env, wildcard);
        this.fullConfig = new Map();
        this.init();
    }
    /*
    * @param {string} name Название файла из папки конфигов. Без расширения
    */
    getConfig(name) {
        const config = this.fullConfig.get(name);
        if (!config) {
            throw new Error(`Config not found! Name: ${name}`);
        }
        return config;
    }
    getFull() {
        const configObject = {};
        [...this.fullConfig].forEach((config) => {
            configObject[config[0]] = config[1];
        });
        return configObject;
    }
    print() {
        console.log(`Env: ${this.environment}`);
        [...this.fullConfig].forEach((config) => {
            try {
                console.log(JSON.stringify(config[1], null, 2));
            }
            catch (error) {
                console.error(`Error: Config parse error - ${config[0]}`);
            }
        });
    }
    init() {
        requireConfigObject_1.requireFilesFromDir([this.defaultConfigPath, this.configPath])
            .forEach((config) => {
            if (this.fullConfig.has(config.name)) {
                this.fullConfig.set(config.name, Object.assign(this.fullConfig.get(config.name), config.content));
            }
            else {
                this.fullConfig.set(config.name, config.content);
            }
        });
    }
}
exports.ConfigSource = ConfigSource;
//# sourceMappingURL=ConfigSource.js.map