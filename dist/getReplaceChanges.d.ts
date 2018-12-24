import { Observable } from 'rxjs';
export declare function getReplaceChanges(paths: string[], replace: (str: string) => string): Observable<{
    srcFilePath: string;
    outFilePath: string;
    srcText: string;
    outText: string;
}>;
