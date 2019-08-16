export interface FileSystemService {
	readFile(path: string): Promise<string>;
	writeFile(path: string, data: string): Promise<void>;
	moveFile(srcPath: string, outPath: string): Promise<void>;
}
