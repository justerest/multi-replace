"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function pascalCase(str) {
    const cameloString = lodash_1.camelCase(str);
    const firstChar = (cameloString[0] || '').toUpperCase();
    return firstChar + cameloString.substring(1);
}
exports.pascalCase = pascalCase;
