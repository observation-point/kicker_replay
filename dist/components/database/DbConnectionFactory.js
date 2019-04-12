"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const TypeormLogger_1 = require("./TypeormLogger");
class DbConnectionFactory {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
    }
    async create(options) {
        return typeorm_1.createConnection(Object.assign({ logger: new TypeormLogger_1.TypeormLogger() }, this.getConfig(options)));
    }
    getConfig(options) {
        return Object.assign({}, this.dbConfig, { migrations: [options.migrations], entities: [options.models] });
    }
}
exports.DbConnectionFactory = DbConnectionFactory;
//# sourceMappingURL=DbConnectionFactory.js.map