import { camelCase, kebabCase, snakeCase } from 'lodash';

import { angularCase } from './utils/angular-case';
import { constantCase } from './utils/constant-case';
import { pascalCase } from './utils/pascal-case';

type CaseTransformer = (str: string) => string;

export class StringTransformer {

	constructor(
		private caseTransformers: CaseTransformer[] = [
			angularCase,
			constantCase,
			kebabCase,
			pascalCase,
			snakeCase,
			camelCase,
		],
	) { }

	replace(sourceString: string, searchValue: string, replaceValue: string): string {
		const searchValues = this.caseTransformers.map((transform) => transform(searchValue));
		const replaceValues = this.caseTransformers.map((transform) => transform(replaceValue));
		const replaceMap = this.getReplaceMap(searchValues, replaceValues);
		const regExp = new RegExp(searchValues.join('|'), 'g');
		return sourceString.replace(regExp, (matched) => matched in replaceMap ? replaceMap[matched] : matched);
	}

	private getReplaceMap(searchValues: string[], replaceValues: string[]): { [s: string]: string; } {
		return searchValues.reduce((acc, value, index) => {
			acc[value] = replaceValues[index];
			return acc;
		}, {} as { [s: string]: string; });
	}

}
