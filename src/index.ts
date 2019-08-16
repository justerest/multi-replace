import { CopyFilesParserImp } from './copy-files-parser-imp';
import { MultiReplaceService } from './multi-replace-service';
import { StringTransformerImp } from './string-transformer-imp';

export * from './file-system-service-imp';
export * from './string-transformer-imp';
export * from './multi-replace-service';
export * from './dir-file-path-transformer-imp';
export * from './strict-file-path-transformer-imp';

const multiReplaceService = new MultiReplaceService();
const multiReplaceServiceStrict = new MultiReplaceService(new StringTransformerImp([(str) => str]));
const multiReplaceCopyService = new MultiReplaceService(void 0, void 0, void 0, new CopyFilesParserImp());

export const multiReplace = multiReplaceService.multiReplace.bind(multiReplaceService);
export const multiReplaceStrict = multiReplaceServiceStrict.multiReplace.bind(multiReplaceServiceStrict);
export const multiReplaceCopy = multiReplaceCopyService.multiReplace.bind(multiReplaceCopyService);
