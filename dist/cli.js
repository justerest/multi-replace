#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const commandLineArgs = require("command-line-args");
const multi_replace_files_1 = require("./multi-replace-files");
const { paths, searchValue, replaceValue } = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'searchValue', alias: 's', type: String },
    { name: 'replaceValue', alias: 'r', type: String },
]);
if (!paths.length || !searchValue || !replaceValue) {
    throw new Error('Bad params');
}
multi_replace_files_1.multiReplaceFiles({ paths, searchValue, replaceValue })
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
