import { Observable } from 'rxjs';
import { FileSystemService } from './models/file-system-service';
import { FileData, FilesParser } from './models/files-parser';
import { MultiReplaceParams } from './models/multi-replace-params';
export declare class FilesParserImp implements FilesParser {
    protected fileSystemService: FileSystemService;
    constructor(fileSystemService?: FileSystemService);
    parse({ paths }: MultiReplaceParams): Observable<FileData>;
    protected parsePath(path: string): Observable<FileData>;
    private getFilesAtFolder;
}
