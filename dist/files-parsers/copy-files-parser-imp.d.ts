import { Observable } from 'rxjs';
import { FileSystemService } from '../models/file-system-service';
import { FilenameTransformer } from '../models/filename-transformer';
import { FileData } from '../models/files-parser';
import { MultiReplaceParams } from '../models/multi-replace-params';
import { StringTransformer } from '../models/string-transformer';
import { FilesParserImp } from './files-parser-imp';
export declare class CopyFilesParserImp extends FilesParserImp {
    private filenameTransformer;
    constructor(fileSystemService?: FileSystemService, stringTransformer?: StringTransformer, filenameTransformer?: FilenameTransformer);
    parse({ paths, searchValue, replaceValue }: MultiReplaceParams): Observable<FileData>;
}
