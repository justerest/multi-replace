import { kebabCase } from 'lodash';

import { StringTransformer } from './string-transformer';

describe('class StringTransformer', () => {
	let stringTransformer: StringTransformer;

	beforeEach(() => {
		stringTransformer = new StringTransformer();
	});

	it('should be created', () => {
		expect(stringTransformer).toBeTruthy();
	});

	describe('method replaceText', () => {
		it('should replace preserving cases', () => {
			expect(stringTransformer.replace('searchValue', 'search_value', 'replace-value')).toBe('replaceValue');
		});

		it('should replace angular case', () => {
			expect(stringTransformer.replace('user.service', 'user service', 'currentUserService')).toBe(
				'current-user.service',
			);
		});

		it('should camelCase if not indetify', () => {
			expect(stringTransformer.replace('user', 'user', 'currentUser')).toBe('currentUser');
		});

		it('should use default transformer if not indetify', () => {
			stringTransformer = new StringTransformer(void 0, kebabCase);
			expect(stringTransformer.replace('user', 'user', 'currentUser')).toBe('current-user');
		});

		it('should replace without preserving case', () => {
			stringTransformer = new StringTransformer([(str) => str]);
			expect(stringTransformer.replace('user', 'user', 'an-animal_case')).toBe('an-animal_case');
		});
	});
});
