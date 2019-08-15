"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const main_service_1 = require("./main-service");
const string_transformer_1 = require("./string-transformer");
__export(require("./file-system-service"));
__export(require("./string-transformer"));
__export(require("./main-service"));
__export(require("./dir-file-path-transformer"));
__export(require("./strict-file-path-transformer"));
const mainService = new main_service_1.MainService();
const mainServiceStrict = new main_service_1.MainService(new string_transformer_1.StringTransformer([(str) => str]));
exports.multiReplace = mainService.multiReplace.bind(mainService);
exports.multiReplaceStrict = mainServiceStrict.multiReplace.bind(mainServiceStrict);
