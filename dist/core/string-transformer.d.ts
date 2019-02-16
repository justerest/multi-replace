declare type CaseTransformer = (str: string) => string;
export declare class StringTransformer {
    private caseTransformers;
    constructor(caseTransformers?: CaseTransformer[]);
    replace(sourceString: string, searchValue: string, replaceValue: string): string;
    private getReplaceMap;
}
export {};
