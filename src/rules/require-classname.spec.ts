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

    // ignoreTailwind: valid cases (has at least one non-Tailwind class)
    {
      code: '<div className="flex p-4 my-wrapper" />',
      options: [{ ignoreTailwind: true }],
    },
    {
      code: '<div className="my-wrapper" />',
      options: [{ ignoreTailwind: true }],
    },
    {
      code: '<div className="flex items-center my-custom-class" />',
      options: [{ ignoreTailwind: true }],
    },
    {
      code: '<span className="text-lg font-bold page-title" />',
      options: [{ ignoreTailwind: true }],
    },
    // Expression values are not checked (dynamic className)
    {
      code: '<div className={styles.wrapper} />',
      options: [{ ignoreTailwind: true }],
    },
    // When ignoreTailwind is false/not set, Tailwind-only classes still pass
    {
      code: '<div className="flex p-4" />',
    },
    {
      code: '<div className="flex p-4" />',
      options: [{ ignoreTailwind: false }],
    },
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

    // ignoreTailwind: invalid cases (only Tailwind classes)
    {
      code: '<div className="flex p-4" />',
      options: [{ ignoreTailwind: true }],
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<div className="flex items-center justify-between" />',
      options: [{ ignoreTailwind: true }],
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<span className="text-lg font-bold text-red-500" />',
      options: [{ ignoreTailwind: true }],
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<p className="mt-4 mb-2 px-6" />',
      options: [{ ignoreTailwind: true }],
      errors: [{ messageId: 'missingClassName' }],
    },
    {
      code: '<div className="hover:bg-blue-500 sm:flex md:grid" />',
      options: [{ ignoreTailwind: true }],
      errors: [{ messageId: 'missingClassName' }],
    },
    // No className at all with ignoreTailwind
    {
      code: '<div />',
      options: [{ ignoreTailwind: true }],
      errors: [{ messageId: 'missingClassName' }],
    },
    // Empty className string with ignoreTailwind
    {
      code: '<div className="" />',
      options: [{ ignoreTailwind: true }],
      errors: [{ messageId: 'missingClassName' }],
    },
    // Common Tailwind patterns: responsive, shadows, rounded, borders
    {
      code: '<div className="w-full h-screen bg-white shadow-lg rounded-md border border-gray-200" />',
      options: [{ ignoreTailwind: true }],
      errors: [{ messageId: 'missingClassName' }],
    },
  ],
})
