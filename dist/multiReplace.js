"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constantCase_1 = require("./utils/constantCase");
const pascalCase_1 = require("./utils/pascalCase");
// TODO: search alternative way without placeholder
const uniquePlaceholder = 'uNiqUe';
function multiReplace(str, searchValue, replaceValue) {
    return multiDeserialize(multiSerialize(str, searchValue), replaceValue);
}
exports.multiReplace = multiReplace;
function multiSerialize(str, searchValue) {
    return str
        .replace(new RegExp(lodash_1.camelCase(searchValue), 'g'), lodash_1.camelCase(uniquePlaceholder))
        .replace(new RegExp(lodash_1.kebabCase(searchValue), 'g'), lodash_1.kebabCase(uniquePlaceholder))
        .replace(new RegExp(pascalCase_1.pascalCase(searchValue), 'g'), pascalCase_1.pascalCase(uniquePlaceholder))
        .replace(new RegExp(lodash_1.snakeCase(searchValue), 'g'), lodash_1.snakeCase(uniquePlaceholder))
        .replace(new RegExp(constantCase_1.constantCase(searchValue), 'g'), constantCase_1.constantCase(uniquePlaceholder));
}
function multiDeserialize(str, replaceValue) {
    return str
        .replace(new RegExp(lodash_1.camelCase(uniquePlaceholder), 'g'), lodash_1.camelCase(replaceValue))
        .replace(new RegExp(lodash_1.kebabCase(uniquePlaceholder), 'g'), lodash_1.kebabCase(replaceValue))
        .replace(new RegExp(pascalCase_1.pascalCase(uniquePlaceholder), 'g'), pascalCase_1.pascalCase(replaceValue))
        .replace(new RegExp(lodash_1.snakeCase(uniquePlaceholder), 'g'), lodash_1.snakeCase(replaceValue))
        .replace(new RegExp(constantCase_1.constantCase(uniquePlaceholder), 'g'), constantCase_1.constantCase(replaceValue));
}
