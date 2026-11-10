import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SearchTrigger } from './search-trigger'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('SearchTrigger', () => {
  it('tem Buscar título, autor ou ISBN como nome acessível', () => {
    render(<SearchTrigger />)

    expect(screen.getByRole('button', { name: 'Buscar título, autor ou ISBN' })).toBeTruthy()
  })

  it('mostra Ctrl K fora do macOS', () => {
    vi.spyOn(navigator, 'platform', 'get').mockReturnValue('Win32')
    render(<SearchTrigger />)

    const button = screen.getByRole('button', { name: 'Buscar título, autor ou ISBN' })
    expect(button.textContent).toContain('Ctrl K')
    expect(button.textContent).not.toContain('⌘K')
  })

  it('mostra ⌘K no macOS', () => {
    vi.spyOn(navigator, 'platform', 'get').mockReturnValue('MacIntel')
    render(<SearchTrigger />)

    const button = screen.getByRole('button', { name: 'Buscar título, autor ou ISBN' })
    expect(button.textContent).toContain('⌘K')
    expect(button.textContent).not.toContain('Ctrl K')
  })
})
