"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const file_system_service_imp_1 = require("../file-system-service-imp");
const filter_unique_rxjs_pipe_1 = require("../utils/filter-unique.rxjs-pipe");
class FilesParserImp {
    constructor(fileSystemService = new file_system_service_imp_1.FileSystemServiceImp()) {
        this.fileSystemService = fileSystemService;
    }
    parse({ paths }) {
        return rxjs_1.from(paths).pipe(operators_1.mergeMap((path) => this.parsePath(path)));
    }
    parsePath(path) {
        return rxjs_1.of({ basePath: path }).pipe(rxjs_set_operators_1.mergeSet('srcPath', ({ basePath }) => this.getFilesAtFolder(basePath)), filter_unique_rxjs_pipe_1.filterUnique(({ srcPath }) => srcPath), rxjs_set_operators_1.mergeSet('srcText', ({ srcPath }) => this.fileSystemService.readFile(srcPath)));
    }
    getFilesAtFolder(path) {
        return this.fileSystemService.getFilesAtFolder(path).pipe(operators_1.mergeAll());
    }
}
exports.FilesParserImp = FilesParserImp;
