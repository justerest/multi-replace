"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const multiReplaceFilename_1 = require("./multiReplaceFilename");
const getFileList_1 = require("./utils/getFileList");
function getReplaceChanges(paths, replace) {
    return rxjs_1.from(paths).pipe(rxjs_set_operators_1.setAll('path'), rxjs_set_operators_1.mergeSet('srcFilePath', ({ path }) => getFileList_1.getFileList(path)), rxjs_set_operators_1.set('outFilePath', ({ path, srcFilePath }) => multiReplaceFilename_1.multiReplaceFilename(path, srcFilePath, replace)), rxjs_set_operators_1.mergeSet('srcText', ({ srcFilePath }) => fs_extra_1.readFile(srcFilePath, 'UTF-8')), rxjs_set_operators_1.set('outText', ({ srcText }) => replace(srcText)), operators_1.filter(({ outText, srcText, srcFilePath, outFilePath }) => outText !== srcText || srcFilePath !== outFilePath));
}
exports.getReplaceChanges = getReplaceChanges;
