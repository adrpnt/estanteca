'use client'

import type { MouseEventHandler, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Tooltip } from 'radix-ui'
import { cn } from '@/lib/cn'
import { formatCount } from '@/lib/format'

export type NavItem = {
  id: string
  label: string
  href: string
  /** Ícone Lucide de 20px. */
  icon: ReactNode
  count?: number
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

type SideNavProps = {
  'items': NavItem[]
  'footerItems'?: NavItem[]
  /** `id` do item da página atual. */
  'current'?: string
  'collapsed'?: boolean
  'onCollapsedChange'?: (collapsed: boolean) => void
  'homeHref'?: string
  'aria-label'?: string
  'className'?: string
}

const HOVER =
  'hover:bg-[color-mix(in_oklab,var(--color-surface)_90%,var(--color-ink))] hover:text-ink'
const FOCUS =
  'focus-visible:shadow-focus-ring focus-visible:outline-2 focus-visible:outline-transparent'

function NavLink({ item, on, collapsed }: { item: NavItem; on: boolean; collapsed: boolean }) {
  const link = (
    <a
      href={item.href}
      onClick={item.onClick}
      aria-current={on ? 'page' : undefined}
      className={cn(
        'box-border flex h-10 items-center gap-3 rounded-sm font-sans text-[15px] leading-none font-medium text-ink-muted no-underline transition-colors duration-150 ease-out motion-reduce:transition-none',
        collapsed ? 'justify-center' : 'px-3',
        on ? 'bg-accent-soft text-accent' : HOVER,
        FOCUS
      )}
    >
      <span aria-hidden="true" className="inline-flex flex-none [&_svg]:size-5">
        {item.icon}
      </span>
      <span className={collapsed ? 'sr-only' : 'min-w-0 flex-1 truncate'}>{item.label}</span>
      {item.count != null && !collapsed && (
        <span className="font-mono text-xs leading-none tabular-nums">
          {formatCount(item.count)}
        </span>
      )}
    </a>
  )

  if (!collapsed) return <li>{link}</li>

  return (
    <li>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{link}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            sideOffset={8}
            className="z-50 rounded-sm bg-ink px-2 py-1 font-sans text-[13px] leading-[18px] font-medium text-surface shadow-raised"
          >
            {item.label}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </li>
  )
}

function NavList({
  items,
  current,
  collapsed,
  className,
}: {
  items: NavItem[]
  current?: string
  collapsed: boolean
  className?: string
}) {
  return (
    <ul className={cn('m-0 flex list-none flex-col gap-0.5 p-0', className)}>
      {items.map((item) => (
        <NavLink key={item.id} item={item} on={item.id === current} collapsed={collapsed} />
      ))}
    </ul>
  )
}

export function SideNav({
  items,
  footerItems,
  current,
  collapsed = false,
  onCollapsedChange,
  homeHref = '/app',
  'aria-label': ariaLabel = 'Principal',
  className,
}: SideNavProps) {
  const toggleLabel = collapsed ? 'Expandir menu' : 'Recolher menu'
  const ToggleIcon = collapsed ? ChevronRight : ChevronLeft

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'box-border flex h-full flex-col gap-4 border-r border-line bg-surface px-3 py-4 transition-[width] duration-200 ease-out motion-reduce:transition-none',
        collapsed ? 'w-18' : 'w-60',
        className
      )}
    >
      <div
        className={cn(
          'flex min-h-10 items-center justify-between gap-2',
          collapsed ? 'flex-col' : 'pl-3'
        )}
      >
        <a
          href={homeHref}
          aria-label={collapsed ? 'Estanteca, início' : undefined}
          className={cn(
            'rounded-sm font-serif text-[22px] leading-[1.2] font-semibold tracking-[-0.015em] text-ink no-underline',
            FOCUS
          )}
        >
          {collapsed ? 'E' : 'Estanteca'}
        </a>
        {onCollapsedChange && (
          <button
            type="button"
            aria-label={toggleLabel}
            title={toggleLabel}
            onClick={() => onCollapsedChange(!collapsed)}
            className={cn(
              'inline-flex size-8 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 text-ink-muted',
              HOVER,
              FOCUS
            )}
          >
            <ToggleIcon size={18} strokeWidth={1.5} aria-hidden="true" focusable="false" />
          </button>
        )}
      </div>
      <Tooltip.Provider>
        <NavList items={items} current={current} collapsed={collapsed} />
        {footerItems && footerItems.length > 0 && (
          <NavList
            items={footerItems}
            current={current}
            collapsed={collapsed}
            className="mt-auto"
          />
        )}
      </Tooltip.Provider>
    </nav>
  )
}
