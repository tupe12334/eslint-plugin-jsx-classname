# eslint-plugin-jsx-classname

[![CI](https://github.com/tupe12334/eslint-plugin-jsx-classname/actions/workflows/ci.yml/badge.svg)](https://github.com/tupe12334/eslint-plugin-jsx-classname/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/eslint-plugin-jsx-classname.svg)](https://www.npmjs.com/package/eslint-plugin-jsx-classname)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ESLint plugin that requires className attribute on HTML elements in JSX and TSX files.

## Features

- Enforces `className` attribute on all HTML elements in JSX/TSX
- Configurable: target specific elements or exclude elements
- Ignores custom React components (only checks lowercase HTML elements)
- Works with ESLint flat config

## Installation

```bash
pnpm add -D eslint-plugin-jsx-classname
```

## Usage

Add the plugin to your ESLint flat config:

```javascript
import jsxClassname from 'eslint-plugin-jsx-classname'

export default [
  {
    plugins: {
      'jsx-classname': jsxClassname,
    },
    rules: {
      'jsx-classname/require-classname': 'warn',
    },
  },
]
```

### Rule: `require-classname`

Requires `className` attribute on HTML elements in JSX and TSX files.

#### Options

| Option            | Type       | Description                                                                                        |
| ----------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `elements`        | `string[]` | Only check these HTML elements. If not set, all HTML elements are checked.                         |
| `excludeElements` | `string[]` | Exclude these HTML elements from the check.                                                        |
| `ignoreTailwind`  | `boolean`  | When `true`, Tailwind CSS utility classes are not counted as satisfying the className requirement. |

#### Examples

**Default** (all HTML elements must have className):

```jsx
// Valid
<div className="container">content</div>
<span className={styles.text}>text</span>

// Invalid
<div>content</div>
<span>text</span>
```

**With `elements` option** (only check specific elements):

```javascript
rules: {
  'jsx-classname/require-classname': ['warn', { elements: ['div', 'span', 'p'] }]
}
```

**With `excludeElements` option** (skip certain elements):

```javascript
rules: {
  'jsx-classname/require-classname': ['warn', { excludeElements: ['hr', 'br', 'input'] }]
}
```

**With `ignoreTailwind` option** (require non-Tailwind class names):

```javascript
rules: {
  'jsx-classname/require-classname': ['warn', { ignoreTailwind: true }]
}
```

```jsx
// Valid — has a custom class alongside Tailwind utilities
<div className="flex p-4 my-wrapper">content</div>

// Invalid — only Tailwind utility classes
<div className="flex items-center p-4">content</div>
```

## Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm (latest version)

### Setup

```bash
git clone https://github.com/tupe12334/eslint-plugin-jsx-classname.git
cd eslint-plugin-jsx-classname
pnpm install
pnpm build
pnpm test
```

### Available Scripts

| Script               | Description                        |
| -------------------- | ---------------------------------- |
| `pnpm build`         | Build TypeScript                   |
| `pnpm dev`           | Build in watch mode                |
| `pnpm test`          | Run tests                          |
| `pnpm test:watch`    | Run tests in watch mode            |
| `pnpm test:coverage` | Run tests with coverage            |
| `pnpm lint`          | Check code quality                 |
| `pnpm lint:fix`      | Fix linting issues                 |
| `pnpm format`        | Format code                        |
| `pnpm format:check`  | Check formatting                   |
| `pnpm spell`         | Check spelling                     |
| `pnpm knip`          | Find unused files and dependencies |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

[MIT](LICENSE)
