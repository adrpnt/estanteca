import { Children, useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { formatBooks } from '@/lib/format'

type ShelfProps = {
  title: ReactNode
  description?: ReactNode
  /** Total da estante, quando a prateleira mostra só parte. */
  count?: number
  action?: ReactNode
  headingLevel?: 2 | 3 | 4
  children: ReactNode
  className?: string
}

export function Shelf({
  title,
  description,
  count,
  action,
  headingLevel = 2,
  children,
  className,
}: ShelfProps) {
  const headingId = useId()
  const Heading = `h${headingLevel}` as const
  const total = count ?? Children.count(children)
  const name = typeof title === 'string' ? title : 'estante'

  return (
    <section aria-labelledby={headingId} className={cn('grid min-w-0 gap-3', className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <Heading
            id={headingId}
            className="m-0 font-sans text-base leading-6 font-semibold text-ink"
          >
            {title}
          </Heading>
          {description && (
            <p className="mt-0.5 mb-0 max-w-[60ch] font-sans text-[13px] leading-[18px] text-ink-muted">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs leading-[18px] whitespace-nowrap text-ink-muted tabular-nums">
            {formatBooks(total)}
          </span>
          {action}
        </div>
      </div>
      <div
        role="region"
        aria-label={`Livros da estante ${name}`}
        tabIndex={0}
        className="snap-x snap-proximity overflow-x-auto overscroll-x-contain rounded-sm pb-3 [scrollbar-width:thin] focus-visible:shadow-focus-ring focus-visible:outline-2 focus-visible:outline-transparent"
      >
        <ul className="m-0 box-border flex w-max min-w-full list-none items-end gap-3 border-b-6 border-line px-4 pt-4 pb-0">
          {Children.map(children, (child) => (
            <li className="flex snap-start">{child}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
