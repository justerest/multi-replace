import { resolve } from 'path';

import { StrictFilePathTransformerImp } from './strict-file-path-transformer-imp';

describe('class StrictFilePathTransformerImp', () => {
	let strictFilePathTransformerImp: StrictFilePathTransformerImp;

	beforeEach(() => {
		strictFilePathTransformerImp = new StrictFilePathTransformerImp();
	});

	it('should be created', () => {
		expect(strictFilePathTransformerImp).toBeTruthy();
	});

	describe('#replace()', () => {
		it('should replace file path preserving root part', () => {
			const data = [
				{ basePath: 'search-text', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
				{ basePath: 'search-text/**', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
				{ basePath: 'search-text/search-text.ts', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
			];
			data.forEach(({ basePath, srcPath }) => {
				const result = strictFilePathTransformerImp.replace({
					basePath,
					srcPath,
					searchValue: 'search-text',
					replaceValue: 'replace-text',
				});
				expect(result).toBe(resolve('search-text/replace-text.ts'));
			});
		});
	});
});
