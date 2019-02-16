import { of } from 'rxjs';

import { FileSystemService } from './file-system-service';
import { MultiReplacer } from './multi-replacer';

describe('MultiReplacer', () => {
	let multiReplacer: MultiReplacer;
	let mockFileService: FileSystemService;

	beforeEach(() => {
		mockFileService = new FileSystemService();
		mockFileService.writeFile = async () => void 0;
		mockFileService.moveFile = async () => void 0;
		multiReplacer = new MultiReplacer(void 0, mockFileService);
	});

	it('should be created', () => {
		expect(multiReplacer).toBeTruthy();
	});

	describe('multiReplace method', () => {
		it('should replace preserving cases', (complete) => {
			expect.assertions(1);
			multiReplacer.getFilesData = () => of({ basePath: 'core', srcPath: 'core/asd.ts', srcText: 'testText' });
			multiReplacer.multiReplace([], 'testText', 'text-test')
				.subscribe((data) => expect(data.outText).toBe('textTest'), void 0, complete);
		});
	});
});
