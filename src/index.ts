import { MultiReplaceService } from './multi-replace-service';
import { StringTransformerImp } from './string-transformer-imp';

export * from './file-system-service-imp';
export * from './string-transformer-imp';
export * from './multi-replace-service';
export * from './dir-file-path-transformer-imp';
export * from './strict-file-path-transformer-imp';

const multiReplaceService = new MultiReplaceService();
const multiReplaceServiceStrict = new MultiReplaceService(new StringTransformerImp([(str) => str]));

export const multiReplace = multiReplaceService.multiReplace.bind(multiReplaceService);
export const multiReplaceStrict = multiReplaceServiceStrict.multiReplace.bind(multiReplaceServiceStrict);
