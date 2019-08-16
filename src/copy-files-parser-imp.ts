import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { mergeTap, set, setAll } from 'rxjs-set-operators';
import { FileSystemServiceImp } from './file-system-service-imp';
import { FilesParserImp } from './files-parser-imp';
import { FilePathTransformer } from './models/file-path-transformer';
import { FileSystemService } from './models/file-system-service';
import { FileData } from './models/files-parser';
import { MultiReplaceParams } from './models/multi-replace-params';
import { StringTransformer } from './models/string-transformer';
import { StrictFilePathTransformerImp } from './strict-file-path-transformer-imp';
import { StringTransformerImp } from './string-transformer-imp';

export class CopyFilesParserImp extends FilesParserImp {
	constructor(
		fileSystemService: FileSystemService = new FileSystemServiceImp(),
		stringTransformer: StringTransformer = new StringTransformerImp(),
		private filePathTransformer: FilePathTransformer = new StrictFilePathTransformerImp(stringTransformer),
	) {
		super(fileSystemService);
	}

	parse({ paths, searchValue, replaceValue }: MultiReplaceParams): Observable<FileData> {
		return from(paths).pipe(
			setAll('sourcePath'),
			set('destPath', ({ sourcePath }) =>
				this.filePathTransformer.replace({ basePath: sourcePath, srcPath: sourcePath, searchValue, replaceValue }),
			),
			set('destPath', ({ sourcePath, destPath }) => (sourcePath !== destPath ? destPath : `${sourcePath} copy`)),
			mergeTap(({ sourcePath, destPath }) => this.fileSystemService.copy(sourcePath, destPath)),
			mergeMap(({ destPath }) => this.parsePath(destPath)),
		);
	}
}
