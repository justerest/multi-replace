"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function angularCase(str) {
    return lodash_1.kebabCase(str).replace(/-(?=\w+$)/, '.');
}
exports.angularCase = angularCase;
