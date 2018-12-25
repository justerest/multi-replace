"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getReplaceChanges_1 = require("./getReplaceChanges");
const multiReplace_1 = require("./multiReplace");
var getReplaceChanges_2 = require("./getReplaceChanges");
exports.getReplaceChanges = getReplaceChanges_2.getReplaceChanges;
var multiReplace_2 = require("./multiReplace");
exports.multiReplace = multiReplace_2.multiReplace;
var multiReplaceFilename_1 = require("./multiReplaceFilename");
exports.multiReplaceFilename = multiReplaceFilename_1.multiReplaceFilename;
function getMultiReplaceChanges({ paths, searchValue, replaceValue }) {
    return getReplaceChanges_1.getReplaceChanges(paths, (str) => multiReplace_1.multiReplace(str, searchValue, replaceValue));
}
exports.getMultiReplaceChanges = getMultiReplaceChanges;
function getStrictReplaceChanges({ paths, searchValue, replaceValue }) {
    return getReplaceChanges_1.getReplaceChanges(paths, (str) => str.replace(new RegExp(searchValue, 'g'), replaceValue));
}
exports.getStrictReplaceChanges = getStrictReplaceChanges;
