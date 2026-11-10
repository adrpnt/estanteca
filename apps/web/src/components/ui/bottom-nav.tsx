import { cn } from '@/lib/cn'
import type { NavItem } from './side-nav'

type BottomNavProps = {
  'items': NavItem[]
  /** `id` do item da página atual. */
  'current'?: string
  'aria-label'?: string
  'className'?: string
}

/** Fixe em `bottom: 0` e reserve 60px mais a área segura no fim da página. */
export function BottomNav({
  items,
  current,
  'aria-label': ariaLabel = 'Principal',
  className,
}: BottomNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'box-border border-t border-line bg-surface-raised pr-[env(safe-area-inset-right,0px)] pb-[env(safe-area-inset-bottom,0px)] pl-[env(safe-area-inset-left,0px)]',
        className
      )}
    >
      <ul className="m-0 flex list-none p-0">
        {items.map((item) => {
          const on = item.id === current
          return (
            <li key={item.id} className="min-w-0 flex-1 basis-0">
              <a
                href={item.href}
                onClick={item.onClick}
                aria-current={on ? 'page' : undefined}
                className={cn(
                  'flex h-15 flex-col items-center justify-center gap-0.5 rounded-sm font-sans text-xs leading-4 font-medium no-underline focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)] focus-visible:outline-2 focus-visible:outline-transparent',
                  on ? 'text-accent' : 'text-ink-muted'
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex h-7 w-12 items-center justify-center rounded-full transition-colors duration-150 ease-out motion-reduce:transition-none [&_svg]:size-5',
                    on && 'bg-accent-soft'
                  )}
                >
                  {item.icon}
                </span>
                <span className="max-w-full truncate">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
