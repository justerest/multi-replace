import { writeFile } from 'fs-extra';
import { concat, Observable } from 'rxjs';
import { mergeSet } from 'rxjs-set-operators';
import { filter, shareReplay } from 'rxjs/operators';
import { getReplaceChanges } from './get-replace-changes';
import { moveFile } from './move-file';
import { toBoolean } from './utils/to-boolean';

export function multiReplaceFiles({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}): Observable<{
    srcFilePath: string;
    srcText: string;
    outFilePath: string;
    outText: string;
    isSuccess: boolean;
}> {
    const changes$ = getReplaceChanges({ paths, searchValue, replaceValue }).pipe(shareReplay());

    const textChanges$ = changes$.pipe(
        filter(({ srcFilePath, outFilePath }) => srcFilePath !== outFilePath),
        mergeSet('isSuccess', ({ outText, srcFilePath }) => toBoolean(writeFile(srcFilePath, outText))),
    );

    const filePathChanges$ = changes$.pipe(
        filter(({ srcText, outText }) => srcText !== outText),
        mergeSet('isSuccess', ({ srcFilePath, outFilePath }) => toBoolean(moveFile(srcFilePath, outFilePath))),
    );

    return concat(textChanges$, filePathChanges$);
}
