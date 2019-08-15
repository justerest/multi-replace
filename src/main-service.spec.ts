import { of } from 'rxjs';

import { FileSystemService } from './file-system-service';
import { MainService } from './main-service';

describe('class MainService', () => {
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

	describe('method multiReplace', () => {
		it('should replace file text', (complete) => {
			expect.assertions(1);
			mainService.getFilesData = () => of({ basePath: '', srcPath: '', srcText: 'search-text' });
			mainService
				.multiReplace([], 'search-text', 'replace-text')
				.subscribe((data) => expect(data.outText).toBe('replace-text'), void 0, complete);
		});
	});
});
