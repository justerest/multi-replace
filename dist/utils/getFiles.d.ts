import { Observable } from 'rxjs';
export declare function getFiles(path: string): Observable<string>;
export declare function checkDir(path: string): Observable<boolean>;
export declare function globFiles(pattern: string): Observable<string>;
