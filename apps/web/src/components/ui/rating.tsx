'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/cn'
import { formatRating, roundRating } from '@/lib/format'

type RatingProps = {
  value?: number
  /** Com `onChange`, a nota vira um grupo de rádios. */
  onChange?: (value: number) => void
  size?: 'md' | 'sm'
  showValue?: boolean
  /** Nome do grupo de rádios: "Sua nota para Dom Casmurro". */
  label?: string
  className?: string
}

const STAR =
  'M12 2.8l2.83 5.73 6.32.92-4.57 4.46 1.08 6.3L12 17.24l-5.66 2.97 1.08-6.3L2.85 9.45l6.32-.92z'

const OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

/** Número ao lado das estrelas, sempre com uma casa: "4,0". */
const oneDecimal = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

function Star({ fill, size }: { fill: number; size: 'md' | 'sm' }) {
  const box = size === 'sm' ? 'size-4' : 'size-6'
  return (
    <span aria-hidden="true" className={cn('relative block', box)}>
      <svg viewBox="0 0 24 24" className={cn('block', box)}>
        <path
          d={STAR}
          className="fill-none stroke-line-strong stroke-[1.5] [stroke-linejoin:round]"
        />
      </svg>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${fill * 100}%` }}
      >
        <svg viewBox="0 0 24 24" className={cn('block', box)}>
          <path
            d={STAR}
            className="fill-accent stroke-accent stroke-[1.5] [stroke-linejoin:round]"
          />
        </svg>
      </span>
    </span>
  )
}

export function Rating({
  value = 0,
  onChange,
  size = 'md',
  showValue = true,
  label,
  className,
}: RatingProps) {
  const name = useId()
  const [hover, setHover] = useState<number | null>(null)
  const rounded = roundRating(value)
  const shown = onChange && hover != null ? hover : rounded

  const stars = [0, 1, 2, 3, 4].map((i) => (
    <Star key={i} fill={Math.min(1, Math.max(0, shown - i))} size={size} />
  ))
  const number =
    showValue && shown ? (
      <span
        aria-hidden="true"
        className="min-w-[2.2em] font-mono text-[13px] leading-none font-medium text-ink-muted tabular-nums"
      >
        {oneDecimal.format(shown)}
      </span>
    ) : null

  if (!onChange) {
    return (
      <span
        role="img"
        aria-label={rounded ? `Nota ${formatRating(rounded)} de 5` : 'Sem nota'}
        className={cn('inline-flex items-center gap-2', className)}
      >
        <span className="relative inline-flex rounded-sm">{stars}</span>
        {number}
      </span>
    )
  }

  return (
    <div
      role="radiogroup"
      aria-label={label ?? 'Nota'}
      className={cn('inline-flex items-center gap-2', className)}
    >
      <span
        className="relative inline-flex cursor-pointer rounded-sm has-focus-visible:shadow-focus-ring"
        onMouseLeave={() => setHover(null)}
      >
        {stars}
        {OPTIONS.map((option) => (
          <label
            key={option}
            className="absolute inset-y-0 w-[10%] cursor-pointer"
            style={{ left: `${(option * 2 - 1) * 10}%` }}
            onMouseEnter={() => setHover(option)}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={rounded === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span className="sr-only">
              {formatRating(option)} {option < 2 ? 'estrela' : 'estrelas'}
            </span>
          </label>
        ))}
      </span>
      {number}
    </div>
  )
}
