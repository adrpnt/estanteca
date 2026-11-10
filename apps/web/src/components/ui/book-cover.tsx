import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

type BookCoverSize = 'xs' | 'sm' | 'md' | 'lg'

type BookCoverProps = {
  src?: string
  /** Título e autor aparecem na capa em branco, quando não há `src`. */
  title?: string
  author?: string
  size?: BookCoverSize
  /** Sem `alt`, a capa é decorativa. */
  alt?: string
  className?: string
  style?: CSSProperties
}

const WIDTHS: Record<BookCoverSize, string> = {
  xs: 'w-12',
  sm: 'w-18',
  md: 'w-30',
  lg: 'w-50',
}

const TITLES: Record<BookCoverSize, string> = {
  xs: 'text-lg line-clamp-5',
  sm: 'text-[10px] line-clamp-4',
  md: 'text-sm line-clamp-5',
  lg: 'text-xl line-clamp-5',
}

export function BookCover({
  src,
  title,
  author,
  size = 'md',
  alt,
  className,
  style,
}: BookCoverProps) {
  const blank = !src
  const a11y = alt ? { 'role': 'img', 'aria-label': alt } : { 'aria-hidden': true }
  const showAuthor = author && (size === 'md' || size === 'lg')

  return (
    <div
      {...(blank ? a11y : null)}
      className={cn(
        'relative box-border aspect-2/3 max-w-full flex-none overflow-hidden rounded-cover bg-surface-raised shadow-cover transition-transform duration-200 ease-out motion-reduce:transition-none',
        WIDTHS[size],
        className
      )}
      style={style}
    >
      {blank ? (
        <div
          className={cn(
            'absolute inset-0 box-border flex flex-col gap-1.5 rounded-[inherit] border border-line bg-surface-raised',
            size === 'xs'
              ? 'items-center justify-center p-0'
              : "justify-between pt-[14%] pr-[12%] pb-[10%] pl-[18%] before:absolute before:inset-y-0 before:left-[8%] before:w-px before:bg-line before:content-['']"
          )}
        >
          <span
            className={cn(
              'font-serif leading-[1.15] font-semibold wrap-break-word text-ink',
              TITLES[size]
            )}
          >
            {size === 'xs' ? (title ?? '').trim().charAt(0) : title}
          </span>
          {showAuthor && (
            <span
              className={cn(
                'font-sans leading-tight font-medium text-ink-muted',
                size === 'lg' ? 'text-[13px]' : 'text-[11px]'
              )}
            >
              {author}
            </span>
          )}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- capas vêm de upload e de data URIs, sem hosts fixos para o next/image
        <img
          src={src}
          alt={alt ?? ''}
          loading="lazy"
          decoding="async"
          className="block size-full object-cover"
        />
      )}
    </div>
  )
}
