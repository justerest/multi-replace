import { Observable } from 'rxjs';
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
    constructor(stringTransformer?: StringTransformer, fileSystemService?: FileSystemService);
    multiReplace(paths: string[], searchValue: string, replaceValue: string): Observable<ChangedFileData>;
    getFilesData(paths: string[]): Observable<FileData>;
    private replacePath;
    private hasFileChanges;
}
export {};
