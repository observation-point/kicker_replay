"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function removeFromNodeCache(id) {
    delete require.cache[require.resolve(id)];
}
function requireFilesFromDir(directories) {
    const formats = ['.js', '.json'];
    return directories
        .map(dirPath => dirPath.replace('*', ''))
        .reduce((allDirs, dir) => allDirs.concat((readDirFiles(path.normalize(dir)))), [])
        .filter((file) => {
        const dtsExtension = file.substring(file.length - 5, file.length);
        return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
    })
        .map((pathTofile) => {
        const fileName = path.basename(pathTofile);
        removeFromNodeCache(pathTofile);
        const config = {
            name: fileName.slice(0, fileName.lastIndexOf(formats[0])),
            content: require(pathTofile)
        };
        return config;
    })
        .filter(loaded => loaded.content);
}
exports.requireFilesFromDir = requireFilesFromDir;
const readDirFiles = (pathToDir) => {
    const dirFileList = [];
    fs.readdirSync(pathToDir)
        .forEach((element) => {
        const elementPath = path.resolve(pathToDir, element);
        if (!fs.statSync(elementPath).isDirectory()) {
            dirFileList.push(elementPath);
        }
    });
    return dirFileList;
};
//# sourceMappingURL=requireConfigObject.js.map