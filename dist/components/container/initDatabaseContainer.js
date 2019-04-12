"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const _config_1 = require("@config");
const _framework_1 = require("@framework");
const Type_1 = require("../Type");
const DbConnectionFactory_1 = require("../database/DbConnectionFactory");
const ImageRepository_1 = require("../../inf/video/ImageRepository");
exports.DbType = {
    ImageRepository: Symbol('ImageRepository')
};
async function initDatabaseContainer(container, options) {
    const configFacotry = _framework_1.getConfigFacotry(container);
    container.bind(Type_1.Type.DbConnection)
        .toConstantValue(await (new DbConnectionFactory_1.DbConnectionFactory(configFacotry.create(_config_1.DbConfig))).create({
        models: path_1.resolve(options.baseDir, 'inf/**/*.js'),
        migrations: path_1.resolve(options.baseDir, 'inf/migrations/*.js'),
    }));
    container.bind(exports.DbType.ImageRepository)
        .toConstantValue(new ImageRepository_1.ImageRepository());
}
exports.initDatabaseContainer = initDatabaseContainer;
//# sourceMappingURL=initDatabaseContainer.js.map