import { Observable } from 'rxjs';

export interface FileData {
	basePath: string;
	srcPath: string;
	srcText: string;
}

export interface FilesParser {
	parse(paths: string[]): Observable<FileData>;
}
