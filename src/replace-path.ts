import { basename, dirname, relative, resolve } from 'path';

export function replacePath({ basePath, srcFilePath, replace }: {
    basePath: string;
    srcFilePath: string;
    replace: (str: string) => string;
}): string {
    const relativePath = relative(basePath, srcFilePath);
    if (relativePath) {
        const changedRelativePath = replace(relativePath);
        return resolve(basePath, changedRelativePath);
    }
    return replaceFilename(basePath, replace);
}

function replaceFilename(basePath: string, replace: (str: string) => string) {
    const filename = basename(basePath);
    const dir = dirname(basePath);
    const changedFilename = replace(filename);
    return resolve(dir, changedFilename);
}
