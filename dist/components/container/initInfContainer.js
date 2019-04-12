"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = require("@config");
const _framework_1 = require("@framework");
const ServiceDiscovery_1 = require("../restClient/ServiceDiscovery");
exports.InfType = {
    ServiceDiscovery: Symbol('ServiceDiscovery')
};
async function initInfContainer(container, options) {
    const configFacotry = _framework_1.getConfigFacotry(container);
    const envChecker = new _framework_1.EnvironmentChecker(process.env[options.envName]);
    // const recordsConfig = configFacotry.create(RecordsConfig);
    envChecker.isDev ?
        container.bind(exports.InfType.ServiceDiscovery)
            .toConstantValue(new ServiceDiscovery_1.ServiceDiscovery(configFacotry.create(_config_1.ServiceConfig))) : null;
}
exports.initInfContainer = initInfContainer;
//# sourceMappingURL=initInfContainer.js.map