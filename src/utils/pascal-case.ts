import { camelCase } from 'lodash';

export function pascalCase(str: string): string {
	const cameloString = camelCase(str);
	const firstChar = (cameloString[0] || '').toUpperCase();
	return firstChar + cameloString.substring(1);
}
