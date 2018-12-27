"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const get_file_list_1 = require("./get-file-list");
const multi_replace_1 = require("./multi-replace");
const multi_replace_path_1 = require("./multi-replace-path");
function getSerializedData({ paths, searchValue }) {
    return rxjs_1.from(paths).pipe(rxjs_set_operators_1.setAll('basePath'), rxjs_set_operators_1.mergeSet('srcPath', ({ basePath }) => get_file_list_1.getFileList(basePath)), rxjs_set_operators_1.mergeSet('srcText', ({ srcPath }) => fs_extra_1.readFile(srcPath, 'UTF-8')), rxjs_set_operators_1.set('serializedPath', ({ basePath, srcPath }) => multi_replace_path_1.multiSerializePath({ basePath, srcPath, searchValue })), rxjs_set_operators_1.set('serializedText', ({ srcText }) => multi_replace_1.multiSerialize(srcText, searchValue)), operators_1.filter(({ srcText, serializedText, srcPath, serializedPath }) => srcText !== serializedText || srcPath !== serializedPath));
}
exports.getSerializedData = getSerializedData;
