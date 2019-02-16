import { MultiReplacer } from './core/multi-replacer';

export * from './core/multi-replacer';
export * from './core/string-transformer';

const multiReplacer = new MultiReplacer();
export const multiReplace = multiReplacer.multiReplace.bind(multiReplacer);
