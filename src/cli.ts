#!/usr/bin/env node
import chalk from 'chalk';
import commandLineArgs = require('command-line-args');
import { multiReplaceFiles } from './core/multi-replace-files';

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
        next({ srcPath, outPath, outText, isSuccess }) {
            if (isSuccess && outText) {
                console.log(`\n${chalk.greenBright('CHANGED')}:`);
                console.log(chalk.yellow(srcPath));
            }
            else if (isSuccess && outPath) {
                console.log(`\n${chalk.greenBright('MOVED')}:`);
                console.log(chalk.yellow(srcPath), '->');
                console.log(chalk.yellowBright(outPath));
            }
            else {
                chalk.bgRedBright('FAIL');
                console.log(chalk.yellow(srcPath), '->');
                console.log(chalk.yellowBright(outPath || ''));
            }
        },
        complete() {
            console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`);
        },
    });
