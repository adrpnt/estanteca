import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

type SkeletonProps = {
  variant?: 'text' | 'cover' | 'card' | 'row'
  /** Para `cover`. */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Para `text`. Padrão: 3. */
  lines?: number
  className?: string
}

const COVER_WIDTHS = { xs: 48, sm: 72, md: 120, lg: 200 }

const BONE =
  'block flex-none bg-[color-mix(in_oklab,var(--color-surface-raised)_86%,var(--color-ink))] animate-pulse [animation-duration:1.4s] [animation-timing-function:ease-in-out] motion-reduce:animate-none'
const COVER = 'aspect-2/3 max-w-full rounded-cover'
const LINE = 'my-[5px] h-3 rounded-[4px]'
const SMALL_LINE = 'my-[5px] h-2.5 rounded-[4px]'

function Bone({ className, style }: { className: string; style?: CSSProperties }) {
  return <span className={cn(BONE, className)} style={style} />
}

export function Skeleton({ variant = 'text', size = 'md', lines = 3, className }: SkeletonProps) {
  if (variant === 'cover') {
    return (
      <div aria-hidden="true" className={className}>
        <Bone className={COVER} style={{ width: COVER_WIDTHS[size] }} />
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div aria-hidden="true" className={cn('flex min-w-0 flex-col gap-2', className)}>
        <span className="flex rounded-md bg-surface-raised px-4 pt-4 pb-3">
          <Bone className={cn(COVER, 'w-full')} />
        </span>
        <Bone className={LINE} style={{ width: '85%' }} />
        <Bone className={SMALL_LINE} style={{ width: '55%' }} />
      </div>
    )
  }

  if (variant === 'row') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-line px-2 py-3',
          className
        )}
      >
        <Bone className={COVER} style={{ width: 48 }} />
        <span className="grid">
          <Bone className={LINE} style={{ width: '60%' }} />
          <Bone className={SMALL_LINE} style={{ width: '35%' }} />
        </span>
        <Bone className="h-6 w-18 rounded-full" />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className={cn('grid', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Bone
          key={i}
          className={LINE}
          style={{ width: i === lines - 1 && lines > 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}
