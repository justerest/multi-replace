import { basename, dirname, relative, resolve } from 'path';

import { FilePathParams, FilePathTransformer } from './models/file-path-transformer';
import { StringTransformer } from './models/string-transformer';
import { StringTransformerImp } from './string-transformer-imp';

export abstract class FilePathTransformerImp implements FilePathTransformer {
	constructor(protected stringTransformer: StringTransformer = new StringTransformerImp()) {}

	replace(filePathParams: FilePathParams): string {
		if (this.isAbsoluteFilePath(filePathParams)) {
			return this.replaceAbsolutePath(filePathParams);
		}
		return this.replaceRelativePath(filePathParams);
	}

	protected abstract replaceRelativePath(filePathParams: FilePathParams): string;

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
