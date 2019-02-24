#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const commandLineArgs = require("command-line-args");
const index_1 = require("./index");
const { paths, searchValue, replaceValue } = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'searchValue', alias: 's', type: String },
    { name: 'replaceValue', alias: 'r', type: String },
]);
if (!paths.length || !searchValue || !replaceValue) {
    throw new Error('Bad params');
}
index_1.multiReplace(paths, searchValue, replaceValue).subscribe({
    next({ srcPath, srcText, outPath, outText }) {
        if (srcText !== outText) {
            console.log(`\n${chalk_1.default.greenBright('CHANGED')}:`);
            console.log(chalk_1.default.yellow(srcPath));
        }
        if (srcPath !== outPath) {
            console.log(`\n${chalk_1.default.greenBright('MOVED')}:`);
            console.log(chalk_1.default.yellow(srcPath), '->');
            console.log(chalk_1.default.yellowBright(outPath));
        }
    },
    complete() {
        console.log(`\n${chalk_1.default.bgCyan(chalk_1.default.bold(' FINISH '))}\n`);
    },
});
