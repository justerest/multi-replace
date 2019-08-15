import { dirname, relative, resolve } from 'path';

import { FilePathParams, FilePathTransformer } from './file-path-transformer';

export class DirFilePathTransformer extends FilePathTransformer {
	protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string {
		const dir = dirname(basePath.replace(/\**$/, ''));
		const relativePath = relative(dir, srcPath);
		const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
		return resolve(dir, path);
	}
}
