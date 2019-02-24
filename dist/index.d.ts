export * from './file-system-service';
export * from './string-transformer';
export * from './main-service';
export declare const multiReplace: (paths: string[], searchValue: string, replaceValue: string) => import("rxjs").Observable<import("./main-service").ChangedFileData>;
export declare const multiReplaceStrict: (paths: string[], searchValue: string, replaceValue: string) => import("rxjs").Observable<import("./main-service").ChangedFileData>;
