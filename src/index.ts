import { MainService } from './main-service';
import { StringTransformer } from './string-transformer';

export * from './file-system-service';
export * from './string-transformer';
export * from './main-service';

const mainService = new MainService();
const mainServiceStrict = new MainService(new StringTransformer([(str) => str]));

export const multiReplace = mainService.multiReplace.bind(mainService);
export const multiReplaceStrict = mainServiceStrict.multiReplace.bind(mainServiceStrict);
