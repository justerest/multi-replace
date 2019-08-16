import { relative, resolve } from 'path';

import { FilePathTransformerImp } from './file-path-transformer-imp';
import { FilePathParams } from './models/file-path-transformer';

export class StrictFilePathTransformerImp extends FilePathTransformerImp {
	protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string {
		const relativePath = relative(basePath, srcPath);
		const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
		return resolve(basePath, path);
	}
}
