import { Observable } from 'rxjs';
import { FilePathTransformer } from './models/file-path-transformer';
import { FileSystemService } from './models/file-system-service';
import { FileData, FilesParser } from './models/files-parser';
import { MultiReplaceParams } from './models/multi-replace-params';
import { StringTransformer } from './models/string-transformer';
export interface ChangedFileData extends FileData {
    outPath: string;
    outText: string;
}
export declare class MultiReplaceService {
    private stringTransformer;
    private fileSystemService;
    private filePathTransformer;
    private filesParser;
    constructor(stringTransformer?: StringTransformer, fileSystemService?: FileSystemService, filePathTransformer?: FilePathTransformer, filesParser?: FilesParser);
    multiReplace({ paths, searchValue, replaceValue }: MultiReplaceParams): Observable<ChangedFileData>;
    private hasFileChanges;
}
