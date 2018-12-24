#!/usr/bin/env node
import chalk from 'chalk';
import commandLineArgs = require('command-line-args');
import { writeFile } from 'fs-extra';
import { mergeSet } from 'rxjs-set-operators';
import { getMultiReplaceChanges, getStrictReplaceChanges } from './index';
import { moveFile } from './utils/moveFile';

const { paths, searchValue, replaceValue, strict } = commandLineArgs([
    { name: 'paths', multiple: true, defaultOption: true, defaultValue: [] },
    { name: 'searchValue', alias: 's', type: String },
    { name: 'replaceValue', alias: 'r', type: String },
    { name: 'strict', type: Boolean },
]) as {
    paths: string[];
    searchValue: string;
    replaceValue: string;
    strict: boolean;
};

if (!paths.length || !searchValue || !replaceValue) {
    throw new Error('Bad params');
}

const getReplaceChanges = strict ? getStrictReplaceChanges : getMultiReplaceChanges;
getReplaceChanges({ paths, searchValue, replaceValue })
    .pipe(
        mergeSet('isSuccess', async ({ srcText, outText, srcFilePath, outFilePath }) => {
            try {
                if (srcText !== outText) {
                    await writeFile(srcFilePath, outText);
                }
                if (srcFilePath !== outFilePath) {
                    await moveFile(srcFilePath, outFilePath);
                }
                return true;
            }
            catch (error) {
                return false;
            }
        }),
    )
    .subscribe({
        next({ srcFilePath, outFilePath, isSuccess }) {
            const status =
                isSuccess && srcFilePath === outFilePath ? chalk.greenBright('CHANGE') :
                    isSuccess ? chalk.greenBright('UPGRADE') :
                        chalk.bgRedBright('FAIL');

            console.log(`\n${status}:`);
            console.log(chalk.yellow(srcFilePath), '->');
            console.log(chalk.yellowBright(outFilePath));
        },
        complete() {
            console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`);
        },
    });
