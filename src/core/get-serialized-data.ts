import { readFile } from 'fs-extra';
import { from, Observable } from 'rxjs';
import { mergeSet, set, setAll } from 'rxjs-set-operators';
import { filter } from 'rxjs/operators';

import { filterUnique } from '../utils/filter-unique';
import { getFileList } from './get-file-list';
import { multiSerialize } from './multi-replace';
import { multiSerializePath } from './multi-replace-path';

export function getSerializedData({ paths, searchValue }: {
    paths: string[];
    searchValue: string;
}): Observable<{
    srcPath: string;
    srcText: string;
    serializedPath: string;
    serializedText: string;
}> {
    return from(paths).pipe(
        setAll('basePath'),
        mergeSet('srcPath', ({ basePath }) => getFileList(basePath)),
        filterUnique(({ srcPath }) => srcPath),
        mergeSet('srcText', ({ srcPath }) => readFile(srcPath, 'UTF-8')),
        set('serializedPath', ({ basePath, srcPath }) => multiSerializePath({ basePath, srcPath, searchValue })),
        set('serializedText', ({ srcText }) => multiSerialize(srcText, searchValue)),
        filter(({ srcText, serializedText, srcPath, serializedPath }) => srcText !== serializedText || srcPath !== serializedPath),
    );
}