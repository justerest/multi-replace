#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const commandLineArgs = require("command-line-args");
const multi_replace_files_1 = require("./core/multi-replace-files");
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
    next({ srcPath, outPath, outText, isSuccess }) {
        if (isSuccess && outText) {
            console.log(`\n${chalk_1.default.greenBright('CHANGED')}:`);
            console.log(chalk_1.default.yellow(srcPath));
        }
        else if (isSuccess && outPath) {
            console.log(`\n${chalk_1.default.greenBright('MOVED')}:`);
            console.log(chalk_1.default.yellow(srcPath), '->');
            console.log(chalk_1.default.yellowBright(outPath));
        }
        else {
            chalk_1.default.bgRedBright('FAIL');
            console.log(chalk_1.default.yellow(srcPath), '->');
            console.log(chalk_1.default.yellowBright(outPath || ''));
        }
    },
    complete() {
        console.log(`\n${chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH '))}\n`);
    },
});
