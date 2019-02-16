"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const multi_replacer_1 = require("./core/multi-replacer");
__export(require("./core/multi-replacer"));
__export(require("./core/string-transformer"));
const multiReplacer = new multi_replacer_1.MultiReplacer();
exports.multiReplace = multiReplacer.multiReplace.bind(multiReplacer);
