"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_set_operators_1 = require("rxjs-set-operators");
const file_system_service_imp_1 = require("./file-system-service-imp");
const filename_transformer_imp_1 = require("./filename-transformers/filename-transformer-imp");
const files_parser_imp_1 = require("./files-parsers/files-parser-imp");
const string_transformer_imp_1 = require("./string-transformer-imp");
class MultiReplaceService {
    constructor(stringTransformer = new string_transformer_imp_1.StringTransformerImp(), fileSystemService = new file_system_service_imp_1.FileSystemServiceImp(), filenameTransformer = new filename_transformer_imp_1.FilenameTransformerImp(stringTransformer), filesParser = new files_parser_imp_1.FilesParserImp(fileSystemService)) {
        this.stringTransformer = stringTransformer;
        this.fileSystemService = fileSystemService;
        this.filenameTransformer = filenameTransformer;
        this.filesParser = filesParser;
    }
    multiReplace({ paths, searchValue, replaceValue }) {
        return this.filesParser.parse({ paths, searchValue, replaceValue }).pipe(rxjs_set_operators_1.set('outText', ({ srcText }) => this.stringTransformer.replace(srcText, searchValue, replaceValue)), rxjs_set_operators_1.set('outPath', ({ basePath, srcPath }) => this.filenameTransformer.replace({ basePath, srcPath, searchValue, replaceValue })), rxjs_set_operators_1.mergeTap(({ srcPath, outText }) => this.fileSystemService.writeFile(srcPath, outText)), rxjs_set_operators_1.mergeTap(({ srcPath, outPath }) => this.fileSystemService.moveFile(srcPath, outPath)));
    }
}
exports.MultiReplaceService = MultiReplaceService;
