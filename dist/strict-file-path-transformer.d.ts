import { FilePathParams, FilePathTransformer } from './file-path-transformer';
export declare class StrictFilePathTransformer extends FilePathTransformer {
    protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string;
}
