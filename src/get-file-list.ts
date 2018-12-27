import { lstat, pathExists } from 'fs-extra';
import glob = require('glob');
import { resolve } from 'path';
import { bindNodeCallback, defer, Observable } from 'rxjs';
import { map, mergeAll, mergeMap } from 'rxjs/operators';

export function getFileList(path: string) {
    return checkDir(path).pipe(map((isDir) => isDir ? path + '/**' : path), mergeMap(globFiles));
}

function checkDir(path: string): Observable<boolean> {
    return defer(async () => await pathExists(path) && (await lstat(path)).isDirectory());
}

function globFiles(pattern: string): Observable<string> {
    const glob$ = bindNodeCallback<string, glob.IOptions, string[]>(glob);
    return glob$(pattern, { nodir: true }).pipe(mergeAll(), map((path) => resolve(path)));
}
