export declare enum CasePlaceholder {
    camel = "14310915-ce31-4c2c-8deb-348232e0a673",
    constant = "728d5b35-c881-4ba4-b0d6-cbda4b87d7fc",
    kebab = "7dca1ca3-9c3c-4e4f-8f61-7df382b48613",
    pascal = "1fb71c48-a763-42a9-ba15-70a5de671683",
    snake = "24b32717-ce6c-4a8e-ba2c-89db206d290f"
}
export declare const anyCasePlaceholderPattern: string;
export declare function multiReplace({ str, searchValue, replaceValue }: {
    str: string;
    searchValue: string;
    replaceValue: string;
}): string;
export declare function multiSerialize(str: string, searchValue: string): string;
export declare function multiDeserialize(str: string, replaceValue: string): string;
export declare function isInCase(replaceValue: string): boolean;
