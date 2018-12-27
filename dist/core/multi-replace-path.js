"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const multi_replace_1 = require("./multi-replace");
function multiSerializePath({ basePath, srcPath, searchValue }) {
    const relativePath = path_1.relative(basePath, srcPath);
    return relativePath
        ? multiSerializeRelativePath({ basePath, relativePath, searchValue })
        : multiSerializeFilename(srcPath, searchValue);
}
exports.multiSerializePath = multiSerializePath;
function multiDeserializePath(serializedPath, replacePathValue) {
    return serializedPath.replace(new RegExp(multi_replace_1.anyCasePlaceholderPattern, 'g'), replacePathValue);
}
exports.multiDeserializePath = multiDeserializePath;
function multiDeserializePaths(serializedStr, replaceValue) {
    return serializedStr.replace(new RegExp(`/(${multi_replace_1.anyCasePlaceholderPattern})`, 'g'), `/${replaceValue}`);
}
exports.multiDeserializePaths = multiDeserializePaths;
function multiSerializeRelativePath({ basePath, relativePath, searchValue }) {
    const changedRelativePath = multi_replace_1.multiSerialize(relativePath, searchValue);
    return path_1.resolve(basePath, changedRelativePath);
}
function multiSerializeFilename(srcPath, searchValue) {
    const filename = path_1.basename(srcPath);
    const dir = path_1.dirname(srcPath);
    const changedFilename = multi_replace_1.multiSerialize(filename, searchValue);
    return path_1.resolve(dir, changedFilename);
}
