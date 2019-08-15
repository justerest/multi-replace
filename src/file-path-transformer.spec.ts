import { resolve } from 'path';

import { FilePathTransformer } from './file-path-transformer';

describe('class FilePathTransformer', () => {
	let filePathTransformer: FilePathTransformer;

	beforeEach(() => {
		filePathTransformer = new FilePathTransformer();
	});

	it('should be created', () => {
		expect(filePathTransformer).toBeTruthy();
	});

	describe('#replace()', () => {
		it('should replace file path preserving root part', () => {
			const data = [
				{ basePath: 'search-text', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
				{ basePath: 'search-text/**', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
				{ basePath: 'search-text/search-text.ts', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
			];
			data.forEach(({ basePath, srcPath }) => {
				const result = filePathTransformer.replace({
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
