import { Observable } from 'rxjs';
export declare function getFileList(path: string): Observable<string>;
export declare function checkDir(path: string): Observable<boolean>;
export declare function globFiles(pattern: string): Observable<string>;
