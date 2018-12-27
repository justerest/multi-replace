import { writeFile } from 'fs-extra';
import { kebabCase } from 'lodash';
import { concat, Observable } from 'rxjs';
import { mergeSet, set } from 'rxjs-set-operators';
import { filter, shareReplay } from 'rxjs/operators';
import { toBoolean } from '../utils/to-boolean';
import { getSerializedData } from './get-serialized-data';
import { moveFile } from './move-file';
import { deserializePath, deserializePaths, isInCase, multiDeserialize } from './multi-replace';

export function multiReplaceFiles({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}): Observable<{
    srcPath: string;
    srcText: string;
    isSuccess: boolean;
    outPath?: string;
    outText?: string;
}> {
    if (!isInCase(replaceValue)) {
        replaceValue = kebabCase(replaceValue);
    }

    const changes$ = getSerializedData({ paths, searchValue }).pipe(shareReplay());

    const textChanges$ = changes$.pipe(
        filter(({ srcText, serializedText }) => srcText !== serializedText),
        set('serializedText', ({ serializedText }) => deserializePaths(serializedText, replaceValue)),
        set('outText', ({ serializedText }) => multiDeserialize(serializedText, replaceValue)),
        mergeSet('isSuccess', ({ outText, srcPath }) => toBoolean(writeFile(srcPath, outText))),
    );

    const filePathChanges$ = changes$.pipe(
        filter(({ srcPath, serializedPath }) => srcPath !== serializedPath),
        set('outPath', ({ serializedPath }) => deserializePath(serializedPath, replaceValue)),
        mergeSet('isSuccess', ({ srcPath, outPath }) => toBoolean(moveFile(srcPath, outPath))),
    );

    return concat(textChanges$, filePathChanges$);
}
