import { basename, dirname, relative, resolve } from 'path';

import { DirFilePathTransformer } from './dir-file-path-transformer';

describe('class DirFilePathTransformer', () => {
	let dirFilePathTransformer: DirFilePathTransformer;

	beforeEach(() => {
		dirFilePathTransformer = new DirFilePathTransformer();
	});

	it('should be created', () => {
		expect(dirFilePathTransformer).toBeTruthy();
	});

	describe('#replace()', () => {
		xit('learn', () => {
			expect(dirname('a/b/c.ts')).toBe('a/b');
		});

		xit('learn', () => {
			expect(dirname(dirname('a/b/c.ts'))).toBe('a');
		});

		xit('learn', () => {
			expect(basename('a/b')).toBe('b');
		});

		it('should replace absolute file path preserving dir', () => {
			const result = dirFilePathTransformer.replace({
				basePath: 'search-text/search-text/search-text.ts',
				srcPath: 'search-text/search-text/search-text.ts',
				searchValue: 'search-text',
				replaceValue: 'replace-text',
			});
			expect(result).toBe(resolve('search-text/search-text/replace-text.ts'));
		});

		it('should replace file path with first dir', () => {
			const result = dirFilePathTransformer.replace({
				basePath: 'search-text/search-text',
				srcPath: 'search-text/search-text/search-text.ts',
				searchValue: 'search-text',
				replaceValue: 'replace-text',
			});
			expect(result).toBe(resolve('search-text/replace-text/replace-text.ts'));
		});

		it('should replace file path with first dir', () => {
			const result = dirFilePathTransformer.replace({
				basePath: 'search-text/search-text/**',
				srcPath: 'search-text/search-text/search-text.ts',
				searchValue: 'search-text',
				replaceValue: 'replace-text',
			});
			expect(result).toBe(resolve('search-text/replace-text/replace-text.ts'));
		});

		it('should replace file path with first dir', () => {
			const result = dirFilePathTransformer.replace({
				basePath: 'search-text/search-text',
				srcPath: 'search-text/search-text/search-text.ts',
				searchValue: 'search-text',
				replaceValue: 'replace-text',
			});
			expect(result).toBe(resolve('search-text/replace-text/replace-text.ts'));
		});

		it('should replace file path with first dir', () => {
			const result = dirFilePathTransformer.replace({
				basePath: 'search-text',
				srcPath: 'search-text/search-text/search-text.ts',
				searchValue: 'search-text',
				replaceValue: 'replace-text',
			});
			expect(result).toBe(resolve('replace-text/replace-text/replace-text.ts'));
		});
	});
});
