import { resolve } from 'path';

import { StrictFilePathTransformer } from './strict-file-path-transformer';

describe('class StrictFilePathTransformer', () => {
	let strictFilePathTransformer: StrictFilePathTransformer;

	beforeEach(() => {
		strictFilePathTransformer = new StrictFilePathTransformer();
	});

	it('should be created', () => {
		expect(strictFilePathTransformer).toBeTruthy();
	});

	describe('#replace()', () => {
		it('should replace file path preserving root part', () => {
			const data = [
				{ basePath: 'search-text', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
				{ basePath: 'search-text/**', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
				{ basePath: 'search-text/search-text.ts', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
			];
			data.forEach(({ basePath, srcPath }) => {
				const result = strictFilePathTransformer.replace({
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
