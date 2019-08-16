import { dirname, relative, resolve } from 'path';

import { FilePathTransformerImp } from './file-path-transformer-imp';
import { FilePathParams } from './models/file-path-transformer';

export class DirFilePathTransformerImp extends FilePathTransformerImp {
	protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string {
		const dir = dirname(basePath.replace(/\**$/, ''));
		const relativePath = relative(dir, srcPath);
		const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
		return resolve(dir, path);
	}
}
