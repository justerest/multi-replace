import { StringTransformer } from './string-transformer';

describe('StringTransformer', () => {
	let stringTransformer: StringTransformer;

	beforeEach(() => {
		stringTransformer = new StringTransformer();
	});

	it('should be created', () => {
		expect(stringTransformer).toBeTruthy();
	});

	describe('replaceText', () => {
		it('should replace preserving cases', () => {
			expect(stringTransformer.replace('searchValue', 'search_value', 'replace-value')).toBe('replaceValue');
		});
	});
});