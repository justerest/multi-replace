"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
function multiReplaceFilename(path, srcFilePath, replace) {
    const relativePath = path_1.relative(path, srcFilePath);
    if (relativePath) {
        const changedRelativePath = replace(relativePath);
        return path_1.resolve(path, changedRelativePath);
    }
    const filename = path_1.basename(path);
    return path_1.resolve(path_1.dirname(path), replace(filename));
}
exports.multiReplaceFilename = multiReplaceFilename;
