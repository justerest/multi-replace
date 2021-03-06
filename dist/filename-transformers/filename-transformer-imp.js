"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const string_transformer_imp_1 = require("../string-transformer-imp");
class FilenameTransformerImp {
    constructor(stringTransformer = new string_transformer_imp_1.StringTransformerImp()) {
        this.stringTransformer = stringTransformer;
    }
    replace(filePathParams) {
        if (this.isAbsoluteFilePath(filePathParams)) {
            return this.replaceAbsolutePath(filePathParams);
        }
        return this.replaceRelativePath(filePathParams);
    }
    replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }) {
        const relativePath = path_1.relative(basePath, srcPath);
        const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
        return path_1.resolve(basePath, path);
    }
    replaceAbsolutePath({ srcPath, searchValue, replaceValue }) {
        const filename = path_1.basename(srcPath);
        const dir = path_1.dirname(srcPath);
        const changedFilename = this.stringTransformer.replace(filename, searchValue, replaceValue);
        return path_1.resolve(dir, changedFilename);
    }
    isAbsoluteFilePath({ basePath, srcPath }) {
        return !path_1.relative(basePath, srcPath);
    }
}
exports.FilenameTransformerImp = FilenameTransformerImp;
