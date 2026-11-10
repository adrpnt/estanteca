'use client'

import type { ReactNode } from 'react'
import { Ellipsis } from 'lucide-react'
import { DropdownMenu } from 'radix-ui'
import { cn } from '@/lib/cn'
import { Button } from './button'

export type ActionMenuItem =
  | 'separator'
  | {
      label: string
      onSelect?: () => void
      icon?: ReactNode
      /** Ação destrutiva, em `status-overdue`. */
      danger?: boolean
      disabled?: boolean
      /** Esconde o item (funcionalidade ainda não entregue). */
      hidden?: boolean
    }

type ActionMenuProps = {
  items: ActionMenuItem[]
  /** Nome do botão e do menu. */
  label?: string
  align?: 'end' | 'start'
  defaultOpen?: boolean
  className?: string
}

/** Menu ⋮ de ações do exemplar, com navegação por setas. */
export function ActionMenu({
  items,
  label = 'Ações do exemplar',
  align = 'end',
  defaultOpen,
  className,
}: ActionMenuProps) {
  const visible = items.filter((item) => item === 'separator' || !item.hidden)

  return (
    <DropdownMenu.Root defaultOpen={defaultOpen}>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={label}
          icon={<Ellipsis strokeWidth={1.5} focusable="false" />}
          className={className}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          aria-label={label}
          align={align}
          sideOffset={4}
          className="z-40 box-border min-w-52 rounded-md border border-line bg-surface-raised p-1 shadow-raised"
        >
          {visible.map((item, i) =>
            item === 'separator' ? (
              <DropdownMenu.Separator key={`separator-${i}`} className="my-1 h-px bg-line" />
            ) : (
              <DropdownMenu.Item
                key={item.label}
                disabled={item.disabled}
                onSelect={item.onSelect}
                className={cn(
                  'box-border flex h-9 w-full cursor-pointer items-center gap-2 rounded-sm px-3 text-left font-sans text-sm leading-none whitespace-nowrap outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)] data-disabled:cursor-not-allowed data-disabled:text-ink-muted data-highlighted:bg-[color-mix(in_oklab,var(--color-surface-raised)_90%,var(--color-ink))]',
                  item.danger ? 'text-status-overdue' : 'text-ink'
                )}
              >
                {item.icon && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'inline-flex [&_svg]:size-4',
                      item.danger ? 'text-inherit' : 'text-ink-muted'
                    )}
                  >
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </DropdownMenu.Item>
            )
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
