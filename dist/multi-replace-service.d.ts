import { Observable } from 'rxjs';
import { FileSystemService } from './models/file-system-service';
import { FilenameTransformer } from './models/filename-transformer';
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
    private filenameTransformer;
    private filesParser;
    constructor(stringTransformer?: StringTransformer, fileSystemService?: FileSystemService, filenameTransformer?: FilenameTransformer, filesParser?: FilesParser);
    multiReplace({ paths, searchValue, replaceValue }: MultiReplaceParams): Observable<ChangedFileData>;
}
