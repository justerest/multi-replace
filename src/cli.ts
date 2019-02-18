#!/usr/bin/env node
import chalk from 'chalk';
import commandLineArgs = require('command-line-args');

import { multiReplace } from './main-service';

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

multiReplace(paths, searchValue, replaceValue).subscribe({
	next({ srcPath, srcText, outPath, outText }) {
		if (srcText !== outText) {
			console.log(`\n${chalk.greenBright('CHANGED')}:`);
			console.log(chalk.yellow(srcPath));
		}
		if (srcPath !== outPath) {
			console.log(`\n${chalk.greenBright('MOVED')}:`);
			console.log(chalk.yellow(srcPath), '->');
			console.log(chalk.yellowBright(outPath));
		}
	},
	complete() {
		console.log(`\n${chalk.bgCyan(chalk.bold(' FINISH '))}\n`);
	},
});
