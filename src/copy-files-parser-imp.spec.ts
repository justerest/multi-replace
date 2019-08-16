import { CopyFilesParserImp } from './copy-files-parser-imp';

describe('class CopyFilesParserImp', () => {
	let copyFilesParserImp: CopyFilesParserImp;

	beforeEach(() => {
		copyFilesParserImp = new CopyFilesParserImp({
			writeFile: async () => void 0,
			readFile: async () => '',
			moveFile: async () => void 0,
			copy: async () => void 0,
		});
	});

	it('should be created', () => {
		expect(copyFilesParserImp).toBeTruthy();
	});

	describe('#parse()', () => {
		it('should rename folder', (complete) => {
			expect.assertions(1);
			copyFilesParserImp
				.parse({ paths: ['search-text/search-text'], searchValue: 'search-text', replaceValue: 'replace-text' })
				.subscribe(({ basePath }) => expect(basePath).toBe('search-text/replace-text'), void 0, complete);
		});
	});
});
