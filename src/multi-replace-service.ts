import { Observable } from 'rxjs';
import { mergeTap, set } from 'rxjs-set-operators';

import { FileSystemServiceImp } from './file-system-service-imp';
import { FilenameTransformerImp } from './filename-transformers/filename-transformer-imp';
import { FilesParserImp } from './files-parsers/files-parser-imp';
import { FileSystemService } from './models/file-system-service';
import { FilenameTransformer } from './models/filename-transformer';
import { FileData, FilesParser } from './models/files-parser';
import { MultiReplaceParams } from './models/multi-replace-params';
import { StringTransformer } from './models/string-transformer';
import { StringTransformerImp } from './string-transformer-imp';

export interface ChangedFileData extends FileData {
	outPath: string;
	outText: string;
}

export class MultiReplaceService {
	constructor(
		private stringTransformer: StringTransformer = new StringTransformerImp(),
		private fileSystemService: FileSystemService = new FileSystemServiceImp(),
		private filenameTransformer: FilenameTransformer = new FilenameTransformerImp(stringTransformer),
		private filesParser: FilesParser = new FilesParserImp(fileSystemService),
	) {}

	multiReplace({ paths, searchValue, replaceValue }: MultiReplaceParams): Observable<ChangedFileData> {
		return this.filesParser.parse({ paths, searchValue, replaceValue }).pipe(
			set('outText', ({ srcText }) => this.stringTransformer.replace(srcText, searchValue, replaceValue)),
			set('outPath', ({ basePath, srcPath }) =>
				this.filenameTransformer.replace({ basePath, srcPath, searchValue, replaceValue }),
			),
			mergeTap(({ srcPath, outText }) => this.fileSystemService.writeFile(srcPath, outText)),
			mergeTap(({ srcPath, outPath }) => this.fileSystemService.moveFile(srcPath, outPath)),
		);
	}
}
