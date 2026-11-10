'use client'

import { useSyncExternalStore, type ComponentProps } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'

type SearchTriggerProps = ComponentProps<'button'> & {
  placeholder?: string
}

function subscribe() {
  return () => {}
}

function readIsMac(): boolean {
  return /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
}

function serverIsMac(): boolean {
  return false
}

/** Botão com cara de campo que abre a busca global. */
export function SearchTrigger({
  placeholder = 'Buscar título, autor ou ISBN',
  type = 'button',
  className,
  ...props
}: SearchTriggerProps) {
  const isMac = useSyncExternalStore(subscribe, readIsMac, serverIsMac)

  return (
    <button
      type={type}
      aria-keyshortcuts="Meta+K Control+K"
      {...props}
      className={cn(
        'box-border flex h-10 w-full max-w-[420px] cursor-pointer items-center gap-2 rounded-sm border border-line-strong bg-surface-raised pr-2 pl-3 text-left font-sans text-[15px] leading-none text-ink-muted hover:border-ink-muted focus-visible:shadow-focus-ring focus-visible:outline-2 focus-visible:outline-transparent max-[480px]:w-10 max-[480px]:justify-center max-[480px]:p-0',
        className
      )}
    >
      <Search size={18} strokeWidth={1.5} aria-hidden="true" focusable="false" />
      <span className="min-w-0 flex-1 truncate max-[480px]:sr-only">{placeholder}</span>
      <kbd
        aria-hidden="true"
        className="box-border inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[4px] border border-line bg-surface px-1.5 font-mono text-xs leading-none font-medium text-ink-muted max-[480px]:hidden"
      >
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  )
}
