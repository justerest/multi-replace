"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const get_file_list_1 = require("./get-file-list");
const multi_replace_1 = require("./multi-replace");
const replace_path_1 = require("./replace-path");
function getReplaceChanges({ paths, searchValue, replaceValue }) {
    const replace = (str) => multi_replace_1.multiReplace({ str, searchValue, replaceValue });
    return rxjs_1.from(paths).pipe(rxjs_set_operators_1.setAll('basePath'), rxjs_set_operators_1.mergeSet('srcFilePath', ({ basePath }) => get_file_list_1.getFileList(basePath)), rxjs_set_operators_1.mergeSet('srcText', ({ srcFilePath }) => fs_extra_1.readFile(srcFilePath, 'UTF-8')), rxjs_set_operators_1.set('outFilePath', ({ basePath, srcFilePath }) => replace_path_1.replacePath({ basePath, srcFilePath, replace })), rxjs_set_operators_1.set('outText', ({ srcText }) => replace(srcText)), operators_1.filter(({ srcText, outText, srcFilePath, outFilePath }) => srcText !== outText || srcFilePath !== outFilePath));
}
exports.getReplaceChanges = getReplaceChanges;
