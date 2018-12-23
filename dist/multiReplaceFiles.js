"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const multiReplace_1 = require("./multiReplace");
const globFiles_1 = require("./utils/globFiles");
function multiReplaceFiles(paths, searchValue, replaceValue) {
    return rxjs_1.from(paths).pipe(rxjs_set_operators_1.setAll('catalog'), rxjs_set_operators_1.mergeSet('srcFilePath', ({ catalog }) => globFiles_1.globFiles(`${catalog}/**`)), rxjs_set_operators_1.set('outFilePath', ({ catalog, srcFilePath }) => resolveOutFilePath(catalog, srcFilePath, searchValue, replaceValue)), operators_1.mergeMap((state) => rxjs_1.of(state).pipe(rxjs_set_operators_1.mergeSet('text', ({ srcFilePath }) => fs_extra_1.readFile(srcFilePath, 'UTF-8')), rxjs_set_operators_1.set('changedText', ({ text }) => multiReplace_1.multiReplace(text, searchValue, replaceValue)), operators_1.filter(({ changedText, text, srcFilePath, outFilePath }) => changedText !== text || srcFilePath !== outFilePath), rxjs_set_operators_1.mergeSet('isSuccess', ({ srcFilePath, outFilePath, changedText }) => changeFile(srcFilePath, outFilePath, changedText)), operators_1.catchError(() => rxjs_1.of({ ...state, isSuccess: false })))));
}
exports.multiReplaceFiles = multiReplaceFiles;
async function changeFile(srcFilePath, outFilePath, data) {
    await fs_extra_1.writeFile(srcFilePath, data);
    await moveFile(srcFilePath, outFilePath);
    return true;
}
function resolveOutFilePath(catalog, srcFilePath, searchValue, replaceValue) {
    const relativePath = path_1.relative(catalog, srcFilePath);
    console.log(relativePath);
    const changedRelativePath = multiReplace_1.multiReplace(relativePath, searchValue, replaceValue);
    return path_1.resolve(catalog, changedRelativePath);
}
async function moveFile(srcFilePath, outFilePath) {
    await fs_extra_1.ensureDir(path_1.dirname(outFilePath));
    await fs_extra_1.rename(srcFilePath, outFilePath);
    await removeEmptyDir(path_1.dirname(srcFilePath));
}
async function removeEmptyDir(path) {
    const fileList = await fs_extra_1.readdir(path);
    if (!fileList.length) {
        await fs_extra_1.remove(path);
    }
}
