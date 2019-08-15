import { Observable } from 'rxjs';
import { FilePathTransformer } from './file-path-transformer';
import { FileSystemService } from './file-system-service';
import { StringTransformer } from './string-transformer';
interface FileData {
    basePath: string;
    srcPath: string;
    srcText: string;
}
export interface ChangedFileData extends FileData {
    outPath: string;
    outText: string;
}
export declare class MainService {
    private stringTransformer;
    private fileSystemService;
    private filePathTransformer;
    constructor(stringTransformer?: StringTransformer, fileSystemService?: FileSystemService, filePathTransformer?: FilePathTransformer);
    multiReplace(paths: string[], searchValue: string, replaceValue: string): Observable<ChangedFileData>;
    getFilesData(paths: string[]): Observable<FileData>;
    private hasFileChanges;
}
export {};
