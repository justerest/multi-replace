import { readFile } from 'fs-extra';
import { from, Observable } from 'rxjs';
import { mergeSet, set, setAll } from 'rxjs-set-operators';
import { filter } from 'rxjs/operators';
import { getFileList } from './get-file-list';
import { multiSerialize } from './multi-replace';
import { serializePath } from './serialize-path';

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
        mergeSet('srcText', ({ srcPath }) => readFile(srcPath, 'UTF-8')),
        set('serializedPath', ({ basePath, srcPath }) => serializePath({ basePath, srcPath, searchValue })),
        set('serializedText', ({ srcText }) => multiSerialize(srcText, searchValue)),
        filter(({ srcText, serializedText, srcPath, serializedPath }) => srcText !== serializedText || srcPath !== serializedPath),
    );
}
