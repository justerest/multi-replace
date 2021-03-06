"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const filename_transformer_imp_1 = require("./filename-transformer-imp");
class DirFilenameTransformerImp extends filename_transformer_imp_1.FilenameTransformerImp {
    replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }) {
        const dir = path_1.dirname(basePath.replace(/\**$/, ''));
        const relativePath = path_1.relative(dir, srcPath);
        const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
        return path_1.resolve(dir, path);
    }
}
exports.DirFilenameTransformerImp = DirFilenameTransformerImp;
