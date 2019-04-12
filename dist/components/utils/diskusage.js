"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diskusage = require("diskusage");
exports.getFreeSpace = async (path) => {
    try {
        const { free } = await diskusage.check(path);
        return free;
    }
    catch (err) {
        return 0;
    }
};
//# sourceMappingURL=diskusage.js.map