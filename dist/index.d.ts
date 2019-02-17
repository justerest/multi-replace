export * from './core/main-service';
export * from './core/string-transformer';
export declare const multiReplace: (paths: string[], searchValue: string, replaceValue: string) => import("rxjs").Observable<import("./core/main-service").ChangedFileData>;
