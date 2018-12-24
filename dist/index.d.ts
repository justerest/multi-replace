export declare function getMultiReplaceChanges({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}): import("rxjs").Observable<{
    srcFilePath: string;
    outFilePath: string;
    srcText: string;
    outText: string;
}>;
export declare function getStrictReplaceChanges({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}): import("rxjs").Observable<{
    srcFilePath: string;
    outFilePath: string;
    srcText: string;
    outText: string;
}>;
export { multiReplace } from './multiReplace';
export { moveFile } from './utils/moveFile';
