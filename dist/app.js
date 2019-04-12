"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./bootstrap");
const path_1 = require("path");
const _framework_1 = require("@framework");
const initContainer_1 = require("./initContainer");
const CONTROLLERS_PATH = path_1.resolve(__dirname, './application/controllers/**/*.js');
void initContainer_1.initContainer().then(async () => {
    const app = new _framework_1.Application([CONTROLLERS_PATH], []);
    app.run();
});
//# sourceMappingURL=app.js.map