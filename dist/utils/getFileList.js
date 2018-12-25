"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const glob = require("glob");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function getFileList(path) {
    return checkDir(path).pipe(operators_1.map((isDir) => isDir ? path + '/**' : path), operators_1.mergeMap(globFiles));
}
exports.getFileList = getFileList;
function checkDir(path) {
    return rxjs_1.defer(async () => await fs_extra_1.pathExists(path) && (await fs_extra_1.lstat(path)).isDirectory());
}
exports.checkDir = checkDir;
function globFiles(pattern) {
    const glob$ = rxjs_1.bindNodeCallback(glob);
    return glob$(pattern, { nodir: true }).pipe(operators_1.mergeAll(), operators_1.map((path) => path_1.resolve(path)));
}
exports.globFiles = globFiles;
