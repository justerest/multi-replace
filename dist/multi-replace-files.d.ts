import { Observable } from 'rxjs';
export declare function multiReplaceFiles({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}): Observable<{
    srcFilePath: string;
    srcText: string;
    outFilePath: string;
    outText: string;
    isSuccess: boolean;
}>;
