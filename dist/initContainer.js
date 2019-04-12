"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _framework_1 = require("@framework");
const container_1 = require("./components/container");
async function initContainer() {
    const options = { envName: 'KICKER_REPLAY_ENV', baseDir: __dirname };
    await _framework_1.bindMainComponents(_framework_1.di.container, options);
    await container_1.initInfContainer(_framework_1.di.container, options);
    // await initDatabaseContainer(di.container, options);
}
exports.initContainer = initContainer;
//# sourceMappingURL=initContainer.js.map