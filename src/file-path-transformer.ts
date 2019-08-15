import { basename, dirname, relative, resolve } from 'path';

import { StringTransformer } from './string-transformer';

export interface FilePathParams {
	basePath: string;
	srcPath: string;
	searchValue: string;
	replaceValue: string;
}

export abstract class FilePathTransformer {
	constructor(protected stringTransformer = new StringTransformer()) {}

	replace(filePathParams: FilePathParams): string {
		if (this.isAbsoluteFilePath(filePathParams)) {
			return this.replaceAbsolutePath(filePathParams);
		}
		return this.replaceRelativePath(filePathParams);
	}

	protected abstract replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string;

	protected replaceAbsolutePath({ srcPath, searchValue, replaceValue }: FilePathParams): string {
		const filename = basename(srcPath);
		const dir = dirname(srcPath);
		const changedFilename = this.stringTransformer.replace(filename, searchValue, replaceValue);
		return resolve(dir, changedFilename);
	}

	private isAbsoluteFilePath({ basePath, srcPath }: FilePathParams): boolean {
		return !relative(basePath, srcPath);
	}
}
