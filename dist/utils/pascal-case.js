"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function pascalCase(str) {
    return lodash_1.upperFirst(lodash_1.camelCase(str));
}
exports.pascalCase = pascalCase;
