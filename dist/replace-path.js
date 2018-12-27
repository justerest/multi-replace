"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function replacePath({ basePath, srcFilePath, replace }) {
    const relativePath = path_1.relative(basePath, srcFilePath);
    if (relativePath) {
        const changedRelativePath = replace(relativePath);
        return path_1.resolve(basePath, changedRelativePath);
    }
    return replaceFilename(basePath, replace);
}
exports.replacePath = replacePath;
function replaceFilename(basePath, replace) {
    const filename = path_1.basename(basePath);
    const dir = path_1.dirname(basePath);
    const changedFilename = replace(filename);
    return path_1.resolve(dir, changedFilename);
}
