"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constant_case_1 = require("../utils/constant-case");
const pascal_case_1 = require("../utils/pascal-case");
class StringTransformer {
    constructor(caseTransformers = [
        lodash_1.camelCase,
        constant_case_1.constantCase,
        lodash_1.kebabCase,
        pascal_case_1.pascalCase,
        lodash_1.snakeCase,
    ]) {
        this.caseTransformers = caseTransformers;
    }
    replace(sourceString, searchValue, replaceValue) {
        const searchValues = this.caseTransformers.map((transform) => transform(searchValue));
        const replaceValues = this.caseTransformers.map((transform) => transform(replaceValue));
        const replaceMap = this.getReplaceMap(searchValues, replaceValues);
        const regExp = new RegExp(searchValues.join('|'), 'g');
        return sourceString.replace(regExp, (matched) => matched in replaceMap ? replaceMap[matched] : matched);
    }
    getReplaceMap(searchValues, replaceValues) {
        return searchValues.reduce((acc, value, index) => {
            acc[value] = replaceValues[index];
            return acc;
        }, {});
    }
}
exports.StringTransformer = StringTransformer;
