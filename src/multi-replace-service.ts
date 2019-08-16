import { Observable } from 'rxjs';
import { mergeTap, set } from 'rxjs-set-operators';
import { filter } from 'rxjs/operators';

import { FileSystemServiceImp } from './file-system-service-imp';
import { FilesParserImp } from './files-parser-imp';
import { FilePathTransformer } from './models/file-path-transformer';
import { FileSystemService } from './models/file-system-service';
import { FileData, FilesParser } from './models/files-parser';
import { StringTransformer } from './models/string-transformer';
import { StrictFilePathTransformerImp } from './strict-file-path-transformer-imp';
import { StringTransformerImp } from './string-transformer-imp';

export interface ChangedFileData extends FileData {
	outPath: string;
	outText: string;
}

export class MultiReplaceService {
	constructor(
		private stringTransformer: StringTransformer = new StringTransformerImp(),
		private fileSystemService: FileSystemService = new FileSystemServiceImp(),
		private filePathTransformer: FilePathTransformer = new StrictFilePathTransformerImp(stringTransformer),
		private filesParser: FilesParser = new FilesParserImp(fileSystemService),
	) {}

	multiReplace(paths: string[], searchValue: string, replaceValue: string): Observable<ChangedFileData> {
		return this.filesParser.parse(paths).pipe(
			set('outText', ({ srcText }) => this.stringTransformer.replace(srcText, searchValue, replaceValue)),
			set('outPath', ({ basePath, srcPath }) =>
				this.filePathTransformer.replace({ basePath, srcPath, searchValue, replaceValue }),
			),
			filter((fileData) => this.hasFileChanges(fileData)),
			mergeTap(({ srcPath, outText }) => this.fileSystemService.writeFile(srcPath, outText)),
			mergeTap(({ srcPath, outPath }) => this.fileSystemService.moveFile(srcPath, outPath)),
		);
	}

	private hasFileChanges({ srcText, outText, srcPath, outPath }: ChangedFileData): boolean {
		return srcText !== outText || srcPath !== outPath;
	}
}
