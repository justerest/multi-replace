import { of } from 'rxjs';

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

	describe('multiReplace method', () => {
		it('should replace preserving cases', (complete) => {
			expect.assertions(1);
			mainService.getFilesData = () => of({ basePath: 'core', srcPath: 'core/asd.ts', srcText: 'testText' });
			mainService.multiReplace([], 'testText', 'text-test')
				.subscribe((data) => expect(data.outText).toBe('textTest'), void 0, complete);
		});
	});
});
