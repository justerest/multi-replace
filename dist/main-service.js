"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const file_system_service_1 = require("./file-system-service");
const strict_file_path_transformer_1 = require("./strict-file-path-transformer");
const string_transformer_1 = require("./string-transformer");
const filter_unique_rxjs_pipe_1 = require("./utils/filter-unique.rxjs-pipe");
class MainService {
    constructor(stringTransformer = new string_transformer_1.StringTransformer(), fileSystemService = new file_system_service_1.FileSystemService(), filePathTransformer = new strict_file_path_transformer_1.StrictFilePathTransformer(stringTransformer)) {
        this.stringTransformer = stringTransformer;
        this.fileSystemService = fileSystemService;
        this.filePathTransformer = filePathTransformer;
    }
    multiReplace(paths, searchValue, replaceValue) {
        return this.getFilesData(paths).pipe(rxjs_set_operators_1.set('outText', ({ srcText }) => this.stringTransformer.replace(srcText, searchValue, replaceValue)), rxjs_set_operators_1.set('outPath', ({ basePath, srcPath }) => this.filePathTransformer.replace({ basePath, srcPath, searchValue, replaceValue })), operators_1.filter((fileData) => this.hasFileChanges(fileData)), rxjs_set_operators_1.mergeTap(({ srcPath, outText }) => this.fileSystemService.writeFile(srcPath, outText)), rxjs_set_operators_1.mergeTap(({ srcPath, outPath }) => this.fileSystemService.moveFile(srcPath, outPath)));
    }
    getFilesData(paths) {
        return rxjs_1.from(paths).pipe(rxjs_set_operators_1.setAll('basePath'), rxjs_set_operators_1.mergeSet('srcPath', ({ basePath }) => this.fileSystemService.glob(basePath).pipe(operators_1.mergeAll())), filter_unique_rxjs_pipe_1.filterUnique(({ srcPath }) => srcPath), rxjs_set_operators_1.mergeSet('srcText', ({ srcPath }) => this.fileSystemService.readFile(srcPath)));
    }
    hasFileChanges({ srcText, outText, srcPath, outPath }) {
        return srcText !== outText || srcPath !== outPath;
    }
}
exports.MainService = MainService;
