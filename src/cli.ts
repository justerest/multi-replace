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
        next({ srcFilePath, outFilePath, isSuccess }) {
            const status =
                isSuccess && srcFilePath === outFilePath ? chalk.greenBright('CHANGE') :
                    isSuccess ? chalk.greenBright('MOVE') :
                        chalk.bgRedBright('FAIL');

            console.log(`\n${status}:`);
            console.log(chalk.yellow(srcFilePath), '->');
            console.log(chalk.yellowBright(outFilePath));
        },
        complete() {
            console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`);
        },
    });
