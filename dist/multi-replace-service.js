"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const file_system_service_imp_1 = require("./file-system-service-imp");
const files_parser_imp_1 = require("./files-parser-imp");
const strict_file_path_transformer_imp_1 = require("./strict-file-path-transformer-imp");
const string_transformer_imp_1 = require("./string-transformer-imp");
class MultiReplaceService {
    constructor(stringTransformer = new string_transformer_imp_1.StringTransformerImp(), fileSystemService = new file_system_service_imp_1.FileSystemServiceImp(), filePathTransformer = new strict_file_path_transformer_imp_1.StrictFilePathTransformerImp(stringTransformer), filesParser = new files_parser_imp_1.FilesParserImp(fileSystemService)) {
        this.stringTransformer = stringTransformer;
        this.fileSystemService = fileSystemService;
        this.filePathTransformer = filePathTransformer;
        this.filesParser = filesParser;
    }
    multiReplace({ paths, searchValue, replaceValue }) {
        return this.filesParser.parse({ paths, searchValue, replaceValue }).pipe(rxjs_set_operators_1.set('outText', ({ srcText }) => this.stringTransformer.replace(srcText, searchValue, replaceValue)), rxjs_set_operators_1.set('outPath', ({ basePath, srcPath }) => this.filePathTransformer.replace({ basePath, srcPath, searchValue, replaceValue })), operators_1.filter((fileData) => this.hasFileChanges(fileData)), rxjs_set_operators_1.mergeTap(({ srcPath, outText }) => this.fileSystemService.writeFile(srcPath, outText)), rxjs_set_operators_1.mergeTap(({ srcPath, outPath }) => this.fileSystemService.moveFile(srcPath, outPath)));
    }
    hasFileChanges({ srcText, outText, srcPath, outPath }) {
        return srcText !== outText || srcPath !== outPath;
    }
}
exports.MultiReplaceService = MultiReplaceService;
