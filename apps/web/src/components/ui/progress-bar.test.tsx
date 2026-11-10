import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProgressBar } from './progress-bar'

describe('ProgressBar', () => {
  it('mostra as páginas e o percentual', () => {
    render(<ProgressBar label="Memórias Póstumas de Brás Cubas" current={148} total={256} />)

    expect(screen.getByText('p. 148 de 256 · 58%')).toBeTruthy()
    const bar = screen.getByRole('progressbar', { name: 'Memórias Póstumas de Brás Cubas' })
    expect(bar.getAttribute('aria-valuenow')).toBe('58')
    expect(bar.getAttribute('aria-valuetext')).toBe('Página 148 de 256, 58%')
  })

  it('limita o percentual entre 0 e 100', () => {
    const { rerender } = render(<ProgressBar current={1300} total={1256} />)
    expect(screen.getByText('p. 1.300 de 1.256 · 100%')).toBeTruthy()
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100')

    rerender(<ProgressBar label="Meta de 2026" value={-5} />)
    expect(screen.getByText('0%')).toBeTruthy()
    expect(
      screen.getByRole('progressbar', { name: 'Meta de 2026' }).getAttribute('aria-valuenow')
    ).toBe('0')

    rerender(<ProgressBar label="Meta de 2026" value={140} />)
    expect(screen.getByText('100%')).toBeTruthy()
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100')
  })
})
