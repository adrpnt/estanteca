import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ActionMenu, type ActionMenuItem } from './action-menu'

function acoes(onMove = () => {}): ActionMenuItem[] {
  return [
    { label: 'Editar' },
    { label: 'Mover de estante', onSelect: onMove },
    { label: 'Marcar como lendo' },
    { label: 'Emprestar', hidden: true },
    'separator',
    { label: 'Remover do acervo', danger: true },
  ]
}

describe('ActionMenu', () => {
  it('abre com os itens visíveis e sem os escondidos', async () => {
    const user = userEvent.setup()
    render(<ActionMenu items={acoes()} />)

    expect(screen.queryByRole('menu')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Ações do exemplar' }))

    const menu = screen.getByRole('menu', { name: 'Ações do exemplar' })
    expect(menu).toBeTruthy()
    expect(screen.getAllByRole('menuitem').map((item) => item.textContent)).toEqual([
      'Editar',
      'Mover de estante',
      'Marcar como lendo',
      'Remover do acervo',
    ])
    expect(screen.queryByRole('menuitem', { name: 'Emprestar' })).toBeNull()
    expect(screen.getByRole('separator')).toBeTruthy()
  })

  it('escolher um item chama onSelect e fecha o menu', async () => {
    const user = userEvent.setup()
    const onMove = vi.fn()
    render(<ActionMenu items={acoes(onMove)} />)

    await user.click(screen.getByRole('button', { name: 'Ações do exemplar' }))
    await user.click(screen.getByRole('menuitem', { name: 'Mover de estante' }))

    expect(onMove).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).toBeNull()
  })

  it('Esc fecha e devolve o foco ao botão', async () => {
    const user = userEvent.setup()
    render(<ActionMenu items={acoes()} />)
    const button = screen.getByRole('button', { name: 'Ações do exemplar' })

    button.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('menu')).toBeTruthy()
    expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'Editar' }))

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('menu')).toBeNull()
    expect(document.activeElement).toBe(button)
  })
})
