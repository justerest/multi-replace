import { camelCase, kebabCase, snakeCase } from 'lodash';
import { pascalCase } from './utils/pascalCase';

export function multiReplace(str: string, searchValue: string, replaceValue: string): string {
    return str
        .replace(new RegExp(kebabCase(searchValue), 'g'), kebabCase(replaceValue))
        .replace(new RegExp(snakeCase(searchValue), 'g'), snakeCase(replaceValue))
        .replace(new RegExp(camelCase(searchValue), 'g'), camelCase(replaceValue))
        .replace(new RegExp(pascalCase(searchValue), 'g'), pascalCase(replaceValue));
}
