import { basename, dirname, relative, resolve } from 'path';
import { anyCasePlaceholderPattern, multiSerialize } from './multi-replace';

export function multiSerializePath({ basePath, srcPath, searchValue }: {
    basePath: string;
    srcPath: string;
    searchValue: string;
}): string {
    const relativePath = relative(basePath, srcPath);
    return relativePath
        ? multiSerializeRelativePath({ basePath, relativePath, searchValue })
        : multiSerializeFilename(srcPath, searchValue);
}

export function multiDeserializePath(serializedPath: string, replacePathValue: string): string {
    return serializedPath.replace(new RegExp(anyCasePlaceholderPattern, 'g'), replacePathValue);
}

export function multiDeserializePaths(serializedStr: string, replaceValue: string): string {
    return serializedStr.replace(new RegExp(`/(${anyCasePlaceholderPattern})`, 'g'), `/${replaceValue}`);
}

function multiSerializeRelativePath({ basePath, relativePath, searchValue }: {
    basePath: string;
    relativePath: string;
    searchValue: string;
}): string {
    const changedRelativePath = multiSerialize(relativePath, searchValue);
    return resolve(basePath, changedRelativePath);
}

function multiSerializeFilename(srcPath: string, searchValue: string): string {
    const filename = basename(srcPath);
    const dir = dirname(srcPath);
    const changedFilename = multiSerialize(filename, searchValue);
    return resolve(dir, changedFilename);
}
