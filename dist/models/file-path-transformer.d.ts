export interface FilePathParams {
    basePath: string;
    srcPath: string;
    searchValue: string;
    replaceValue: string;
}
export interface FilePathTransformer {
    replace(filePathParams: FilePathParams): string;
}
