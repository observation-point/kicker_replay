"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Type_1 = require("./Type");
const lib_1 = require("./config/lib");
const log_1 = require("./log");
const config_1 = require("./config");
/**
 * Init Logger, Configs, Db Connection
 */
exports.bindMainComponents = async (container, options) => {
    const configFactory = new lib_1.ConfigFactory(path.resolve(options.baseDir, '../config'), process.env[options.envName]);
    const loggerFactory = new log_1.LoggerFactory();
    const loggingConfig = configFactory.create(config_1.LoggingConfig);
    container.bind(Type_1.Type.ConfigFactory).toConstantValue(configFactory);
    container.bind(Type_1.Type.ServerConfig).toConstantValue(configFactory.create(config_1.ServerConfig));
    container.bind(Type_1.Type.AppLogger).toConstantValue(loggerFactory.create(loggingConfig.application));
    container.bind(Type_1.Type.AccessLogger).toConstantValue(loggerFactory.create(loggingConfig.access));
    container.bind(Type_1.Type.DbLogger).toConstantValue(loggerFactory.create(loggingConfig.db));
};
exports.getConfigFacotry = (container) => {
    return container.get(Type_1.Type.ConfigFactory);
};
//# sourceMappingURL=bindMainComponents.js.map