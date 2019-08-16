import { copy, ensureDir, readdir, readFile, remove, rename, writeFile } from 'fs-extra';
import { dirname } from 'path';

import { FileSystemService } from './models/file-system-service';

export class FileSystemServiceImp implements FileSystemService {
	async readFile(path: string): Promise<string> {
		return readFile(path, 'UTF-8');
	}

	async writeFile(path: string, data: string): Promise<void> {
		await writeFile(path, data);
	}

	async moveFile(srcPath: string, outPath: string): Promise<void> {
		await ensureDir(dirname(outPath));
		await rename(srcPath, outPath);
		await this.removeEmptyDir(dirname(srcPath));
	}

	async copy(src: string, dest: string): Promise<void> {
		await copy(src, dest);
	}

	private async removeEmptyDir(path: string): Promise<void> {
		const fileList = await readdir(path);
		if (!fileList.length) {
			await remove(path);
		}
	}
}
