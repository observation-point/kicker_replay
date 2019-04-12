"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
class LoggerFactory {
    create(config) {
        return pino(config);
    }
}
exports.LoggerFactory = LoggerFactory;
//# sourceMappingURL=LoggerFactory.js.map