import { useState } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { BookCard } from './book-card'

function MenuButton() {
  const [open, setOpen] = useState(false)
  return (
    <button type="button" onClick={() => setOpen(true)}>
      {open ? 'Menu aberto' : 'Ações do exemplar'}
    </button>
  )
}

describe('BookCard', () => {
  it('com href o título é um link para href', () => {
    for (const layout of ['grid', 'list'] as const) {
      const { unmount } = render(
        <BookCard layout={layout} title="Dom Casmurro" author="Machado de Assis" href="/livros/1" />
      )

      const heading = screen.getByRole('heading', { level: 3, name: 'Dom Casmurro' })
      const link = within(heading).getByRole('link', { name: 'Dom Casmurro' })
      expect(link.getAttribute('href')).toBe('/livros/1')
      expect(screen.getAllByRole('link')).toHaveLength(1)
      unmount()
    }
  })

  it('aciona actions sem acionar o link', async () => {
    const user = userEvent.setup()
    render(
      <BookCard
        layout="list"
        title="Os Sertões"
        href="/livros/2"
        status="loaned"
        actions={<MenuButton />}
      />
    )

    const link = screen.getByRole('link', { name: 'Os Sertões' })
    let linkClicks = 0
    link.addEventListener('click', (event) => {
      linkClicks += 1
      event.preventDefault()
    })

    await user.click(screen.getByRole('button', { name: 'Ações do exemplar' }))

    expect(screen.getByRole('button', { name: 'Menu aberto' })).toBeTruthy()
    expect(linkClicks).toBe(0)
  })
})
