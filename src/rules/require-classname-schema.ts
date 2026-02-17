export const requireClassnameSchema = [
  {
    type: 'object' as const,
    properties: {
      elements: {
        type: 'array' as const,
        items: { type: 'string' as const },
        description:
          'List of HTML elements that must have className. If not specified, all HTML elements are checked.',
      },
      excludeElements: {
        type: 'array' as const,
        items: { type: 'string' as const },
        description: 'List of HTML elements to exclude from the check.',
      },
      ignoreTailwind: {
        type: 'boolean' as const,
        description:
          'When true, Tailwind CSS utility classes are not counted as satisfying the className requirement.',
      },
    },
    additionalProperties: false,
  },
] as const
