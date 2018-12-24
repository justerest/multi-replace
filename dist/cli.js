#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const commandLineArgs = require("command-line-args");
const fs_extra_1 = require("fs-extra");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const index_1 = require("./index");
const moveFile_1 = require("./utils/moveFile");
const { paths, searchValue, replaceValue, strict } = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'searchValue', alias: 's', type: String },
    { name: 'replaceValue', alias: 'r', type: String },
    { name: 'strict', type: Boolean },
]);
if (!paths.length || !searchValue || !replaceValue) {
    throw new Error('Bad params');
}
const getReplaceChanges = strict ? index_1.getStrictReplaceChanges : index_1.getMultiReplaceChanges;
getReplaceChanges({ paths, searchValue, replaceValue })
    .pipe(rxjs_set_operators_1.mergeSet('isSuccess', async ({ srcText, outText, srcFilePath, outFilePath }) => {
    try {
        if (srcText !== outText) {
            await fs_extra_1.writeFile(srcFilePath, outText);
        }
        if (srcFilePath !== outFilePath) {
            await moveFile_1.moveFile(srcFilePath, outFilePath);
        }
        return true;
    }
    catch (error) {
        return false;
    }
}))
    .subscribe({
    next({ srcFilePath, outFilePath, isSuccess }) {
        const status = isSuccess && srcFilePath === outFilePath ? chalk_1.default.greenBright('CHANGE') :
            isSuccess ? chalk_1.default.greenBright('UPGRADE') :
                chalk_1.default.bgRedBright('FAIL');
        console.log(`\n${status}:`);
        console.log(chalk_1.default.yellow(srcFilePath), '->');
        console.log(chalk_1.default.yellowBright(outFilePath));
    },
    complete() {
        console.log(`\n${chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH '))}\n`);
    },
});
