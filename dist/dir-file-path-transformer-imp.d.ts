import { FilePathTransformerImp } from './file-path-transformer-imp';
import { FilePathParams } from './models/file-path-transformer';
export declare class DirFilePathTransformerImp extends FilePathTransformerImp {
    protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string;
}
