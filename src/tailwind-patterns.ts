import { twMerge } from 'tailwind-merge'

export function isTailwindClass(className: string): boolean {
  return twMerge(className + ' ' + className) === className
}
