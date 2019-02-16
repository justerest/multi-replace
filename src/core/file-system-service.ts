import { ensureDir, readdir, readFile, remove, rename, writeFile } from 'fs-extra';
import glob = require('glob');
import { dirname, resolve } from 'path';
import { bindNodeCallback, Observable, of } from 'rxjs';
import { concatMap, filter, map, take } from 'rxjs/operators';

export class FileSystemService {

	glob(sourcePath: string): Observable<string[]> {
		return of(sourcePath, `${sourcePath}/**`).pipe(
			concatMap((pattern) => bindNodeCallback<string, glob.IOptions, string[]>(glob)(pattern, { nodir: true })),
			filter((paths) => !!paths.length),
			map((paths) => paths.map((path) => resolve(path))),
			take(1),
		);
	}

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

	private async removeEmptyDir(path: string): Promise<void> {
		const fileList = await readdir(path);
		if (!fileList.length) {
			await remove(path);
		}
	}

}
