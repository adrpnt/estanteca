import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EmptyState } from './empty-state'

describe('EmptyState', () => {
  it('mostra o título como cabeçalho no nível de level e a ação', () => {
    const { unmount } = render(
      <EmptyState
        title="Sua estante ainda está vazia"
        description="Adicione o primeiro livro pelo ISBN ou pelo título."
        action={<button type="button">Adicionar exemplar</button>}
      />
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Sua estante ainda está vazia' })
    ).toBeTruthy()
    expect(screen.getByText('Adicione o primeiro livro pelo ISBN ou pelo título.')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Adicionar exemplar' })).toBeTruthy()
    unmount()

    render(<EmptyState title="Nenhuma leitura em andamento" level={4} />)
    expect(
      screen.getByRole('heading', { level: 4, name: 'Nenhuma leitura em andamento' })
    ).toBeTruthy()
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull()
  })

  it('mostra o título no nível de level', () => {
    render(<EmptyState title="Nenhuma leitura em andamento" level={3} />)

    expect(
      screen.getByRole('heading', { level: 3, name: 'Nenhuma leitura em andamento' })
    ).toBeTruthy()
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull()
  })
})
