import { requireClassname } from './rules/require-classname.js'

const plugin = {
  meta: {
    name: 'eslint-plugin-jsx-classname',
    version: '0.0.0',
  },
  rules: {
    'require-classname': requireClassname,
  },
}

export default plugin
