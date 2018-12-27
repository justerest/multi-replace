"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
async function moveFile(srcPath, outPath) {
    await fs_extra_1.ensureDir(path_1.dirname(outPath));
    await fs_extra_1.rename(srcPath, outPath);
    await removeEmptyDir(path_1.dirname(srcPath));
}
exports.moveFile = moveFile;
async function removeEmptyDir(path) {
    const fileList = await fs_extra_1.readdir(path);
    if (!fileList.length) {
        await fs_extra_1.remove(path);
    }
}
