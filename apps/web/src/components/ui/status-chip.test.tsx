import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StatusChip } from './status-chip'

describe('StatusChip', () => {
  it('mostra o texto de cada um dos 7 status ou o label', () => {
    const expected = {
      want: 'Quero ler',
      reading: 'Lendo',
      read: 'Lido',
      paused: 'Pausado',
      abandoned: 'Abandonado',
      loaned: 'Emprestado',
      overdue: 'Atrasado',
    } as const

    for (const [status, text] of Object.entries(expected)) {
      const { container, unmount } = render(<StatusChip status={status as keyof typeof expected} />)
      expect(container.textContent).toBe(text)
      unmount()
    }

    const { container } = render(<StatusChip status="overdue" label="Atrasado há 5 dias" />)
    expect(container.textContent).toBe('Atrasado há 5 dias')
  })

  it('usa o label quando recebido', () => {
    render(<StatusChip status="overdue" label="Atrasado há 5 dias" />)

    expect(screen.getByText('Atrasado há 5 dias')).toBeTruthy()
    expect(screen.queryByText('Atrasado')).toBeNull()
  })
})
