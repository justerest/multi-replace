import { relative, resolve } from 'path';

import { FilePathParams, FilePathTransformer } from './file-path-transformer';

export class StrictFilePathTransformer extends FilePathTransformer {
	protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string {
		const relativePath = relative(basePath, srcPath);
		const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
		return resolve(basePath, path);
	}
}
