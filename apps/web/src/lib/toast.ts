import { useSyncExternalStore } from 'react'

export type ToastAction = { label: string; onClick: () => void }

export type ToastItem = {
  id: string
  tone: 'success' | 'error'
  message: string
  action?: ToastAction
  /** Milissegundos até sumir; `Infinity` fica até ser fechado. */
  duration: number
}

type ToastOptions = { action?: ToastAction }

const MAX_TOASTS = 3

let toasts: ToastItem[] = []
let nextId = 0
const listeners = new Set<() => void>()

function emit(next: ToastItem[]) {
  toasts = next
  listeners.forEach((listener) => listener())
}

function duration(tone: ToastItem['tone'], action?: ToastAction): number {
  if (tone === 'error') return Infinity
  return action ? 8000 : 5000
}

function add(tone: ToastItem['tone'], message: string, options: ToastOptions = {}): string {
  const id = `toast-${++nextId}`
  const item = {
    id,
    tone,
    message,
    action: options.action,
    duration: duration(tone, options.action),
  }
  emit([...toasts, item].slice(-MAX_TOASTS))
  return id
}

export const toast = {
  success: (message: string, options?: ToastOptions) => add('success', message, options),
  error: (message: string, options?: ToastOptions) => add('error', message, options),
  /** Sem `id`, remove todos. */
  dismiss(id?: string) {
    emit(id ? toasts.filter((item) => item.id !== id) : [])
  },
}

export function getToasts(): ToastItem[] {
  return toasts
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const noToasts: ToastItem[] = []

export function useToasts(): ToastItem[] {
  return useSyncExternalStore(subscribe, getToasts, () => noToasts)
}
