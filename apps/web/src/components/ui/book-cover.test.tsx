import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BookCover } from './book-cover'

const SRC = 'data:image/svg+xml;charset=utf-8,%3Csvg%2F%3E'

describe('BookCover', () => {
  it('sem src mostra título e autor', () => {
    for (const size of ['md', 'lg'] as const) {
      const { container, unmount } = render(
        <BookCover size={size} title="Os Sertões" author="Euclides da Cunha" />
      )
      expect(container.querySelector('img')).toBeNull()
      expect(screen.getByText('Os Sertões')).toBeTruthy()
      expect(screen.getByText('Euclides da Cunha')).toBeTruthy()
      unmount()
    }
  })

  it('sm sem src mostra o título sem o autor', () => {
    const { container } = render(
      <BookCover size="sm" title="Os Sertões" author="Euclides da Cunha" />
    )

    expect(container.textContent).toBe('Os Sertões')
  })

  it('xs sem src mostra só a inicial', () => {
    const { container } = render(<BookCover size="xs" title="Iracema" author="José de Alencar" />)

    expect(container.textContent).toBe('I')
  })

  it('sem alt fica escondido e com alt usa o texto', () => {
    const { container, rerender } = render(<BookCover title="Iracema" />)
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true')
    expect(screen.queryByRole('img')).toBeNull()

    rerender(<BookCover title="Iracema" alt="Capa de Iracema, de José de Alencar" />)
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBeNull()
    expect(screen.getByRole('img', { name: 'Capa de Iracema, de José de Alencar' })).toBeTruthy()
  })

  it('com src mostra a imagem, nomeada pelo alt ou decorativa sem ele', () => {
    const { container, rerender } = render(<BookCover src={SRC} title="Iracema" />)
    expect(container.querySelector('img')?.getAttribute('src')).toBe(SRC)
    expect(screen.queryByRole('img')).toBeNull()
    expect(container.textContent).toBe('')

    rerender(<BookCover src={SRC} title="Iracema" alt="Capa de Iracema" />)
    expect(screen.getByRole('img', { name: 'Capa de Iracema' }).getAttribute('src')).toBe(SRC)
  })
})
