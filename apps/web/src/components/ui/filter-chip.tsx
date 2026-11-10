import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { formatCount } from '@/lib/format'

type FilterChipProps = ComponentProps<'button'> & {
  label: ReactNode
  selected?: boolean
  /** Número de exemplares que o filtro mostra. */
  count?: number
}

export function FilterChip({
  label,
  selected = false,
  count,
  type = 'button',
  className,
  ...props
}: FilterChipProps) {
  return (
    <button
      type={type}
      {...props}
      aria-pressed={selected}
      className={cn(
        'box-border inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-sm border px-3 font-sans text-[13px] leading-none font-medium transition-colors duration-150 ease-out focus-visible:shadow-focus-ring focus-visible:outline-2 focus-visible:outline-transparent',
        selected
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-line-strong bg-surface-raised text-ink hover:bg-[color-mix(in_oklab,var(--color-surface-raised)_90%,var(--color-ink))]',
        className
      )}
    >
      {selected && (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          className="block flex-none"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
      <span>{label}</span>
      {count != null && (
        <span
          className={cn(
            'font-mono text-xs leading-none tabular-nums',
            selected ? 'text-accent' : 'text-ink-muted'
          )}
        >
          {formatCount(count)}
        </span>
      )}
    </button>
  )
}
