import { camelCase } from 'lodash';

export function pascalCase(str: string): string {
    const camelString = camelCase(str);
    const firstChar = (camelString[0] || '').toUpperCase();
    return firstChar + camelString.substring(1);
}
