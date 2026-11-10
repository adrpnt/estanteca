import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type EmptyStateProps = {
  title: ReactNode
  description?: ReactNode
  /** Normalmente um Button `primary`. */
  action?: ReactNode
  /** Troca o desenho; `false` remove. */
  illustration?: ReactNode | false
  level?: 2 | 3 | 4
  className?: string
}

const GHOST = 'fill-none stroke-line-strong stroke-[1.5] [stroke-dasharray:3_3]'

function ShelfArt() {
  return (
    <svg viewBox="0 0 160 96" width={160} height={96} className="block h-auto w-40 max-w-full">
      <rect className={GHOST} x={84} y={36} width={16} height={48} rx={2} />
      <rect className={GHOST} x={104} y={44} width={14} height={40} rx={2} />
      <rect className={GHOST} x={122} y={32} width={18} height={52} rx={2} />
      <rect
        className="fill-surface-raised stroke-line-strong stroke-[1.5]"
        x={24}
        y={32}
        width={18}
        height={52}
        rx={2}
      />
      <rect
        className="fill-accent"
        x={54}
        y={40}
        width={14}
        height={44}
        rx={2}
        transform="rotate(-16 54 84)"
      />
      <rect className="fill-line-strong" x={12} y={84} width={136} height={5} rx={1} />
    </svg>
  )
}

export function EmptyState({
  title,
  description,
  action,
  illustration,
  level = 2,
  className,
}: EmptyStateProps) {
  const Heading = `h${level}` as const
  const art = illustration === false ? null : (illustration ?? <ShelfArt />)

  return (
    <div className={cn('flex flex-col items-center gap-2 px-6 py-12 text-center', className)}>
      {art && (
        <div aria-hidden="true" className="mb-2">
          {art}
        </div>
      )}
      <Heading className="m-0 font-sans text-base leading-6 font-semibold text-balance text-ink">
        {title}
      </Heading>
      {description && (
        <p className="m-0 max-w-[44ch] font-sans text-[15px] leading-[22px] text-pretty text-ink-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-3 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  )
}
