import { EMPTY, of } from 'rxjs';

import { FileData } from './models/files-parser';
import { MultiReplaceService } from './multi-replace-service';

describe('class MultiReplaceService', () => {
	let multiReplaceService: MultiReplaceService;
	let filesData: FileData;

	beforeEach(() => {
		multiReplaceService = new MultiReplaceService(
			void 0,
			{
				getFilesAtFolder: () => EMPTY,
				writeFile: async () => void 0,
				readFile: async () => '',
				moveFile: async () => void 0,
				copy: async () => void 0,
			},
			void 0,
			{
				parse: () => of(filesData),
			},
		);
	});

	it('should be created', () => {
		expect(multiReplaceService).toBeTruthy();
	});

	describe('method multiReplace', () => {
		it('should replace file text', (complete) => {
			expect.assertions(1);
			filesData = { basePath: '', srcPath: '', srcText: 'search-text' };
			multiReplaceService
				.multiReplace({ paths: [], searchValue: 'search-text', replaceValue: 'replace-text' })
				.subscribe((data) => expect(data.outText).toBe('replace-text'), void 0, complete);
		});
	});
});
