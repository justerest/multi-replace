import { FilePathParams } from '../models/filename-transformer';
import { FilenameTransformerImp } from './filename-transformer-imp';
export declare class StrictFilenameTransformerImp extends FilenameTransformerImp {
    protected replaceAbsolutePath({ srcPath }: FilePathParams): string;
}
