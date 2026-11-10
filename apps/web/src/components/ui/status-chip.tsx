import { cn } from '@/lib/cn'

export type ReadingStatus = 'want' | 'reading' | 'read' | 'paused' | 'abandoned'
export type LoanStatus = 'loaned' | 'overdue'

type StatusChipProps = {
  status: ReadingStatus | LoanStatus
  /** Troca o texto: "Atrasado há 5 dias". */
  label?: string
  className?: string
}

const NEUTRAL = 'border-line-strong text-ink-muted'

const STATUSES: Record<ReadingStatus | LoanStatus, { text: string; tone: string }> = {
  want: { text: 'Quero ler', tone: NEUTRAL },
  reading: { text: 'Lendo', tone: 'border-transparent bg-accent-soft text-accent' },
  read: { text: 'Lido', tone: 'border-transparent bg-status-read-soft text-status-read' },
  paused: { text: 'Pausado', tone: NEUTRAL },
  abandoned: { text: 'Abandonado', tone: NEUTRAL },
  loaned: {
    text: 'Emprestado',
    tone: 'border-transparent bg-status-loaned-soft text-status-loaned',
  },
  overdue: {
    text: 'Atrasado',
    tone: 'border-transparent bg-status-overdue-soft text-status-overdue',
  },
}

export function StatusChip({ status, label, className }: StatusChipProps) {
  const { text, tone } = STATUSES[status]

  return (
    <span
      className={cn(
        'box-border inline-flex h-6 items-center rounded-full border px-2.5 font-sans text-xs leading-none font-medium tracking-[0.01em] whitespace-nowrap',
        tone,
        className
      )}
    >
      {label ?? text}
    </span>
  )
}
