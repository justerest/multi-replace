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
			const result = stringTransformer.replace('testText', 'testText', 'text-test');
			expect(result).toBe('textTest');
		});
	});
});
