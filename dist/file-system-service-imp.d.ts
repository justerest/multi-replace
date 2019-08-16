import { Observable } from 'rxjs';
import { FileSystemService } from './models/file-system-service';
export declare class FileSystemServiceImp implements FileSystemService {
    getFilesAtFolder(path: string): Observable<string[]>;
    readFile(path: string): Promise<string>;
    writeFile(path: string, data: string): Promise<void>;
    moveFile(srcPath: string, outPath: string): Promise<void>;
    copy(src: string, dest: string): Promise<void>;
    private removeEmptyDir;
}
