import { basename, dirname, relative, resolve } from 'path';

export function multiReplaceFilename(path: string, srcFilePath: string, replace: (str: string) => string): string {
    const relativePath = relative(path, srcFilePath);
    if (relativePath) {
        const changedRelativePath = replace(relativePath);
        return resolve(path, changedRelativePath);
    }
    const filename = basename(path);
    return resolve(dirname(path), replace(filename));
}
