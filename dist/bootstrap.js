"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("./components/core/bootstrap");
bootstrap_1.bootstrap('KICKER_REPLAY_ENV');
require("source-map-support/register");
const tsConfig = require('../tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');
tsConfigPaths.register({
    baseUrl: __dirname,
    paths: tsConfig.compilerOptions.paths
});
//# sourceMappingURL=bootstrap.js.map