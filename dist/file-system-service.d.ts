import { Observable } from 'rxjs';
export declare class FileSystemService {
    glob(sourcePath: string): Observable<string[]>;
    readFile(path: string): Promise<string>;
    writeFile(path: string, data: string): Promise<void>;
    moveFile(srcPath: string, outPath: string): Promise<void>;
    private removeEmptyDir;
}
