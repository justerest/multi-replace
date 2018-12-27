"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const get_replace_changes_1 = require("./get-replace-changes");
const move_file_1 = require("./move-file");
const to_boolean_1 = require("./utils/to-boolean");
function multiReplaceFiles({ paths, searchValue, replaceValue }) {
    const changes$ = get_replace_changes_1.getReplaceChanges({ paths, searchValue, replaceValue }).pipe(operators_1.shareReplay());
    const textChanges$ = changes$.pipe(operators_1.filter(({ srcFilePath, outFilePath }) => srcFilePath !== outFilePath), rxjs_set_operators_1.mergeSet('isSuccess', ({ outText, srcFilePath }) => to_boolean_1.toBoolean(fs_extra_1.writeFile(srcFilePath, outText))));
    const filePathChanges$ = changes$.pipe(operators_1.filter(({ srcText, outText }) => srcText !== outText), rxjs_set_operators_1.mergeSet('isSuccess', ({ srcFilePath, outFilePath }) => to_boolean_1.toBoolean(move_file_1.moveFile(srcFilePath, outFilePath))));
    return rxjs_1.concat(textChanges$, filePathChanges$);
}
exports.multiReplaceFiles = multiReplaceFiles;
