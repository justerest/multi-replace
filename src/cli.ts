#!/usr/bin/env node
import chalk from 'chalk';
import commandLineArgs = require('command-line-args');
import { multiReplaceFiles } from './multi-replace-files';

const { paths, searchValue, replaceValue } = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'searchValue', alias: 's', type: String },
    { name: 'replaceValue', alias: 'r', type: String },
]) as {
    paths: string[];
    searchValue: string;
    replaceValue: string;
};

if (!paths.length || !searchValue || !replaceValue) {
    throw new Error('Bad params');
}

multiReplaceFiles({ paths, searchValue, replaceValue })
    .subscribe({
        next({ srcFilePath, outFilePath, textChanged, pathChanged }) {
            if (textChanged) {
                console.log(`\n${chalk.greenBright('CHANGED')}:`);
                console.log(chalk.yellow(srcFilePath));
            }
            else if (pathChanged) {
                console.log(`\n${chalk.greenBright('MOVED')}:`);
                console.log(chalk.yellow(srcFilePath), '->');
                console.log(chalk.yellowBright(outFilePath));
            }
            else {
                chalk.bgRedBright('FAIL');
                console.log(chalk.yellow(srcFilePath), '->');
                console.log(chalk.yellowBright(outFilePath));
            }
        },
        complete() {
            console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`);
        },
    });
