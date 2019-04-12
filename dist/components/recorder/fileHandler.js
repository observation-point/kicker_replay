"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rimraf_1 = require("rimraf");
const diskusage_1 = require("diskusage");
class FileHandler {
    createDirIfNotExists(folderPath) {
        try {
            if (!fs_1.default.lstatSync(folderPath).isDirectory()) {
                fs_1.default.mkdirSync(folderPath);
            }
        }
        catch (e) {
            fs_1.default.mkdirSync(folderPath);
        }
    }
    removeDirectory(folderPath) {
        rimraf_1.default(folderPath, _err => null);
    }
    getDirectorySize(folderPath) {
        return diskusage_1.default.checkSync(folderPath);
    }
}
exports.FileHandler = FileHandler;
//# sourceMappingURL=fileHandler.js.map