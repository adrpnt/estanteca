'use client'

import { useId, useSyncExternalStore } from 'react'
import { applyTheme, parseTheme, type ThemePreference } from '@/lib/theme'

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: 'Claro' },
  { value: 'dark', label: 'Escuro' },
  { value: 'system', label: 'Automático' },
]

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function readTheme(): ThemePreference {
  return parseTheme(document.cookie.match(/(?:^|; )theme=([^;]*)/)?.[1])
}

function serverTheme(): ThemePreference {
  return 'system'
}

export function ThemeSwitcher() {
  const name = useId()
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme)

  function choose(preference: ThemePreference) {
    applyTheme(preference)
    listeners.forEach((listener) => listener())
  }

  return (
    <fieldset className="inline-flex gap-1 rounded-sm border border-line-strong bg-surface-raised p-1">
      <legend className="sr-only">Tema</legend>
      {OPTIONS.map((option) => (
        <label
          key={option.value}
          className="cursor-pointer rounded-sm px-3 py-1 text-sm text-ink-muted has-checked:bg-accent-soft has-checked:text-accent has-focus-visible:shadow-focus-ring"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={theme === option.value}
            onChange={() => choose(option.value)}
            className="sr-only"
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  )
}
