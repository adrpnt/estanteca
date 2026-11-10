import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import RootLayout from '@/app/layout'
import { applyTheme, parseTheme, THEME_SCRIPT } from './theme'

vi.mock('next/font/google', () => {
  const font = (options: Record<string, unknown>) => ({ variable: options.variable })
  return { Literata: font, Geist: font, Geist_Mono: font }
})

const root = document.documentElement

function runThemeScript() {
  new Function(THEME_SCRIPT)()
}

afterEach(() => {
  document.cookie = 'theme=; max-age=0; path=/'
  root.removeAttribute('data-theme')
  vi.restoreAllMocks()
})

describe('parseTheme', () => {
  it('aceita light, dark e system', () => {
    expect(parseTheme('light')).toBe('light')
    expect(parseTheme('dark')).toBe('dark')
    expect(parseTheme('system')).toBe('system')
  })

  it('trata a ausência de preferência como system', () => {
    expect(parseTheme(undefined)).toBe('system')
  })

  it('trata valor inválido como system', () => {
    expect(parseTheme('sepia')).toBe('system')
    expect(parseTheme('')).toBe('system')
    expect(parseTheme('Dark')).toBe('system')
  })
})

describe('THEME_SCRIPT', () => {
  it('o layout põe no head o script que aplica o tema do cookie ao elemento raiz', () => {
    // Renderiza fora de uma requisição: o layout não lê cookies no servidor.
    const html = renderToStaticMarkup(
      RootLayout({ children: null } as Parameters<typeof RootLayout>[0])
    )
    const page = new DOMParser().parseFromString(html, 'text/html')
    const scripts = [...page.head.querySelectorAll('script')]
    expect(scripts.map((script) => script.textContent)).toEqual([THEME_SCRIPT])
    expect(page.body.querySelector('script')).toBeNull()

    document.cookie = 'theme=dark; path=/'
    runThemeScript()
    expect(root.getAttribute('data-theme')).toBe('dark')

    document.cookie = 'theme=light; path=/'
    runThemeScript()
    expect(root.getAttribute('data-theme')).toBe('light')
  })

  it('não aplica tema para system, cookie inválido ou ausente', () => {
    runThemeScript()
    expect(root.hasAttribute('data-theme')).toBe(false)

    document.cookie = 'theme=system; path=/'
    runThemeScript()
    expect(root.hasAttribute('data-theme')).toBe(false)

    document.cookie = 'theme=sepia; path=/'
    runThemeScript()
    expect(root.hasAttribute('data-theme')).toBe(false)
  })
})

describe('applyTheme', () => {
  it('grava o cookie e ajusta data-theme', () => {
    const setCookie = vi.spyOn(Document.prototype, 'cookie', 'set')

    applyTheme('dark')
    expect(root.getAttribute('data-theme')).toBe('dark')
    expect(setCookie).toHaveBeenLastCalledWith('theme=dark; path=/; max-age=31536000; samesite=lax')
    expect(document.cookie).toContain('theme=dark')

    applyTheme('system')
    expect(root.hasAttribute('data-theme')).toBe(false)
    expect(setCookie).toHaveBeenLastCalledWith(
      'theme=system; path=/; max-age=31536000; samesite=lax'
    )
    expect(document.cookie).toContain('theme=system')
  })
})
