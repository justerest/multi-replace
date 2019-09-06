import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { mergeTap, set, setAll } from 'rxjs-set-operators';
import { FileSystemServiceImp } from '../file-system-service-imp';
import { FilenameTransformerImp } from '../filename-transformers/filename-transformer-imp';
import { FileSystemService } from '../models/file-system-service';
import { FilenameTransformer } from '../models/filename-transformer';
import { FileData } from '../models/files-parser';
import { MultiReplaceParams } from '../models/multi-replace-params';
import { StringTransformer } from '../models/string-transformer';
import { StringTransformerImp } from '../string-transformer-imp';
import { FilesParserImp } from './files-parser-imp';

export class CopyFilesParserImp extends FilesParserImp {
	constructor(
		fileSystemService: FileSystemService = new FileSystemServiceImp(),
		stringTransformer: StringTransformer = new StringTransformerImp(),
		private filenameTransformer: FilenameTransformer = new FilenameTransformerImp(stringTransformer),
	) {
		super(fileSystemService);
	}

	parse({ paths, searchValue, replaceValue }: MultiReplaceParams): Observable<FileData> {
		return from(paths).pipe(
			setAll('sourcePath'),
			set('destPath', ({ sourcePath }) =>
				this.filenameTransformer.replace({ basePath: sourcePath, srcPath: sourcePath, searchValue, replaceValue }),
			),
			set('destPath', ({ sourcePath, destPath }) => (sourcePath !== destPath ? destPath : `${sourcePath} copy`)),
			mergeTap(({ sourcePath, destPath }) => this.fileSystemService.copy(sourcePath, destPath)),
			mergeMap(({ destPath }) => this.parsePath(destPath)),
		);
	}
}
