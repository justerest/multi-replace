"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const to_boolean_1 = require("../utils/to-boolean");
const get_serialized_data_1 = require("./get-serialized-data");
const move_file_1 = require("./move-file");
const multi_replace_1 = require("./multi-replace");
const multi_replace_path_1 = require("./multi-replace-path");
function multiReplaceFiles({ paths, searchValue, replaceValue }) {
    if (!multi_replace_1.isInCase(replaceValue)) {
        replaceValue = lodash_1.kebabCase(replaceValue);
    }
    const changes$ = get_serialized_data_1.getSerializedData({ paths, searchValue }).pipe(operators_1.shareReplay());
    const textChanges$ = changes$.pipe(operators_1.filter(({ srcText, serializedText }) => srcText !== serializedText), rxjs_set_operators_1.set('serializedText', ({ serializedText }) => multi_replace_path_1.multiDeserializePaths(serializedText, replaceValue)), rxjs_set_operators_1.set('outText', ({ serializedText }) => multi_replace_1.multiDeserialize(serializedText, replaceValue)), rxjs_set_operators_1.mergeSet('isSuccess', ({ outText, srcPath }) => to_boolean_1.toBoolean(fs_extra_1.writeFile(srcPath, outText))));
    const filePathChanges$ = changes$.pipe(operators_1.filter(({ srcPath, serializedPath }) => srcPath !== serializedPath), rxjs_set_operators_1.set('outPath', ({ serializedPath }) => multi_replace_path_1.multiDeserializePath(serializedPath, replaceValue)), rxjs_set_operators_1.mergeSet('isSuccess', ({ srcPath, outPath }) => to_boolean_1.toBoolean(move_file_1.moveFile(srcPath, outPath))));
    return rxjs_1.concat(textChanges$, filePathChanges$);
}
exports.multiReplaceFiles = multiReplaceFiles;
