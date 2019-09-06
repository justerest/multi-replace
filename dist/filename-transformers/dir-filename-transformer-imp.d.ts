import { FilePathParams } from '../models/filename-transformer';
import { FilenameTransformerImp } from './filename-transformer-imp';
export declare class DirFilenameTransformerImp extends FilenameTransformerImp {
    protected replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }: FilePathParams): string;
}
