import { ensureDir, readdir, remove, rename } from 'fs-extra';
import { dirname } from 'path';

export async function moveFile(srcPath: string, outPath: string): Promise<void> {
    await ensureDir(dirname(outPath));
    await rename(srcPath, outPath);
    await removeEmptyDir(dirname(srcPath));
}

async function removeEmptyDir(path: string): Promise<void> {
    const fileList = await readdir(path);
    if (!fileList.length) {
        await remove(path);
    }
}
