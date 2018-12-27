"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const multi_replace_1 = require("./multi-replace");
function serializePath({ basePath, srcPath, searchValue }) {
    const relativePath = path_1.relative(basePath, srcPath);
    return relativePath
        ? serializeRelativePath({ basePath, relativePath, searchValue })
        : serializeFilename(srcPath, searchValue);
}
exports.serializePath = serializePath;
function serializeRelativePath({ basePath, relativePath, searchValue }) {
    const changedRelativePath = multi_replace_1.multiSerialize(relativePath, searchValue);
    return path_1.resolve(basePath, changedRelativePath);
}
function serializeFilename(srcPath, searchValue) {
    const filename = path_1.basename(srcPath);
    const dir = path_1.dirname(srcPath);
    const changedFilename = multi_replace_1.multiSerialize(filename, searchValue);
    return path_1.resolve(dir, changedFilename);
}
