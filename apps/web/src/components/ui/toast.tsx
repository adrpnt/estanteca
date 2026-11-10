'use client'

import { Check, CircleAlert, X } from 'lucide-react'
import { Toast as ToastPrimitive } from 'radix-ui'
import { cn } from '@/lib/cn'
import { toast, useToasts, type ToastItem } from '@/lib/toast'

type ToastProps = Omit<ToastItem, 'id'> & {
  onClose?: () => void
  className?: string
}

const FOCUS =
  'focus-visible:shadow-focus-ring focus-visible:outline-2 focus-visible:outline-transparent'

/** Aviso curto de confirmação ou de erro. Fica dentro do `Toaster`. */
export function Toast({ message, tone, action, duration, onClose, className }: ToastProps) {
  const error = tone === 'error'
  const Icon = error ? CircleAlert : Check

  return (
    <ToastPrimitive.Root
      // Erro é anunciado na hora (aria-live assertivo); sucesso, de forma educada.
      type={error ? 'foreground' : 'background'}
      duration={duration}
      open
      onOpenChange={(open) => {
        if (!open) onClose?.()
      }}
      className={cn(
        'pointer-events-auto box-border flex min-h-12 w-[min(100%,420px)] items-center gap-3 rounded-md border border-line bg-surface-raised py-2 pr-2 pl-4 text-ink shadow-raised data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-(--radix-toast-swipe-end-x) data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)',
        FOCUS,
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn('inline-flex', error ? 'text-status-overdue' : 'text-accent')}
      >
        <Icon size={20} strokeWidth={1.5} focusable="false" />
      </span>
      <ToastPrimitive.Description className="m-0 min-w-0 flex-1 py-1.5 font-sans text-sm leading-5">
        {message}
      </ToastPrimitive.Description>
      {action && (
        <ToastPrimitive.Action
          altText={action.label}
          onClick={action.onClick}
          className={cn(
            'h-8 flex-none cursor-pointer rounded-sm border-0 bg-transparent px-3 font-sans text-sm leading-none font-semibold whitespace-nowrap text-accent hover:bg-accent-soft',
            FOCUS
          )}
        >
          {action.label}
        </ToastPrimitive.Action>
      )}
      <ToastPrimitive.Close
        aria-label="Fechar aviso"
        className={cn(
          'inline-flex size-8 flex-none cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 text-ink-muted hover:bg-[color-mix(in_oklab,var(--color-surface-raised)_90%,var(--color-ink))] hover:text-ink',
          FOCUS
        )}
      >
        <X size={18} strokeWidth={1.5} aria-hidden="true" focusable="false" />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
}

/**
 * Região dos avisos, montada uma vez no layout. Mostra a fila de `toast.success` e `toast.error`.
 * No mobile, defina `--et-toast-offset` com a altura da BottomNav.
 */
export function Toaster() {
  const toasts = useToasts()

  return (
    <ToastPrimitive.Provider label="Aviso">
      {toasts.map(({ id, ...item }) => (
        <Toast key={id} {...item} onClose={() => toast.dismiss(id)} />
      ))}
      <ToastPrimitive.Viewport
        label="Avisos ({hotkey})"
        className="pointer-events-none fixed inset-x-0 bottom-[var(--et-toast-offset,0px)] z-70 m-0 box-border flex list-none flex-col items-center gap-2 pt-4 pr-[max(1rem,env(safe-area-inset-right,0px))] pb-[calc(1rem+env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] outline-none md:items-end"
      />
    </ToastPrimitive.Provider>
  )
}
