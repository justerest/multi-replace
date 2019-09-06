import { FilenameTransformer, FilePathParams } from '../models/filename-transformer';
import { StringTransformer } from '../models/string-transformer';
export declare class FilenameTransformerImp implements FilenameTransformer {
    protected stringTransformer: StringTransformer;
    constructor(stringTransformer?: StringTransformer);
    replace(filePathParams: FilePathParams): string;
    protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string;
    protected replaceAbsolutePath({ srcPath, searchValue, replaceValue }: FilePathParams): string;
    private isAbsoluteFilePath;
}
