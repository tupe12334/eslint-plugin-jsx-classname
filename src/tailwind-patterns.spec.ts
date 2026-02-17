import { describe, expect, it } from 'vitest'
import { isTailwindClass } from './tailwind-patterns.js'

describe('isTailwindClass', () => {
  describe('layout utilities', () => {
    it.each([
      'block',
      'inline-block',
      'inline',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'hidden',
      'contents',
      'table',
      'table-row',
      'flow-root',
      'list-item',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('positioning', () => {
    it.each([
      'static',
      'fixed',
      'absolute',
      'relative',
      'sticky',
      'top-0',
      'right-4',
      'bottom-2',
      'left-0',
      'inset-0',
      'inset-x-0',
      'z-10',
      'z-50',
      '-top-1',
      '-z-10',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('spacing', () => {
    it.each([
      'p-4',
      'px-6',
      'py-2',
      'pt-1',
      'pr-3',
      'pb-8',
      'pl-0',
      'm-4',
      'mx-auto',
      'my-2',
      'mt-6',
      'mr-0',
      'mb-4',
      'ml-2',
      '-m-1',
      '-mt-2',
      'space-x-4',
      'space-y-2',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('sizing', () => {
    it.each([
      'w-full',
      'w-1/2',
      'w-screen',
      'w-64',
      'h-10',
      'h-screen',
      'h-full',
      'min-w-0',
      'max-w-lg',
      'min-h-screen',
      'max-h-96',
      'size-4',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('typography', () => {
    it.each([
      'text-sm',
      'text-lg',
      'text-xl',
      'text-red-500',
      'text-center',
      'font-bold',
      'font-sans',
      'leading-tight',
      'tracking-wide',
      'uppercase',
      'lowercase',
      'capitalize',
      'truncate',
      'italic',
      'not-italic',
      'underline',
      'line-through',
      'no-underline',
      'antialiased',
      'list-disc',
      'list-decimal',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('backgrounds', () => {
    it.each([
      'bg-white',
      'bg-red-500',
      'bg-transparent',
      'bg-gradient-to-r',
      'bg-cover',
      'bg-center',
      'bg-no-repeat',
      'from-blue-500',
      'via-purple-500',
      'to-pink-500',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('borders', () => {
    it.each([
      'border',
      'border-2',
      'border-t',
      'border-red-500',
      'border-solid',
      'border-dashed',
      'rounded',
      'rounded-lg',
      'rounded-full',
      'rounded-t-lg',
      'ring-2',
      'ring-blue-500',
      'ring-offset-2',
      'outline-none',
      'divide-y',
      'divide-gray-200',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('effects', () => {
    it.each([
      'shadow',
      'shadow-lg',
      'shadow-md',
      'shadow-none',
      'opacity-50',
      'opacity-0',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('flexbox and grid', () => {
    it.each([
      'flex-row',
      'flex-col',
      'flex-wrap',
      'flex-nowrap',
      'flex-1',
      'flex-auto',
      'flex-none',
      'items-center',
      'items-start',
      'items-end',
      'justify-center',
      'justify-between',
      'justify-start',
      'self-auto',
      'self-center',
      'gap-4',
      'gap-x-2',
      'gap-y-6',
      'grid-cols-3',
      'col-span-2',
      'row-span-full',
      'order-1',
      'order-first',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('transitions and animations', () => {
    it.each([
      'transition',
      'transition-all',
      'transition-colors',
      'duration-300',
      'ease-in-out',
      'ease-in',
      'delay-150',
      'animate-spin',
      'animate-pulse',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('transforms', () => {
    it.each([
      'scale-95',
      'scale-100',
      'rotate-45',
      '-rotate-90',
      'translate-x-4',
      '-translate-y-1/2',
      'origin-center',
      'transform',
      'transform-gpu',
      'transform-none',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('filters', () => {
    it.each([
      'blur',
      'blur-sm',
      'brightness-50',
      'contrast-125',
      'grayscale',
      'invert',
      'saturate-150',
      'sepia',
      'backdrop-blur',
      'backdrop-blur-sm',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('interactivity', () => {
    it.each([
      'cursor-pointer',
      'cursor-not-allowed',
      'select-none',
      'select-all',
      'resize',
      'pointer-events-none',
      'appearance-none',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('accessibility', () => {
    it.each(['sr-only', 'not-sr-only'])(
      'detects "%s" as Tailwind',
      className => {
        expect(isTailwindClass(className)).toBe(true)
      }
    )
  })

  describe('responsive/state variants', () => {
    it.each([
      'sm:flex',
      'md:grid',
      'lg:hidden',
      'xl:block',
      '2xl:inline',
      'hover:bg-blue-500',
      'focus:ring-2',
      'active:bg-blue-700',
      'dark:bg-gray-800',
      'focus-visible:outline-none',
      'sm:hover:bg-red-500',
      'disabled:opacity-50',
      'first:mt-0',
      'last:mb-0',
      'group-hover:text-white',
    ])('detects "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(true)
    })
  })

  describe('SVG', () => {
    it.each(['fill-current', 'stroke-current', 'stroke-2'])(
      'detects "%s" as Tailwind',
      className => {
        expect(isTailwindClass(className)).toBe(true)
      }
    )
  })

  describe('aspect ratio', () => {
    it.each(['aspect-auto', 'aspect-square', 'aspect-video'])(
      'detects "%s" as Tailwind',
      className => {
        expect(isTailwindClass(className)).toBe(true)
      }
    )
  })

  describe('non-Tailwind classes', () => {
    it.each([
      'my-wrapper',
      'page-title',
      'sidebar',
      'header-nav',
      'card-container',
      'btn-primary',
      'modal-overlay',
      'app',
      'content-area',
      'nav-link',
      'footer-section',
      'custom-class',
    ])('does NOT detect "%s" as Tailwind', className => {
      expect(isTailwindClass(className)).toBe(false)
    })
  })
})
