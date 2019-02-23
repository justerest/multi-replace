# multi-replace

Replaces text and filenames in the selected catalog preserving cases.

Can be used to rename Angular components.

## Usage

```bash
npm i -g @justerest/multi-replace
multi-replace [--options] <...paths>
```

## Options

| Option         | Alias     | Type          | Description      |
| -------------- | --------- | ------------- | ---------------- |
| --paths        | `default` | `...string[]` | Catalog list     |
| --searchValue  | -s        | `string`      | Search text      |
| --replaceValue | -r        | `string`      | Replacement text |

## Transformers

- camelCase
- kebab-case
- snake_case
- CONSTANT_CASE
- PascalCase
- angular-subject.case (kebab-case-with.suffix)
