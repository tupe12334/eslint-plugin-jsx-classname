import { ESLintUtils } from '@typescript-eslint/utils'
import { HTML_ELEMENTS } from '../html-elements.js'

type MessageIds = 'missingClassName'

type Options = [
  {
    elements?: string[]
    excludeElements?: string[]
  },
]

/* eslint-disable default/no-hardcoded-urls */
const createRule = ESLintUtils.RuleCreator(
  () =>
    'https://github.com/tupe12334/eslint-plugin-jsx-classname#require-classname'
)
/* eslint-enable default/no-hardcoded-urls */

export const requireClassname = createRule<Options, MessageIds>({
  name: 'require-classname',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require className attribute on HTML elements in JSX and TSX files',
    },
    schema: [
      {
        type: 'object',
        properties: {
          elements: {
            type: 'array',
            items: { type: 'string' },
            description:
              'List of HTML elements that must have className. If not specified, all HTML elements are checked.',
          },
          excludeElements: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of HTML elements to exclude from the check.',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingClassName:
        'HTML element <{{element}}> is missing a className attribute.',
    },
  },
  defaultOptions: [{}],
  create(context) {
    const options =
      context.options[0] !== undefined && context.options[0] !== null
        ? context.options[0]
        : {}
    const allowedElements = options.elements
      ? new Set(options.elements)
      : undefined
    const excludedElements = new Set(
      options.excludeElements !== undefined && options.excludeElements !== null
        ? options.excludeElements
        : []
    )

    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') {
          return
        }

        const elementName = node.name.name

        if (elementName[0] !== elementName[0].toLowerCase()) {
          return
        }

        if (!HTML_ELEMENTS.has(elementName)) {
          return
        }

        if (allowedElements && !allowedElements.has(elementName)) {
          return
        }

        if (excludedElements.has(elementName)) {
          return
        }

        const hasClassName = node.attributes.some(
          attr =>
            attr.type === 'JSXAttribute' &&
            attr.name.type === 'JSXIdentifier' &&
            attr.name.name === 'className'
        )

        if (!hasClassName) {
          context.report({
            node,
            messageId: 'missingClassName',
            data: { element: elementName },
          })
        }
      },
    }
  },
})
