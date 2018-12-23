import { ensureDir, readdir, readFile, remove, rename, writeFile } from 'fs-extra';
import { dirname, relative, resolve } from 'path';
import { from, of } from 'rxjs';
import { mergeSet, set, setAll } from 'rxjs-set-operators';
import { catchError, filter, mergeMap } from 'rxjs/operators';
import { multiReplace } from './multiReplace';
import { globFiles } from './utils/globFiles';

export function multiReplaceFiles(paths: string[], searchValue: string, replaceValue: string) {
    return from(paths).pipe(
        setAll('catalog'),
        mergeSet('srcFilePath', ({ catalog }) => globFiles(`${catalog}/**`)),
        set('outFilePath', ({ catalog, srcFilePath }) => resolveOutFilePath(catalog, srcFilePath, searchValue, replaceValue)),
        mergeMap((state) => of(state).pipe(
            mergeSet('text', ({ srcFilePath }) => readFile(srcFilePath, 'UTF-8')),
            set('changedText', ({ text }) => multiReplace(text, searchValue, replaceValue)),
            filter(({ changedText, text, srcFilePath, outFilePath }) => changedText !== text || srcFilePath !== outFilePath),
            mergeSet('isSuccess', ({ srcFilePath, outFilePath, changedText }) => changeFile(srcFilePath, outFilePath, changedText)),
            catchError(() => of({ ...state, isSuccess: false })),
        )),
    );
}

async function changeFile(srcFilePath: string, outFilePath: string, data: string): Promise<true> {
    await writeFile(srcFilePath, data);
    await moveFile(srcFilePath, outFilePath);
    return true;
}

function resolveOutFilePath(catalog: string, srcFilePath: string, searchValue: string, replaceValue: string) {
    const relativePath = relative(catalog, srcFilePath);
    const changedRelativePath = multiReplace(relativePath, searchValue, replaceValue);
    return resolve(catalog, changedRelativePath);
}

async function moveFile(srcFilePath: string, outFilePath: string) {
    await ensureDir(dirname(outFilePath));
    await rename(srcFilePath, outFilePath);
    await removeEmptyDir(dirname(srcFilePath));
}

async function removeEmptyDir(path: string) {
    const fileList = await readdir(path);
    if (!fileList.length) {
        await remove(path);
    }
}
