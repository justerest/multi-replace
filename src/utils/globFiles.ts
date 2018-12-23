import glob = require('glob');
import { resolve } from 'path';
import { bindNodeCallback, Observable } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';

export function globFiles(pattern: string): Observable<string> {
    const glob$ = bindNodeCallback<string, glob.IOptions, string[]>(glob);
    return glob$(pattern, { nodir: true }).pipe(mergeAll(), map((path) => resolve(path)));
}
