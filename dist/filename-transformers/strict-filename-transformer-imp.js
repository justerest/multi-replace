"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filename_transformer_imp_1 = require("./filename-transformer-imp");
class StrictFilenameTransformerImp extends filename_transformer_imp_1.FilenameTransformerImp {
    replaceAbsolutePath({ srcPath }) {
        return srcPath;
    }
}
exports.StrictFilenameTransformerImp = StrictFilenameTransformerImp;
