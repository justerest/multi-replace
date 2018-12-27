import { readFile } from 'fs-extra';
import { from, Observable } from 'rxjs';
import { mergeSet, set, setAll } from 'rxjs-set-operators';
import { filter } from 'rxjs/operators';
import { getFileList } from './get-file-list';
import { multiReplace } from './multi-replace';
import { replacePath } from './replace-path';

export function getReplaceChanges({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}): Observable<{
    srcFilePath: string;
    srcText: string;
    outFilePath: string;
    outText: string;
}> {
    const replace = (str: string) => multiReplace({ str, searchValue, replaceValue });
    return from(paths).pipe(
        setAll('basePath'),
        mergeSet('srcFilePath', ({ basePath }) => getFileList(basePath)),
        mergeSet('srcText', ({ srcFilePath }) => readFile(srcFilePath, 'UTF-8')),
        set('outFilePath', ({ basePath, srcFilePath }) => replacePath({ basePath, srcFilePath, replace })),
        set('outText', ({ srcText }) => replace(srcText)),
        filter(({ srcText, outText, srcFilePath, outFilePath }) => srcText !== outText || srcFilePath !== outFilePath),
    );
}
