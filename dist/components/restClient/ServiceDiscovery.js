"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceDiscovery {
    constructor(services) {
        this.services = services;
    }
    location(serviceName) {
        return this.services[serviceName];
    }
}
exports.ServiceDiscovery = ServiceDiscovery;
//# sourceMappingURL=ServiceDiscovery.js.map