"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const path = require("path");
const cluster = require("cluster");
const routing_controllers_1 = require("routing-controllers");
const config_1 = require("../config");
const AccessLogMiddlewareFactory_1 = require("./middlewares/AccessLogMiddlewareFactory");
const di_1 = require("../di");
class Application {
    constructor(controllers, middlewares) {
        this.app = Express();
        this.app.disable('etag');
        this.app.disable('x-powered-by');
        this.app.use(Express.static(path.join(__dirname, '../../../../static')));
        this.app.use((new AccessLogMiddlewareFactory_1.AccessLogMiddlewareFactory).create());
        routing_controllers_1.useExpressServer(this.app, {
            controllers,
            middlewares,
            defaultErrorHandler: false,
        });
    }
    run() {
        if (this.config.workers) {
            this.startClusterServer();
        }
        else {
            this.startServer();
        }
    }
    startClusterServer() {
        if (cluster.isMaster) {
            const workersCount = this.config.workers || 1;
            this.logger.info(`Starting ${workersCount} workers`);
            for (let i = 0; i < workersCount; i = i + 1) {
                cluster.fork();
            }
        }
        else {
            this.startServer();
        }
    }
    startServer() {
        const { host, port } = this.config;
        this.app.listen({ host, port }, () => {
            this.logger.info(`Server started at http://${host}:${port}`);
        });
    }
}
__decorate([
    di_1.inject(di_1.Type.ServerConfig),
    __metadata("design:type", config_1.ServerConfig)
], Application.prototype, "config", void 0);
__decorate([
    di_1.inject(di_1.Type.AppLogger),
    __metadata("design:type", Object)
], Application.prototype, "logger", void 0);
exports.Application = Application;
//# sourceMappingURL=Application.js.map