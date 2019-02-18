"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const rxjs_set_operators_1 = require("rxjs-set-operators");
const operators_1 = require("rxjs/operators");
const file_system_service_1 = require("./file-system-service");
const string_transformer_1 = require("./string-transformer");
const filter_unique_rxjs_pipe_1 = require("./utils/filter-unique.rxjs-pipe");
class MainService {
    constructor(stringTransformer = new string_transformer_1.StringTransformer(), fileSystemService = new file_system_service_1.FileSystemService()) {
        this.stringTransformer = stringTransformer;
        this.fileSystemService = fileSystemService;
    }
    multiReplace(paths, searchValue, replaceValue) {
        return this.getFilesData(paths).pipe(rxjs_set_operators_1.set('outText', ({ srcText }) => this.stringTransformer.replace(srcText, searchValue, replaceValue)), rxjs_set_operators_1.set('outPath', (fileData) => this.replacePath(fileData, searchValue, replaceValue)), operators_1.filter((fileData) => this.hasFileChanges(fileData)), rxjs_set_operators_1.mergeTap(({ srcPath, outText }) => this.fileSystemService.writeFile(srcPath, outText)), rxjs_set_operators_1.mergeTap(({ srcPath, outPath }) => this.fileSystemService.moveFile(srcPath, outPath)));
    }
    getFilesData(paths) {
        return rxjs_1.from(paths).pipe(rxjs_set_operators_1.setAll('basePath'), rxjs_set_operators_1.mergeSet('srcPath', ({ basePath }) => this.fileSystemService.glob(basePath).pipe(operators_1.mergeAll())), filter_unique_rxjs_pipe_1.filterUnique(({ srcPath }) => srcPath), rxjs_set_operators_1.mergeSet('srcText', ({ srcPath }) => this.fileSystemService.readFile(srcPath)));
    }
    replacePath(fileData, searchValue, replaceValue) {
        const { srcPath, basePath } = fileData;
        const relativePath = path_1.relative(basePath, srcPath);
        if (relativePath) {
            const path = this.stringTransformer.replace(relativePath, searchValue, replaceValue);
            return path_1.resolve(basePath, path);
        }
        const filename = path_1.basename(srcPath);
        const dir = path_1.dirname(srcPath);
        const changedFilename = this.stringTransformer.replace(filename, searchValue, replaceValue);
        return path_1.resolve(dir, changedFilename);
    }
    hasFileChanges({ srcText, outText, srcPath, outPath }) {
        return srcText !== outText || srcPath !== outPath;
    }
}
exports.MainService = MainService;
const mainService = new MainService();
exports.multiReplace = mainService.multiReplace.bind(mainService);
