import { cn } from '@/lib/cn'

type StepperProps = {
  /** Rótulos de até três palavras: "Encontrar a obra". */
  'steps': string[]
  /** Índice da etapa atual, a partir de 0. */
  'current': number
  'aria-label'?: string
  'className'?: string
}

const STATES = {
  done: {
    step: 'text-ink after:bg-accent',
    mark: 'border-[1.5px] border-accent bg-accent text-on-accent',
  },
  current: {
    step: 'font-semibold text-ink after:bg-line-strong',
    mark: 'border-2 border-accent text-accent',
  },
  next: {
    step: 'text-ink-muted after:bg-line-strong',
    mark: 'border-[1.5px] border-line-strong',
  },
}

export function Stepper({ steps, current, 'aria-label': label, className }: StepperProps) {
  const active = Math.min(Math.max(current, 0), Math.max(steps.length - 1, 0))

  return (
    <nav aria-label={label ?? 'Etapas'} className={cn('@container min-w-0', className)}>
      <p className="m-0 mb-2 font-sans text-[13px] leading-[18px] font-medium text-ink-muted">
        Etapa {active + 1} de {steps.length}
      </p>
      <ol className="m-0 flex list-none gap-2 p-0">
        {steps.map((step, index) => {
          const state = index < active ? 'done' : index === active ? 'current' : 'next'
          return (
            <li
              key={index}
              aria-current={state === 'current' ? 'step' : undefined}
              className={cn(
                'flex min-w-0 flex-[1_1_0] items-center gap-2 font-sans text-sm leading-5 font-medium after:h-px after:min-w-4 after:flex-[1_1_16px] after:content-[""] last:flex-[0_1_auto] last:after:hidden',
                STATES[state].step
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'box-border inline-flex size-6 flex-none items-center justify-center rounded-full font-mono text-xs leading-none font-medium',
                  STATES[state].mark
                )}
              >
                {state === 'done' ? (
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    focusable="false"
                    className="block flex-none"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn('min-w-0 truncate', state !== 'current' && '@max-[520px]:sr-only')}
              >
                {step}
                {state === 'done' && <span className="sr-only"> (concluída)</span>}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
