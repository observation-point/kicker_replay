"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = require("./Environment");
/**
 * Utility for environment related stuff.
 * Only for dependency stub usage
 *
 * @class EnvironmentChecker
 */
class EnvironmentChecker {
    /**
     * Creates an instance of EnvironmentChecker.
     * @param {string} env Sets current environment
     */
    constructor(env) {
        this.currentEnv = env;
    }
    /**
     * Returns true if envList contain currentEnv value
     *
     * @param {string[]} envList
     * @returns {boolean}
     */
    hasEnvIn(envList) {
        return envList.some(envName => this.currentEnv === envName);
    }
    isProd() {
        return this.currentEnv === Environment_1.Environment.PROD;
    }
    isDev() {
        return this.currentEnv === Environment_1.Environment.DEV;
    }
    isQa() {
        return this.currentEnv === Environment_1.Environment.QA;
    }
}
exports.EnvironmentChecker = EnvironmentChecker;
//# sourceMappingURL=EnvironmentChecker.js.map