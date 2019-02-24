"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const angular_case_1 = require("./utils/angular-case");
const constant_case_1 = require("./utils/constant-case");
const pascal_case_1 = require("./utils/pascal-case");
class StringTransformer {
    constructor(caseTransformers = [
        angular_case_1.angularCase,
        lodash_1.camelCase,
        constant_case_1.constantCase,
        lodash_1.kebabCase,
        pascal_case_1.pascalCase,
        lodash_1.snakeCase,
    ], defaultTransformer = lodash_1.camelCase) {
        this.caseTransformers = caseTransformers;
        this.defaultTransformer = defaultTransformer;
        this.setDefaultTransformer();
    }
    replace(sourceString, searchValue, replaceValue) {
        const replaceMap = this.getReplaceMap(searchValue, replaceValue);
        const regExp = new RegExp(Object.keys(replaceMap).join('|'), 'g');
        return sourceString.replace(regExp, (matched) => matched in replaceMap ? replaceMap[matched] : matched);
    }
    getReplaceMap(searchValue, replaceValue) {
        const searchValues = this.caseTransformers.map((transform) => transform(searchValue));
        const replaceValues = this.caseTransformers.map((transform) => transform(replaceValue));
        return searchValues.reduce((acc, value, index) => {
            acc[value] = replaceValues[index];
            return acc;
        }, {});
    }
    setDefaultTransformer() {
        this.caseTransformers.sort((transformer) => transformer === this.defaultTransformer ? 1 : -1);
    }
}
exports.StringTransformer = StringTransformer;
