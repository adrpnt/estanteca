import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = ComponentProps<'button'> & {
  /** `primary` uma vez por tela; `secondary` é o padrão. */
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'sm'
  /** Ícone Lucide de 18px. Sem `children`, o botão vira só ícone e precisa de `aria-label`. */
  icon?: ReactNode
}

const VARIANTS = {
  primary:
    'border-transparent bg-accent text-on-accent enabled:hover:bg-[color-mix(in_oklab,var(--color-accent)_86%,var(--color-ink))]',
  secondary:
    'border-line-strong bg-surface-raised text-ink enabled:hover:bg-[color-mix(in_oklab,var(--color-surface-raised)_90%,var(--color-ink))]',
  ghost:
    'border-transparent bg-transparent text-ink enabled:hover:bg-[color-mix(in_oklab,var(--color-surface-raised)_90%,var(--color-ink))]',
}

const SIZES = {
  md: { base: 'h-10 gap-2 text-[15px]', text: 'px-4', icon: 'w-10' },
  sm: { base: 'h-8 gap-1.5 text-sm', text: 'px-3', icon: 'w-8' },
}

export function Button({
  variant = 'secondary',
  size = 'md',
  icon,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  const iconOnly = icon != null && (children == null || children === false)

  return (
    <button
      type={type}
      {...props}
      className={cn(
        'box-border inline-flex cursor-pointer items-center justify-center rounded-sm border font-sans leading-none font-medium whitespace-nowrap transition-colors duration-150 ease-out focus-visible:shadow-focus-ring focus-visible:outline-2 focus-visible:outline-transparent disabled:cursor-not-allowed disabled:opacity-45',
        VARIANTS[variant],
        SIZES[size].base,
        iconOnly ? SIZES[size].icon : SIZES[size].text,
        className
      )}
    >
      {icon != null && (
        <span aria-hidden="true" className="inline-flex [&_svg]:size-[18px]">
          {icon}
        </span>
      )}
      {!iconOnly && <span>{children}</span>}
    </button>
  )
}
