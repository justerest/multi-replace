export declare function multiReplaceFiles(paths: string[], searchValue: string, replaceValue: string): import("rxjs").Observable<{
    catalog: string;
    srcFilePath: string;
    outFilePath: string;
    text: string;
    changedText: string;
    isSuccess: true;
} | {
    isSuccess: boolean;
    catalog: string;
    srcFilePath: string;
    outFilePath: string;
}>;
