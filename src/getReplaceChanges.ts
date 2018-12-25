import { readFile } from 'fs-extra';
import { from, Observable } from 'rxjs';
import { mergeSet, set, setAll } from 'rxjs-set-operators';
import { filter } from 'rxjs/operators';
import { multiReplaceFilename } from './multiReplaceFilename';
import { getFileList } from './utils/getFileList';

export function getReplaceChanges(paths: string[], replace: (str: string) => string): Observable<{
    srcFilePath: string;
    outFilePath: string;
    srcText: string;
    outText: string;
}> {
    return from(paths).pipe(
        setAll('path'),
        mergeSet('srcFilePath', ({ path }) => getFileList(path)),
        set('outFilePath', ({ path, srcFilePath }) => multiReplaceFilename(path, srcFilePath, replace)),
        mergeSet('srcText', ({ srcFilePath }) => readFile(srcFilePath, 'UTF-8')),
        set('outText', ({ srcText }) => replace(srcText)),
        filter(({ outText, srcText, srcFilePath, outFilePath }) => outText !== srcText || srcFilePath !== outFilePath),
    );
}
