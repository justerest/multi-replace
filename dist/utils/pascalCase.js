"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function pascalCase(str) {
    const camelString = lodash_1.camelCase(str);
    const firstChar = (camelString[0] || '').toUpperCase();
    return firstChar + camelString.substring(1);
}
exports.pascalCase = pascalCase;
