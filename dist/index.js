"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const copy_files_parser_imp_1 = require("./copy-files-parser-imp");
const dir_file_path_transformer_imp_1 = require("./dir-file-path-transformer-imp");
const multi_replace_service_1 = require("./multi-replace-service");
const string_transformer_imp_1 = require("./string-transformer-imp");
__export(require("./file-system-service-imp"));
__export(require("./string-transformer-imp"));
__export(require("./multi-replace-service"));
__export(require("./dir-file-path-transformer-imp"));
__export(require("./strict-file-path-transformer-imp"));
__export(require("./files-parser-imp"));
__export(require("./copy-files-parser-imp"));
const multiReplaceService = new multi_replace_service_1.MultiReplaceService();
const multiReplaceCopyService = new multi_replace_service_1.MultiReplaceService(void 0, void 0, void 0, new copy_files_parser_imp_1.CopyFilesParserImp());
const multiReplaceWithFolderService = new multi_replace_service_1.MultiReplaceService(void 0, void 0, new dir_file_path_transformer_imp_1.DirFilePathTransformerImp());
const multiReplaceServiceStrict = new multi_replace_service_1.MultiReplaceService(new string_transformer_imp_1.StringTransformerImp([(str) => str]));
exports.multiReplace = multiReplaceService.multiReplace.bind(multiReplaceService);
exports.multiReplaceCopy = multiReplaceCopyService.multiReplace.bind(multiReplaceCopyService);
exports.multiReplaceWithFolder = multiReplaceWithFolderService.multiReplace.bind(multiReplaceWithFolderService);
exports.multiReplaceStrict = multiReplaceServiceStrict.multiReplace.bind(multiReplaceServiceStrict);
