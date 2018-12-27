import { Observable } from 'rxjs';
export declare function multiReplaceFiles({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}): Observable<{
    srcPath: string;
    srcText: string;
    isSuccess: boolean;
    outPath?: string;
    outText?: string;
}>;
