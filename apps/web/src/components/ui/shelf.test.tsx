import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { BookCover } from './book-cover'
import { Shelf } from './shelf'

function covers(titles: string[]) {
  return titles.map((title) => <BookCover key={title} title={title} alt={title} />)
}

describe('Shelf', () => {
  it('mostra a contagem e nomeia a área das capas', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<Shelf title="Lidos">{covers(['Dom', 'Iracema'])}</Shelf>)
    expect(screen.getByText('2 livros')).toBeTruthy()

    rerender(<Shelf title="Cabeceira">{covers(['Dom Casmurro'])}</Shelf>)
    expect(screen.getByText('1 livro')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 2, name: 'Cabeceira' })).toBeTruthy()

    const area = screen.getByRole('region', { name: 'Livros da estante Cabeceira' })
    // @ts-expect-error o título nomeia a área das capas, então só aceita texto
    expect(<Shelf title={<em>Cabeceira</em>}>{null}</Shelf>).toBeTruthy()
    await user.tab()
    expect(document.activeElement).toBe(area)
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })

  it('não conta nem desenha filhos vazios', () => {
    const later = false
    render(
      <Shelf title="Cabeceira">
        {covers(['Dom Casmurro'])}
        {later && covers(['Iracema'])}
        {null}
      </Shelf>
    )

    expect(screen.getByText('1 livro')).toBeTruthy()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })

  it('conta as capas no plural', () => {
    render(<Shelf title="Lidos">{covers(['Dom Casmurro', 'Iracema', 'O Cortiço'])}</Shelf>)

    expect(screen.getByText('3 livros')).toBeTruthy()
  })

  it('usa count como total quando é maior que as capas', () => {
    render(
      <Shelf title="Cabeceira" count={1234}>
        {covers(['Dom Casmurro', 'Iracema'])}
      </Shelf>
    )

    expect(screen.getByText('1.234 livros')).toBeTruthy()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })
})
