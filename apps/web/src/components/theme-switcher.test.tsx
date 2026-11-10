import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { ThemeSwitcher } from './theme-switcher'

const root = document.documentElement

afterEach(() => {
  document.cookie = 'theme=; max-age=0; path=/'
  root.removeAttribute('data-theme')
})

describe('ThemeSwitcher', () => {
  it('marca a opção do cookie atual', () => {
    const { unmount } = render(<ThemeSwitcher />)
    expect(screen.getByRole('group', { name: 'Tema' })).toBeTruthy()
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Automático' }).checked).toBe(true)
    unmount()

    document.cookie = 'theme=dark; path=/'
    render(<ThemeSwitcher />)
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Escuro' }).checked).toBe(true)
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Claro' }).checked).toBe(false)
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Automático' }).checked).toBe(false)
  })

  it('escolher Escuro aplica data-theme e grava o cookie sem recarregar', async () => {
    const user = userEvent.setup()
    const page = window.location.href
    render(<ThemeSwitcher />)

    await user.click(screen.getByRole('radio', { name: 'Escuro' }))

    expect(root.getAttribute('data-theme')).toBe('dark')
    expect(document.cookie).toContain('theme=dark')
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Escuro' }).checked).toBe(true)
    expect(window.location.href).toBe(page)
  })

  it('escolher Automático remove data-theme e grava system', async () => {
    const user = userEvent.setup()
    document.cookie = 'theme=dark; path=/'
    root.setAttribute('data-theme', 'dark')
    render(<ThemeSwitcher />)

    await user.click(screen.getByRole('radio', { name: 'Automático' }))

    expect(root.hasAttribute('data-theme')).toBe(false)
    expect(document.cookie).toContain('theme=system')
    expect(screen.getByRole<HTMLInputElement>('radio', { name: 'Automático' }).checked).toBe(true)
  })
})
