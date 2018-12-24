import { readFile } from 'fs-extra';
import { relative, resolve } from 'path';
import { from, Observable } from 'rxjs';
import { mergeSet, set, setAll } from 'rxjs-set-operators';
import { filter } from 'rxjs/operators';
import { globFiles } from './utils/globFiles';

export function getReplaceChanges(paths: string[], replace: (str: string) => string): Observable<{
    srcFilePath: string;
    outFilePath: string;
    srcText: string;
    outText: string;
}> {
    return from(paths).pipe(
        setAll('rootDir'),
        mergeSet('srcFilePath', ({ rootDir }) => globFiles(`${rootDir}/**`)),
        set('outFilePath', ({ rootDir, srcFilePath }) => {
            const relativePath = relative(rootDir, srcFilePath);
            const changedRelativePath = replace(relativePath);
            return resolve(rootDir, changedRelativePath);
        }),
        mergeSet('srcText', ({ srcFilePath }) => readFile(srcFilePath, 'UTF-8')),
        set('outText', ({ srcText }) => replace(srcText)),
        filter(({ outText, srcText, srcFilePath, outFilePath }) => outText !== srcText || srcFilePath !== outFilePath),
    );
}
