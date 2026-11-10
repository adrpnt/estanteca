import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { formatCount, progress } from '@/lib/format'

type ProgressBarProps = {
  label?: ReactNode
  /** Página atual, com `total`, para progresso de leitura. */
  current?: number
  total?: number
  /** 0 a 100, quando não há páginas. */
  value?: number
  className?: string
}

export function ProgressBar({ label, current = 0, total, value, className }: ProgressBarProps) {
  const labelId = useId()
  const byPages = total != null && total > 0
  const pct = byPages ? progress(current, total) : progress(value ?? 0, 100)
  const pages = byPages ? `${formatCount(current)} de ${formatCount(total)}` : null

  return (
    <div className={cn('grid min-w-0 gap-1.5', className)}>
      <div className="flex items-baseline justify-between gap-3">
        {label ? (
          <span
            id={labelId}
            className="min-w-0 font-sans text-[13px] leading-[18px] font-medium text-ink"
          >
            {label}
          </span>
        ) : (
          <span />
        )}
        <span
          aria-hidden="true"
          className="font-mono text-xs leading-[18px] whitespace-nowrap text-ink-muted tabular-nums"
        >
          {pages ? `p. ${pages} · ${pct}%` : `${pct}%`}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={pages ? `Página ${pages}, ${pct}%` : `${pct}%`}
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : 'Progresso'}
        className="h-1.5 overflow-hidden rounded-full bg-line"
      >
        <span
          className="block h-full rounded-[inherit] bg-accent transition-[width] duration-200 ease-out motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
