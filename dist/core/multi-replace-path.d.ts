export declare function multiSerializePath({ basePath, srcPath, searchValue }: {
    basePath: string;
    srcPath: string;
    searchValue: string;
}): string;
export declare function multiDeserializePath(serializedPath: string, replacePathValue: string): string;
export declare function multiDeserializePaths(serializedStr: string, replaceValue: string): string;
