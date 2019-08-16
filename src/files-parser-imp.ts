import glob = require('glob');
import { resolve } from 'path';
import { bindNodeCallback, from, Observable, of } from 'rxjs';
import { mergeSet } from 'rxjs-set-operators';
import { concatMap, filter, map, mergeAll, mergeMap, take } from 'rxjs/operators';

import { FileSystemServiceImp } from './file-system-service-imp';
import { FileSystemService } from './models/file-system-service';
import { FileData, FilesParser } from './models/files-parser';
import { MultiReplaceParams } from './models/multi-replace-params';
import { filterUnique } from './utils/filter-unique.rxjs-pipe';

export class FilesParserImp implements FilesParser {
	constructor(protected fileSystemService: FileSystemService = new FileSystemServiceImp()) {}

	parse({ paths }: MultiReplaceParams): Observable<FileData> {
		return from(paths).pipe(mergeMap((path) => this.parsePath(path)));
	}

	protected parsePath(path: string): Observable<FileData> {
		return of({ basePath: path }).pipe(
			mergeSet('srcPath', ({ basePath }) => this.getFilesAtFolder(basePath)),
			filterUnique(({ srcPath }) => srcPath),
			mergeSet('srcText', ({ srcPath }) => this.fileSystemService.readFile(srcPath)),
		);
	}

	protected getFilesAtFolder(sourcePath: string): Observable<string> {
		return of(sourcePath, `${sourcePath}/**`).pipe(
			concatMap((pattern) => bindNodeCallback<string, glob.IOptions, string[]>(glob)(pattern, { nodir: true })),
			filter((paths) => !!paths.length),
			map((paths) => paths.map((path) => resolve(path))),
			take(1),
			mergeAll(),
		);
	}
}
