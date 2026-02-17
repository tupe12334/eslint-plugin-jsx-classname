import { TAILWIND_REGEX } from './tailwind-regex.js'

export function isTailwindClass(className: string): boolean {
  return TAILWIND_REGEX.test(className)
}
