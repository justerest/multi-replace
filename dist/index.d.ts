export * from './core/multi-replacer';
export * from './core/string-transformer';
export declare const multiReplace: (paths: string[], searchValue: string, replaceValue: string) => import("rxjs").Observable<import("./core/multi-replacer").ChangedFileData>;
