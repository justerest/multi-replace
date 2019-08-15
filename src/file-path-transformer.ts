import { basename, dirname, relative, resolve } from 'path';

import { StringTransformer } from './string-transformer';

interface FilePathParams {
	basePath: string;
	srcPath: string;
	searchValue: string;
	replaceValue: string;
}

export class FilePathTransformer {
	constructor(private stringTransformer = new StringTransformer()) {}

	replace(filePathParams: FilePathParams): string {
		if (this.isAbsoluteFilePath(filePathParams)) {
			return this.replaceAbsolutePath(filePathParams);
		}
		return this.replaceRelativePath(filePathParams);
	}

	private isAbsoluteFilePath({ basePath, srcPath }: FilePathParams) {
		return !relative(basePath, srcPath);
	}

	private replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams) {
		const relativePath = relative(basePath, srcPath);
		const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
		return resolve(basePath, path);
	}

	private replaceAbsolutePath({ srcPath, searchValue, replaceValue }: FilePathParams) {
		const filename = basename(srcPath);
		const dir = dirname(srcPath);
		const changedFilename = this.stringTransformer.replace(filename, searchValue, replaceValue);
		return resolve(dir, changedFilename);
	}
}
