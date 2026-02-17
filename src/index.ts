import { requireClassname } from './rules/require-classname.js'

const plugin: {
  meta: { name: string; version: string }
  rules: Record<string, unknown>
  configs: Record<string, unknown>
} = {
  meta: {
    name: 'eslint-plugin-jsx-classname',
    version: '0.0.0',
  },
  rules: {
    'require-classname': requireClassname,
  },
  configs: {},
}

plugin.configs.recommended = {
  plugins: {
    'jsx-classname': plugin,
  },
  rules: {
    'jsx-classname/require-classname': 'warn',
  },
}

plugin.configs.strict = {
  plugins: {
    'jsx-classname': plugin,
  },
  rules: {
    'jsx-classname/require-classname': ['error', { ignoreTailwind: true }],
  },
}

export default plugin
