import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SearchDialog, type SearchResult } from './search-dialog'

const dom: SearchResult = {
  id: 'dom',
  title: 'Dom Casmurro',
  author: 'Machado de Assis',
  meta: '1899',
  status: 'read',
}
const quincas: SearchResult = { id: 'quincas', title: 'Quincas Borba', author: 'Machado de Assis' }
const bras: SearchResult = {
  id: 'bras',
  title: 'Memórias Póstumas de Brás Cubas',
  author: 'Machado de Assis',
}

const groups = [
  { label: 'No seu acervo', items: [dom, quincas] },
  { label: 'No catálogo', items: [bras] },
]

function setup(props: Partial<Parameters<typeof SearchDialog>[0]> = {}) {
  const user = userEvent.setup()
  const onOpenChange = vi.fn()
  const onSelect = vi.fn()
  const view = render(
    <SearchDialog
      open
      onOpenChange={onOpenChange}
      query="machado"
      onQueryChange={() => {}}
      groups={groups}
      onSelect={onSelect}
      {...props}
    />
  )
  return { user, onOpenChange, onSelect, ...view }
}

describe('SearchDialog', () => {
  it('Ctrl+K alterna a abertura', async () => {
    const { user, onOpenChange, rerender } = setup({ open: false })

    expect(screen.queryByRole('dialog')).toBeNull()

    await user.keyboard('{Control>}k{/Control}')
    expect(onOpenChange).toHaveBeenLastCalledWith(true)

    rerender(
      <SearchDialog
        open
        onOpenChange={onOpenChange}
        query=""
        onQueryChange={() => {}}
        groups={[]}
        onSelect={() => {}}
      />
    )

    await user.keyboard('{Control>}k{/Control}')
    expect(onOpenChange).toHaveBeenLastCalledWith(false)

    await user.keyboard('{Meta>}k{/Meta}')
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(onOpenChange).toHaveBeenCalledTimes(3)
  })

  it('com menos de 3 caracteres mostra a dica e nenhuma lista', () => {
    setup({ query: 'ma' })

    expect(
      screen.getByText('Digite pelo menos 3 letras do título ou do autor, ou o ISBN.')
    ).toBeTruthy()
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(screen.queryAllByRole('option')).toHaveLength(0)
    expect(screen.getByRole('combobox').getAttribute('aria-expanded')).toBe('false')
  })

  it('mostra os grupos com resultados e ignora os vazios', () => {
    setup({
      groups: [
        { label: 'No seu acervo', items: [dom, quincas] },
        { label: 'No catálogo', items: [] },
        { label: 'Em outras fontes', items: [bras] },
      ],
    })

    expect(screen.getByRole('dialog', { name: 'Busca' })).toBeTruthy()
    expect(screen.getAllByRole('group')).toHaveLength(2)
    expect(screen.getByRole('group', { name: 'No seu acervo' })).toBeTruthy()
    expect(screen.getByRole('group', { name: 'Em outras fontes' })).toBeTruthy()
    expect(screen.queryByText('No catálogo')).toBeNull()

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    expect(options[0].textContent).toContain('Dom Casmurro')
    expect(options[0].textContent).toContain('Machado de Assis · 1899')
    expect(options[0].textContent).toContain('Lido')
    expect(options[2].textContent).toContain('Memórias Póstumas de Brás Cubas')
  })

  it('setas movem o resultado ativo e voltam ao início', async () => {
    const { user } = setup()
    const input = screen.getByRole('combobox', { name: 'Buscar título, autor ou ISBN' })
    const options = screen.getAllByRole('option')

    function expectActive(index: number) {
      expect(input.getAttribute('aria-activedescendant')).toBe(options[index].id)
      options.forEach((option, i) =>
        expect(option.getAttribute('aria-selected')).toBe(i === index ? 'true' : 'false')
      )
    }

    expect(document.activeElement).toBe(input)
    expectActive(0)

    await user.keyboard('{ArrowDown}')
    expectActive(1)

    await user.keyboard('{ArrowDown}')
    expectActive(2)

    await user.keyboard('{ArrowDown}')
    expectActive(0)

    await user.keyboard('{ArrowUp}')
    expectActive(2)
  })

  it('Enter escolhe o resultado ativo', async () => {
    const { user, onSelect } = setup()

    await user.keyboard('{ArrowDown}{Enter}')

    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(quincas)
  })

  it('sem resultados mostra a mensagem de nada encontrado', () => {
    setup({ query: ' quincas borba ', groups: [{ label: 'No seu acervo', items: [] }] })

    expect(screen.getByText('Nada encontrado para “quincas borba”.')).toBeTruthy()
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('sem resultados mostra o conteúdo de empty', () => {
    setup({
      query: 'quincas borba',
      groups: [],
      empty: <a href="/app/acervo/novo">Cadastrar manualmente</a>,
    })

    expect(screen.getByRole('link', { name: 'Cadastrar manualmente' })).toBeTruthy()
    expect(screen.queryByText(/Nada encontrado/)).toBeNull()
  })

  it('Esc e clique fora fecham', async () => {
    const { user, onOpenChange } = setup()

    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(onOpenChange).toHaveBeenCalledTimes(1)

    const overlay = screen.getByRole('dialog').parentElement as HTMLElement
    await user.click(overlay)
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(onOpenChange).toHaveBeenCalledTimes(2)

    await user.click(screen.getByRole('combobox'))
    expect(onOpenChange).toHaveBeenCalledTimes(2)
  })
})
