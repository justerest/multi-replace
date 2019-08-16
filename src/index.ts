import { CopyFilesParserImp } from './copy-files-parser-imp';
import { DirFilePathTransformerImp } from './dir-file-path-transformer-imp';
import { MultiReplaceService } from './multi-replace-service';
import { StringTransformerImp } from './string-transformer-imp';

export * from './models/file-path-transformer';
export * from './models/file-system-service';
export * from './models/files-parser';
export * from './models/multi-replace-params';
export * from './models/string-transformer';

export * from './file-system-service-imp';
export * from './string-transformer-imp';
export * from './multi-replace-service';
export * from './dir-file-path-transformer-imp';
export * from './strict-file-path-transformer-imp';
export * from './files-parser-imp';
export * from './copy-files-parser-imp';

const multiReplaceService = new MultiReplaceService();
const multiReplaceCopyService = new MultiReplaceService(void 0, void 0, void 0, new CopyFilesParserImp());
const multiReplaceWithFolderService = new MultiReplaceService(void 0, void 0, new DirFilePathTransformerImp());
const multiReplaceServiceStrict = new MultiReplaceService(new StringTransformerImp([(str) => str]));

export const multiReplace = multiReplaceService.multiReplace.bind(multiReplaceService);
export const multiReplaceCopy = multiReplaceCopyService.multiReplace.bind(multiReplaceCopyService);
export const multiReplaceWithFolder = multiReplaceWithFolderService.multiReplace.bind(multiReplaceWithFolderService);
export const multiReplaceStrict = multiReplaceServiceStrict.multiReplace.bind(multiReplaceServiceStrict);
