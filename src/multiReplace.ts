import { camelCase, kebabCase, snakeCase } from 'lodash';
import { pascalCase } from './utils/pascalCase';

const uniquePlaceholder = '__unique-multiReplace-placeholder__';

export function multiReplace(str: string, searchValue: string, replaceValue: string): string {
    return multiDeserialize(multiSerialize(str, searchValue), replaceValue);
}

function multiSerialize(str: string, searchValue: string) {
    return str
        .replace(new RegExp(camelCase(searchValue), 'g'), camelCase(uniquePlaceholder))
        .replace(new RegExp(kebabCase(searchValue), 'g'), kebabCase(uniquePlaceholder))
        .replace(new RegExp(pascalCase(searchValue), 'g'), pascalCase(uniquePlaceholder))
        .replace(new RegExp(snakeCase(searchValue), 'g'), snakeCase(uniquePlaceholder))
        .replace(new RegExp(snakeCase(searchValue).toUpperCase(), 'g'), snakeCase(uniquePlaceholder).toUpperCase());
}

function multiDeserialize(str: string, replaceValue: string): string {
    return str
        .replace(new RegExp(camelCase(uniquePlaceholder), 'g'), camelCase(replaceValue))
        .replace(new RegExp(kebabCase(uniquePlaceholder), 'g'), kebabCase(replaceValue))
        .replace(new RegExp(pascalCase(uniquePlaceholder), 'g'), pascalCase(replaceValue))
        .replace(new RegExp(snakeCase(uniquePlaceholder), 'g'), snakeCase(replaceValue))
        .replace(new RegExp(snakeCase(uniquePlaceholder).toUpperCase(), 'g'), snakeCase(replaceValue).toUpperCase());
}
