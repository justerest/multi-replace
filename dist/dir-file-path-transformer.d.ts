import { FilePathParams, FilePathTransformer } from './file-path-transformer';
export declare class DirFilePathTransformer extends FilePathTransformer {
    protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string;
}
