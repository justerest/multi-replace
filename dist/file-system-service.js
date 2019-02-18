"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const glob = require("glob");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class FileSystemService {
    glob(sourcePath) {
        return rxjs_1.of(sourcePath, `${sourcePath}/**`).pipe(operators_1.concatMap((pattern) => rxjs_1.bindNodeCallback(glob)(pattern, { nodir: true })), operators_1.filter((paths) => !!paths.length), operators_1.map((paths) => paths.map((path) => path_1.resolve(path))), operators_1.take(1));
    }
    async readFile(path) {
        return fs_extra_1.readFile(path, 'UTF-8');
    }
    async writeFile(path, data) {
        await fs_extra_1.writeFile(path, data);
    }
    async moveFile(srcPath, outPath) {
        await fs_extra_1.ensureDir(path_1.dirname(outPath));
        await fs_extra_1.rename(srcPath, outPath);
        await this.removeEmptyDir(path_1.dirname(srcPath));
    }
    async removeEmptyDir(path) {
        const fileList = await fs_extra_1.readdir(path);
        if (!fileList.length) {
            await fs_extra_1.remove(path);
        }
    }
}
exports.FileSystemService = FileSystemService;
