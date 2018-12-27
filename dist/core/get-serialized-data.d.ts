import { Observable } from 'rxjs';
export declare function getSerializedData({ paths, searchValue }: {
    paths: string[];
    searchValue: string;
}): Observable<{
    srcPath: string;
    srcText: string;
    serializedPath: string;
    serializedText: string;
}>;
