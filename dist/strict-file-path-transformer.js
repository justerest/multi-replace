"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const file_path_transformer_1 = require("./file-path-transformer");
class StrictFilePathTransformer extends file_path_transformer_1.FilePathTransformer {
    replaceRelativePath({ basePath, srcPath, searchValue, replaceValue }) {
        const relativePath = path_1.relative(basePath, srcPath);
        const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
        return path_1.resolve(basePath, path);
    }
}
exports.StrictFilePathTransformer = StrictFilePathTransformer;
