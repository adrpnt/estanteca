'use client'

import { useId, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TextFieldProps = Omit<ComponentProps<'input'>, 'prefix'> & {
  label: ReactNode
  hint?: ReactNode
  /** Diz o que fazer: "Já existe um exemplar com o código 0042. Sugestão: 0249." */
  error?: ReactNode
  /** Geist Mono com algarismos tabulares: ISBN, CDD, CDU, código do exemplar. */
  mono?: boolean
  /** Unidade dentro do campo, como "R$". Repita a unidade no rótulo. */
  prefix?: ReactNode
}

export function TextField({
  label,
  hint,
  error,
  mono,
  prefix,
  id,
  type = 'text',
  className,
  ...props
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ')

  const input = (
    <input
      type={type}
      {...props}
      id={inputId}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy || undefined}
      className={cn(
        'box-border h-10 w-full rounded-sm border bg-surface-raised pr-3 text-ink transition-colors duration-150 ease-out placeholder:text-ink-muted focus:shadow-focus-ring focus:outline-2 focus:outline-transparent disabled:cursor-not-allowed disabled:bg-surface disabled:text-ink-muted read-only:cursor-default read-only:border-dashed read-only:bg-surface read-only:text-ink-muted',
        mono
          ? 'font-mono text-sm leading-[22px] tracking-[0.02em] tabular-nums'
          : 'font-sans text-[15px] leading-[22px]',
        error
          ? 'border-status-overdue hover:border-status-overdue focus:border-status-overdue'
          : 'border-line-strong hover:border-ink-muted focus:border-accent',
        prefix ? 'pl-10' : 'pl-3'
      )}
    />
  )

  return (
    <div className={cn('grid min-w-0 content-start gap-1.5', className)}>
      <label
        htmlFor={inputId}
        className="font-sans text-[13px] leading-[18px] font-medium tracking-[0.01em] text-ink"
      >
        {label}
        {props.required && (
          <span aria-hidden="true" className="text-accent">
            {' *'}
          </span>
        )}
      </label>
      {prefix ? (
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-sans text-[15px] leading-none text-ink-muted"
          >
            {prefix}
          </span>
          {input}
        </div>
      ) : (
        input
      )}
      {hint && (
        <p id={hintId} className="m-0 font-sans text-[13px] leading-[18px] text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          className="m-0 font-sans text-[13px] leading-[18px] font-medium text-status-overdue"
        >
          {error}
        </p>
      )}
    </div>
  )
}
