"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const file_system_service_imp_1 = require("../file-system-service-imp");
const filename_transformer_imp_1 = require("../filename-transformers/filename-transformer-imp");
const string_transformer_imp_1 = require("../string-transformer-imp");
const files_parser_imp_1 = require("./files-parser-imp");
class CopyFilesParserImp extends files_parser_imp_1.FilesParserImp {
    constructor(fileSystemService = new file_system_service_imp_1.FileSystemServiceImp(), stringTransformer = new string_transformer_imp_1.StringTransformerImp(), filenameTransformer = new filename_transformer_imp_1.FilenameTransformerImp(stringTransformer)) {
        super(fileSystemService);
        this.filenameTransformer = filenameTransformer;
    }
    parse({ paths, searchValue, replaceValue }) {
        return rxjs_1.from(paths).pipe(rxjs_set_operators_1.setAll('sourcePath'), rxjs_set_operators_1.set('destPath', ({ sourcePath }) => this.filenameTransformer.replace({ basePath: sourcePath, srcPath: sourcePath, searchValue, replaceValue })), rxjs_set_operators_1.set('destPath', ({ sourcePath, destPath }) => (sourcePath !== destPath ? destPath : `${sourcePath} copy`)), rxjs_set_operators_1.mergeTap(({ sourcePath, destPath }) => this.fileSystemService.copy(sourcePath, destPath)), operators_1.mergeMap(({ destPath }) => this.parsePath(destPath)));
    }
}
exports.CopyFilesParserImp = CopyFilesParserImp;
