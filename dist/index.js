"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const main_service_1 = require("./core/main-service");
__export(require("./core/main-service"));
__export(require("./core/string-transformer"));
const mainService = new main_service_1.MainService();
exports.multiReplace = mainService.multiReplace.bind(mainService);
