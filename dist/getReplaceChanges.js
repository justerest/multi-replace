"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const globFiles_1 = require("./utils/globFiles");
function getReplaceChanges(paths, replace) {
    return rxjs_1.from(paths).pipe(rxjs_set_operators_1.setAll('rootDir'), rxjs_set_operators_1.mergeSet('srcFilePath', ({ rootDir }) => globFiles_1.globFiles(`${rootDir}/**`)), rxjs_set_operators_1.set('outFilePath', ({ rootDir, srcFilePath }) => {
        const relativePath = path_1.relative(rootDir, srcFilePath);
        const changedRelativePath = replace(relativePath);
        return path_1.resolve(rootDir, changedRelativePath);
    }), rxjs_set_operators_1.mergeSet('srcText', ({ srcFilePath }) => fs_extra_1.readFile(srcFilePath, 'UTF-8')), rxjs_set_operators_1.set('outText', ({ srcText }) => replace(srcText)), operators_1.filter(({ outText, srcText, srcFilePath, outFilePath }) => outText !== srcText || srcFilePath !== outFilePath));
}
exports.getReplaceChanges = getReplaceChanges;
