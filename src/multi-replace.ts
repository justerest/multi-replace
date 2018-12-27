import { camelCase, kebabCase, snakeCase } from 'lodash';
import { constantCase } from './utils/constant-case';
import { pascalCase } from './utils/pascal-case';

enum CasePlaceholder {
    camel = '14310915-ce31-4c2c-8deb-348232e0a673',
    constant = '728d5b35-c881-4ba4-b0d6-cbda4b87d7fc',
    kebab = '7dca1ca3-9c3c-4e4f-8f61-7df382b48613',
    pascal = '1fb71c48-a763-42a9-ba15-70a5de671683',
    snake = '24b32717-ce6c-4a8e-ba2c-89db206d290f',
}

export function multiReplace({ str, searchValue, replaceValue }: {
    str: string;
    searchValue: string;
    replaceValue: string;
}): string {
    const serializedStr = multiSerialize(str, searchValue);
    return multiDeserialize(serializedStr, replaceValue);
}

function multiSerialize(str: string, searchValue: string) {
    return str
        .replace(new RegExp(camelCase(searchValue), 'g'), CasePlaceholder.camel)
        .replace(new RegExp(constantCase(searchValue), 'g'), CasePlaceholder.constant)
        .replace(new RegExp(kebabCase(searchValue), 'g'), CasePlaceholder.kebab)
        .replace(new RegExp(pascalCase(searchValue), 'g'), CasePlaceholder.pascal)
        .replace(new RegExp(snakeCase(searchValue), 'g'), CasePlaceholder.snake);
}

function multiDeserialize(str: string, replaceValue: string): string {
    return str
        .replace(new RegExp(CasePlaceholder.camel, 'g'), camelCase(replaceValue))
        .replace(new RegExp(CasePlaceholder.constant, 'g'), constantCase(replaceValue))
        .replace(new RegExp(CasePlaceholder.kebab, 'g'), kebabCase(replaceValue))
        .replace(new RegExp(CasePlaceholder.pascal, 'g'), pascalCase(replaceValue))
        .replace(new RegExp(CasePlaceholder.snake, 'g'), snakeCase(replaceValue));
}
