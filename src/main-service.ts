import { basename, dirname, relative, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { mergeSet, mergeTap, set, setAll } from 'rxjs-set-operators';
import { filter, mergeAll } from 'rxjs/operators';

import { FileSystemService } from './file-system-service';
import { StringTransformer } from './string-transformer';
import { filterUnique } from './utils/filter-unique.rxjs-pipe';

interface FileData {
	basePath: string;
	srcPath: string;
	srcText: string;
}

export interface ChangedFileData extends FileData {
	outPath: string;
	outText: string;
}

export class MainService {

	constructor(
		private stringTransformer = new StringTransformer(),
		private fileSystemService = new FileSystemService(),
	) { }

	multiReplace(paths: string[], searchValue: string, replaceValue: string): Observable<ChangedFileData> {
		return this.getFilesData(paths).pipe(
			set('outText', ({ srcText }) => this.stringTransformer.replace(srcText, searchValue, replaceValue)),
			set('outPath', (fileData) => this.replacePath(fileData, searchValue, replaceValue)),
			filter((fileData) => this.hasFileChanges(fileData)),
			mergeTap(({ srcPath, outText }) => this.fileSystemService.writeFile(srcPath, outText)),
			mergeTap(({ srcPath, outPath }) => this.fileSystemService.moveFile(srcPath, outPath)),
		);
	}

	getFilesData(paths: string[]): Observable<FileData> {
		return from(paths).pipe(
			setAll('basePath'),
			mergeSet('srcPath', ({ basePath }) => this.fileSystemService.glob(basePath).pipe(
				mergeAll(),
			)),
			filterUnique(({ srcPath }) => srcPath),
			mergeSet('srcText', ({ srcPath }) => this.fileSystemService.readFile(srcPath)),
		);
	}

	private replacePath(fileData: FileData, searchValue: string, replaceValue: string): string {
		const { srcPath, basePath } = fileData;
		const relativePath = relative(basePath, srcPath);
		if (relativePath) {
			const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
			return resolve(basePath, path);
		}
		const filename = basename(srcPath);
		const dir = dirname(srcPath);
		const changedFilename = this.stringTransformer.replace(filename, searchValue, replaceValue);
		return resolve(dir, changedFilename);
	}

	private hasFileChanges({ srcText, outText, srcPath, outPath }: ChangedFileData): boolean {
		return srcText !== outText || srcPath !== outPath;
	}

}

const mainService = new MainService();
export const multiReplace = mainService.multiReplace.bind(mainService);
