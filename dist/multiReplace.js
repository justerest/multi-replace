"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const pascalCase_1 = require("./utils/pascalCase");
function multiReplace(str, searchValue, replaceValue) {
    return str
        .replace(new RegExp(lodash_1.kebabCase(searchValue), 'g'), lodash_1.kebabCase(replaceValue))
        .replace(new RegExp(lodash_1.snakeCase(searchValue), 'g'), lodash_1.snakeCase(replaceValue))
        .replace(new RegExp(lodash_1.camelCase(searchValue), 'g'), lodash_1.camelCase(replaceValue))
        .replace(new RegExp(pascalCase_1.pascalCase(searchValue), 'g'), pascalCase_1.pascalCase(replaceValue));
}
exports.multiReplace = multiReplace;
