import { getReplaceChanges } from './getReplaceChanges';
import { multiReplace } from './multiReplace';

export function getMultiReplaceChanges({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}) {
    return getReplaceChanges(paths, (str) => multiReplace(str, searchValue, replaceValue));
}

export function getStrictReplaceChanges({ paths, searchValue, replaceValue }: {
    paths: string[];
    searchValue: string;
    replaceValue: string;
}) {
    return getReplaceChanges(paths, (str) => str.replace(new RegExp(searchValue, 'g'), replaceValue));
}

export { multiReplace } from './multiReplace';
export { moveFile } from './utils/moveFile';
