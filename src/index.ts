import { MainService } from './core/main-service';

export * from './core/main-service';
export * from './core/string-transformer';

const mainService = new MainService();
export const multiReplace = mainService.multiReplace.bind(mainService);
