import { RuleTester } from '@typescript-eslint/utils/ts-eslint'
import { requireClassname } from './require-classname.js'

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
})

ruleTester.run('require-classname', requireClassname, {
  valid: [
    { code: '<div className="foo" />' },
    { code: '<span className="bar">text</span>' },
    { code: '<p className="baz">paragraph</p>' },
    { code: '<CustomComponent />' },
    { code: '<MyButton label="click" />' },
    { code: '<div className={styles.wrapper} />' },
    { code: '<input className="field" type="text" />' },
    {
      code: '<span>text</span>',
      options: [{ elements: ['div', 'p'] }],
    },
    {
      code: '<div className="foo" />',
      options: [{ elements: ['div'] }],
    },
    {
      code: '<hr />',
      options: [{ excludeElements: ['hr'] }],
    },
    {
      code: '<input type="hidden" />',
      options: [{ excludeElements: ['input'] }],
    },
    { code: '<MyComponent />' },
    { code: '<Header title="test" />' },
  ],
  invalid: [
    {
      code: '<div />',
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<span>text</span>',
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<p>paragraph</p>',
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<input type="text" />',
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<button onClick={handler}>click</button>',
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<div />',
      options: [{ elements: ['div', 'p'] }],
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<div />',
      options: [{ excludeElements: ['span'] }],
      errors: [{ messageId: 'missingClassName' }],
    },
  ],
})
