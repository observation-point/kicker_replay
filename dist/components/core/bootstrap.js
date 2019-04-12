"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = require("./Environment");
require("reflect-metadata");
require("source-map-support/register");
exports.bootstrap = (envName) => {
    if (!process.env[envName]) {
        throw new Error(`Environment variable ${envName} is not set`);
    }
    const supportedEnvironment = Object.keys(Environment_1.Environment).map(key => Environment_1.Environment[key]);
    if (!supportedEnvironment.includes(process.env[envName])) {
        throw new Error(`Invalid env ${envName} value: ${process.env[envName]}!` +
            ` Env var should be one of: ${supportedEnvironment.join(', ')}`);
    }
};
//# sourceMappingURL=bootstrap.js.map