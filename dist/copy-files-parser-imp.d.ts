import { Observable } from 'rxjs';
import { FilesParserImp } from './files-parser-imp';
import { FilePathTransformer } from './models/file-path-transformer';
import { FileSystemService } from './models/file-system-service';
import { FileData } from './models/files-parser';
import { MultiReplaceParams } from './models/multi-replace-params';
import { StringTransformer } from './models/string-transformer';
export declare class CopyFilesParserImp extends FilesParserImp {
    private filePathTransformer;
    constructor(fileSystemService?: FileSystemService, stringTransformer?: StringTransformer, filePathTransformer?: FilePathTransformer);
    parse({ paths, searchValue, replaceValue }: MultiReplaceParams): Observable<FileData>;
}
