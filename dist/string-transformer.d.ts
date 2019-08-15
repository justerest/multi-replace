declare type CaseTransformer = (str: string) => string;
export declare const defaultTransformers: ((string?: string | undefined) => string)[];
export declare class StringTransformer {
    private caseTransformers;
    private defaultTransformer;
    constructor(caseTransformers?: CaseTransformer[], defaultTransformer?: CaseTransformer);
    replace(sourceString: string, searchValue: string, replaceValue: string): string;
    private getReplaceMap;
    private setDefaultTransformer;
}
export {};
