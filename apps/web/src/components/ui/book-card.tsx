import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { BookCover } from './book-cover'
import { StatusChip, type LoanStatus, type ReadingStatus } from './status-chip'

type BookCardProps = {
  title: string
  author?: string
  cover?: string
  href?: string
  /** Linha em Geist Mono: "Impresso · 1899". */
  meta?: ReactNode
  status?: ReadingStatus | LoanStatus
  statusLabel?: string
  /** Cor dominante da capa (hex). Pinta o fundo atrás da capa a 12%. */
  tint?: string
  /** Menu de ações do exemplar; fica acima do link do card. */
  actions?: ReactNode
  layout?: 'grid' | 'list'
  headingLevel?: 2 | 3 | 4
  className?: string
}

export function BookCard({
  title,
  author,
  cover,
  href,
  meta,
  status,
  statusLabel,
  tint,
  actions,
  layout = 'grid',
  headingLevel = 3,
  className,
}: BookCardProps) {
  const grid = layout === 'grid'
  const Heading = `h${headingLevel}` as const
  const chip = status ? (
    <StatusChip status={status} label={statusLabel} className={grid ? 'mt-1' : undefined} />
  ) : null

  return (
    <article
      className={cn(
        'group relative min-w-0',
        grid
          ? 'flex flex-col gap-3'
          : 'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-line px-2 py-3',
        className
      )}
      style={grid && tint ? ({ '--book-tint': tint } as CSSProperties) : undefined}
    >
      <div
        className={cn(
          grid &&
            'flex justify-center rounded-md bg-[color-mix(in_srgb,var(--book-tint,var(--color-surface-raised))_12%,var(--color-surface-raised))] px-4 pt-4 pb-3'
        )}
      >
        <BookCover
          src={cover}
          title={title}
          author={author}
          size={grid ? 'md' : 'xs'}
          className={cn(
            'group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0',
            grid && 'w-full!'
          )}
        />
      </div>
      <div className="flex min-w-0 flex-col items-start gap-1">
        <Heading
          className={cn(
            'm-0 overflow-hidden font-serif font-semibold text-ink',
            grid
              ? 'line-clamp-2 text-[17px] leading-[22px]'
              : 'line-clamp-1 text-base leading-[22px]'
          )}
        >
          {href ? (
            <a
              href={href}
              className={cn(
                "text-inherit no-underline decoration-1 underline-offset-3 after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-none focus-visible:after:shadow-focus-ring",
                grid ? 'after:rounded-md' : 'after:rounded-sm'
              )}
            >
              {title}
            </a>
          ) : (
            title
          )}
        </Heading>
        {author && (
          <p className="m-0 font-sans text-[13px] leading-[18px] font-medium text-ink-muted">
            {author}
          </p>
        )}
        {meta && (
          <p className="m-0 font-mono text-xs leading-[18px] text-ink-muted tabular-nums">{meta}</p>
        )}
        {grid && chip}
      </div>
      {!grid && (chip || actions) && (
        <div className="relative z-1 flex items-center gap-2">
          {chip}
          {actions}
        </div>
      )}
      {grid && actions && <div className="absolute top-2 right-2 z-1">{actions}</div>}
    </article>
  )
}
