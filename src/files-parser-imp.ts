import { from, Observable } from 'rxjs';
import { mergeSet, setAll } from 'rxjs-set-operators';
import { mergeAll } from 'rxjs/operators';

import { FileSystemServiceImp } from './file-system-service-imp';
import { FileSystemService } from './models/file-system-service';
import { FileData, FilesParser } from './models/files-parser';
import { filterUnique } from './utils/filter-unique.rxjs-pipe';

export class FilesParserImp implements FilesParser {
	constructor(protected fileSystemService: FileSystemService = new FileSystemServiceImp()) {}

	parse(paths: string[]): Observable<FileData> {
		return from(paths).pipe(
			setAll('basePath'),
			mergeSet('srcPath', ({ basePath }) => this.fileSystemService.getFilesAtFolder(basePath).pipe(mergeAll())),
			filterUnique(({ srcPath }) => srcPath),
			mergeSet('srcText', ({ srcPath }) => this.fileSystemService.readFile(srcPath)),
		);
	}
}
