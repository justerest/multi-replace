import { camelCase, kebabCase, snakeCase } from 'lodash';
import { constantCase } from './utils/constantCase';
import { pascalCase } from './utils/pascalCase';

// TODO: search alternative way without placeholder
const uniquePlaceholder = 'uNiqUe';

export function multiReplace(str: string, searchValue: string, replaceValue: string): string {
    return multiDeserialize(multiSerialize(str, searchValue), replaceValue);
}

function multiSerialize(str: string, searchValue: string) {
    return str
        .replace(new RegExp(camelCase(searchValue), 'g'), camelCase(uniquePlaceholder))
        .replace(new RegExp(kebabCase(searchValue), 'g'), kebabCase(uniquePlaceholder))
        .replace(new RegExp(pascalCase(searchValue), 'g'), pascalCase(uniquePlaceholder))
        .replace(new RegExp(snakeCase(searchValue), 'g'), snakeCase(uniquePlaceholder))
        .replace(new RegExp(constantCase(searchValue), 'g'), constantCase(uniquePlaceholder));
}

function multiDeserialize(str: string, replaceValue: string): string {
    return str
        .replace(new RegExp(camelCase(uniquePlaceholder), 'g'), camelCase(replaceValue))
        .replace(new RegExp(kebabCase(uniquePlaceholder), 'g'), kebabCase(replaceValue))
        .replace(new RegExp(pascalCase(uniquePlaceholder), 'g'), pascalCase(replaceValue))
        .replace(new RegExp(snakeCase(uniquePlaceholder), 'g'), snakeCase(replaceValue))
        .replace(new RegExp(constantCase(uniquePlaceholder), 'g'), constantCase(replaceValue));
}
