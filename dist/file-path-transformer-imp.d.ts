import { FilePathParams, FilePathTransformer } from './models/file-path-transformer';
import { StringTransformer } from './models/string-transformer';
export declare abstract class FilePathTransformerImp implements FilePathTransformer {
    protected stringTransformer: StringTransformer;
    constructor(stringTransformer?: StringTransformer);
    replace(filePathParams: FilePathParams): string;
    protected abstract replaceRelativePath(filePathParams: FilePathParams): string;
    protected replaceAbsolutePath({ srcPath, searchValue, replaceValue }: FilePathParams): string;
    private isAbsoluteFilePath;
}
