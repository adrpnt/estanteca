'use client'

import { useState, type ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/cn'

type StatProps = {
  label: ReactNode
  /** Já formatado em pt-BR. */
  value: ReactNode
  hint?: ReactNode
  /** Adiciona mostrar/ocultar; começa oculto. */
  sensitive?: boolean
  defaultHidden?: boolean
  /** O que aparece no lugar do valor oculto: "R$ ••••". */
  mask?: string
  className?: string
}

export function Stat({
  label,
  value,
  hint,
  sensitive = false,
  defaultHidden = true,
  mask = '••••',
  className,
}: StatProps) {
  const [hidden, setHidden] = useState(sensitive && defaultHidden)
  const toggleLabel = hidden ? 'Mostrar valor' : 'Ocultar valor'
  const ToggleIcon = hidden ? Eye : EyeOff

  return (
    <div
      className={cn(
        'grid min-w-0 content-start gap-1 rounded-md border border-line bg-surface-raised p-4',
        className
      )}
    >
      <div className="flex min-h-6 items-center justify-between gap-2">
        <p className="m-0 font-sans text-[13px] leading-[18px] font-medium text-ink-muted">
          {label}
        </p>
        {sensitive && (
          <button
            type="button"
            aria-label={toggleLabel}
            title={toggleLabel}
            onClick={() => setHidden(!hidden)}
            className="-my-0.5 -mr-1.5 inline-flex size-7 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 text-ink-muted hover:bg-[color-mix(in_oklab,var(--color-surface-raised)_90%,var(--color-ink))] hover:text-ink focus-visible:shadow-focus-ring focus-visible:outline-2 focus-visible:outline-transparent"
          >
            <ToggleIcon size={18} strokeWidth={1.5} aria-hidden="true" focusable="false" />
          </button>
        )}
      </div>
      <p className="m-0 font-sans text-[28px] leading-[34px] font-semibold tracking-[-0.01em] text-ink tabular-nums">
        {hidden ? (
          <>
            <span aria-hidden="true">{mask}</span>
            <span className="sr-only">Valor oculto</span>
          </>
        ) : (
          value
        )}
      </p>
      {hint && <p className="m-0 font-sans text-[13px] leading-[18px] text-ink-muted">{hint}</p>}
    </div>
  )
}
