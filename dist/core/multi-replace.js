"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constant_case_1 = require("../utils/constant-case");
const pascal_case_1 = require("../utils/pascal-case");
var CasePlaceholder;
(function (CasePlaceholder) {
    CasePlaceholder["camel"] = "14310915-ce31-4c2c-8deb-348232e0a673";
    CasePlaceholder["constant"] = "728d5b35-c881-4ba4-b0d6-cbda4b87d7fc";
    CasePlaceholder["kebab"] = "7dca1ca3-9c3c-4e4f-8f61-7df382b48613";
    CasePlaceholder["pascal"] = "1fb71c48-a763-42a9-ba15-70a5de671683";
    CasePlaceholder["snake"] = "24b32717-ce6c-4a8e-ba2c-89db206d290f";
})(CasePlaceholder = exports.CasePlaceholder || (exports.CasePlaceholder = {}));
exports.anyCasePlaceholderPattern = Object.values(CasePlaceholder).join('|');
function multiReplace({ str, searchValue, replaceValue }) {
    const serializedStr = multiSerialize(str, searchValue);
    return multiDeserialize(serializedStr, replaceValue);
}
exports.multiReplace = multiReplace;
function multiSerialize(str, searchValue) {
    return str
        .replace(new RegExp(lodash_1.camelCase(searchValue), 'g'), CasePlaceholder.camel)
        .replace(new RegExp(constant_case_1.constantCase(searchValue), 'g'), CasePlaceholder.constant)
        .replace(new RegExp(lodash_1.kebabCase(searchValue), 'g'), CasePlaceholder.kebab)
        .replace(new RegExp(pascal_case_1.pascalCase(searchValue), 'g'), CasePlaceholder.pascal)
        .replace(new RegExp(lodash_1.snakeCase(searchValue), 'g'), CasePlaceholder.snake);
}
exports.multiSerialize = multiSerialize;
function multiDeserialize(str, replaceValue) {
    return str
        .replace(new RegExp(CasePlaceholder.camel, 'g'), lodash_1.camelCase(replaceValue))
        .replace(new RegExp(CasePlaceholder.constant, 'g'), constant_case_1.constantCase(replaceValue))
        .replace(new RegExp(CasePlaceholder.kebab, 'g'), lodash_1.kebabCase(replaceValue))
        .replace(new RegExp(CasePlaceholder.pascal, 'g'), pascal_case_1.pascalCase(replaceValue))
        .replace(new RegExp(CasePlaceholder.snake, 'g'), lodash_1.snakeCase(replaceValue));
}
exports.multiDeserialize = multiDeserialize;
function deserializePath(serializedPath, replacePathValue) {
    return serializedPath.replace(new RegExp(exports.anyCasePlaceholderPattern, 'g'), replacePathValue);
}
exports.deserializePath = deserializePath;
function deserializePaths(serializedStr, replaceValue) {
    return serializedStr.replace(new RegExp(`/(${exports.anyCasePlaceholderPattern})`, 'g'), `/${replaceValue}`);
}
exports.deserializePaths = deserializePaths;
function isInCase(replaceValue) {
    return new RegExp(exports.anyCasePlaceholderPattern).test(multiSerialize(replaceValue, replaceValue));
}
exports.isInCase = isInCase;
