"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function constantCase(str) {
    return lodash_1.snakeCase(str).toUpperCase();
}
exports.constantCase = constantCase;
