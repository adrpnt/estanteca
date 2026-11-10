export type ThemePreference = 'light' | 'dark' | 'system'

export function parseTheme(value: string | undefined): ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system' ? value : 'system'
}

/**
 * Roda no <head>, antes da primeira pintura: aplica o tema do cookie `theme`
 * quando é `light` ou `dark`. Sem data-theme, vale o prefers-color-scheme.
 */
export const THEME_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=([^;]*)/);var t=m&&decodeURIComponent(m[1]);if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`

export function applyTheme(preference: ThemePreference): void {
  const root = document.documentElement
  if (preference === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', preference)

  try {
    document.cookie = `theme=${preference}; path=/; max-age=31536000; samesite=lax`
  } catch {
    // Cookies bloqueados: o tema troca, mas não persiste.
  }
}
