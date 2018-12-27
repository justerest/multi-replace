import { basename, dirname, relative, resolve } from 'path';
import { multiSerialize } from './multi-replace';

export function serializePath({ basePath, srcPath, searchValue }: {
    basePath: string;
    srcPath: string;
    searchValue: string;
}): string {
    const relativePath = relative(basePath, srcPath);
    return relativePath
        ? serializeRelativePath({ basePath, relativePath, searchValue })
        : serializeFilename(srcPath, searchValue);
}

function serializeRelativePath({ basePath, relativePath, searchValue }: {
    basePath: string;
    relativePath: string;
    searchValue: string;
}): string {
    const changedRelativePath = multiSerialize(relativePath, searchValue);
    return resolve(basePath, changedRelativePath);
}

function serializeFilename(srcPath: string, searchValue: string): string {
    const filename = basename(srcPath);
    const dir = dirname(srcPath);
    const changedFilename = multiSerialize(filename, searchValue);
    return resolve(dir, changedFilename);
}
