import { ESLintUtils } from '@typescript-eslint/utils'
import { HTML_ELEMENTS } from '../html-elements.js'
import { isTailwindClass } from '../tailwind-patterns.js'
import { requireClassnameSchema } from './require-classname-schema.js'

type MessageIds = 'missingClassName'
type Options = [
  { elements?: string[]; excludeElements?: string[]; ignoreTailwind?: boolean },
]

/* eslint-disable default/no-hardcoded-urls */
const createRule = ESLintUtils.RuleCreator(
  () =>
    'https://github.com/tupe12334/eslint-plugin-jsx-classname#require-classname'
)
/* eslint-enable default/no-hardcoded-urls */

function hasOnlyTailwindClasses(value: string): boolean {
  const classes = value.split(/\s+/).filter(c => c.length > 0)
  return classes.length === 0 || classes.every(c => isTailwindClass(c))
}

export const requireClassname = createRule<Options, MessageIds>({
  name: 'require-classname',
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require className attribute on HTML elements in JSX and TSX files',
    },
    schema: requireClassnameSchema,
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
    const ignoreTailwind = options.ignoreTailwind === true

    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier') return

        const elementName = node.name.name
        if (elementName[0] !== elementName[0].toLowerCase()) return
        if (!HTML_ELEMENTS.has(elementName)) return
        if (allowedElements && !allowedElements.has(elementName)) return
        if (excludedElements.has(elementName)) return

        const classNameAttr = node.attributes.find(
          attr =>
            attr.type === 'JSXAttribute' &&
            attr.name.type === 'JSXIdentifier' &&
            attr.name.name === 'className'
        )

        const report = () =>
          context.report({
            node,
            messageId: 'missingClassName',
            data: { element: elementName },
          })

        if (!classNameAttr) return report()
        if (!ignoreTailwind) return

        if (
          classNameAttr.type !== 'JSXAttribute' ||
          !classNameAttr.value ||
          classNameAttr.value.type !== 'Literal' ||
          typeof classNameAttr.value.value !== 'string'
        ) {
          return
        }

        if (hasOnlyTailwindClasses(classNameAttr.value.value)) report()
      },
    }
  },
})
