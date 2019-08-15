import { StringTransformer } from './string-transformer';
export interface FilePathParams {
    basePath: string;
    srcPath: string;
    searchValue: string;
    replaceValue: string;
}
export declare abstract class FilePathTransformer {
    protected stringTransformer: StringTransformer;
    constructor(stringTransformer?: StringTransformer);
    replace(filePathParams: FilePathParams): string;
    protected abstract replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string;
    protected replaceAbsolutePath({ srcPath, searchValue, replaceValue }: FilePathParams): string;
    private isAbsoluteFilePath;
}
