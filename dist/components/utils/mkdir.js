"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mkdirp = require("mkdirp");
exports.mkdir = (path) => mkdirp(path, (err) => {
    if (err) {
        throw err;
    }
});
//# sourceMappingURL=mkdir.js.map