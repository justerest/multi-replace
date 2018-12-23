"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function globFiles(pattern) {
    const glob$ = rxjs_1.bindNodeCallback(glob);
    return glob$(pattern, { nodir: true }).pipe(operators_1.mergeAll(), operators_1.map((path) => path_1.resolve(path)));
}
exports.globFiles = globFiles;
