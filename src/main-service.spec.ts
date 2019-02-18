import { of } from 'rxjs';

import { resolve } from 'path';
import { FileSystemService } from './file-system-service';
import { MainService } from './main-service';

describe('MainService', () => {
	let mainService: MainService;
	let mockFileService: FileSystemService;

	beforeEach(() => {
		mockFileService = new FileSystemService();
		mockFileService.writeFile = async () => void 0;
		mockFileService.moveFile = async () => void 0;
		mainService = new MainService(void 0, mockFileService);
	});

	it('should be created', () => {
		expect(mainService).toBeTruthy();
	});

	describe('multiReplace', () => {
		it('should replace file text', (complete) => {
			expect.assertions(1);
			mainService.getFilesData = () => of({ basePath: '', srcPath: '', srcText: 'search-text' });
			mainService.multiReplace([], 'search-text', 'replace-text')
				.subscribe((data) => expect(data.outText).toBe('replace-text'), void 0, complete);
		});

		it('should replace file path preserving root part', (complete) => {
			expect.assertions(3);
			mainService.getFilesData = () => of(
				{ basePath: 'search-text', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
				{ basePath: 'search-text/**', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
				{ basePath: 'search-text/search-text.ts', srcPath: 'search-text/search-text.ts', srcText: 'search-text' },
			);
			mainService.multiReplace([], 'search-text', 'replace-text')
				.subscribe((data) => expect(data.outPath).toBe(resolve('search-text/replace-text.ts')), void 0, complete);
		});
	});
});
