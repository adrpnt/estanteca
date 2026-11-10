import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SideNav, type NavItem } from './side-nav'

const items: NavItem[] = [
  { id: 'inicio', label: 'Início', href: '/app', icon: <svg /> },
  { id: 'acervo', label: 'Acervo', href: '/app/acervo', icon: <svg />, count: 248 },
  { id: 'estantes', label: 'Estantes', href: '/app/estantes', icon: <svg />, count: 12 },
]
const footerItems: NavItem[] = [
  { id: 'config', label: 'Configurações', href: '/app/config', icon: <svg /> },
]

describe('SideNav', () => {
  it('marca só o item atual com aria-current', () => {
    render(<SideNav items={items} footerItems={footerItems} current="acervo" />)

    const links = screen.getAllByRole('link', { current: 'page' })
    expect(links).toHaveLength(1)
    expect(links[0].getAttribute('href')).toBe('/app/acervo')
    expect(screen.getByRole('link', { name: 'Início' }).getAttribute('aria-current')).toBeNull()
    expect(
      screen.getByRole('link', { name: 'Configurações' }).getAttribute('aria-current')
    ).toBeNull()
  })

  it('recolhida mantém o rótulo como nome do link', () => {
    render(<SideNav items={items} footerItems={footerItems} current="inicio" collapsed />)

    expect(screen.getByRole('link', { name: 'Início' }).getAttribute('href')).toBe('/app')
    expect(screen.getByRole('link', { name: 'Acervo' }).getAttribute('href')).toBe('/app/acervo')
    expect(screen.getByRole('link', { name: 'Estantes' }).getAttribute('href')).toBe(
      '/app/estantes'
    )
    expect(screen.getByRole('link', { name: 'Configurações' }).getAttribute('href')).toBe(
      '/app/config'
    )
    expect(screen.getByRole('link', { name: 'Estanteca, início' })).toBeTruthy()
  })

  it('recolhida mostra o rótulo numa dica quando o link recebe foco', async () => {
    const user = userEvent.setup()
    render(<SideNav items={items} current="inicio" collapsed />)

    await user.tab()
    await user.tab()

    expect(screen.getByRole('link', { name: 'Início' })).toBe(document.activeElement)
    expect(screen.getByRole('tooltip').textContent).toBe('Início')
  })

  it('o botão de recolher chama onCollapsedChange com o oposto', async () => {
    const user = userEvent.setup()
    const onCollapsedChange = vi.fn()
    const { rerender } = render(
      <SideNav items={items} collapsed={false} onCollapsedChange={onCollapsedChange} />
    )

    await user.click(screen.getByRole('button', { name: 'Recolher menu' }))
    expect(onCollapsedChange).toHaveBeenLastCalledWith(true)

    rerender(<SideNav items={items} collapsed onCollapsedChange={onCollapsedChange} />)

    await user.click(screen.getByRole('button', { name: 'Expandir menu' }))
    expect(onCollapsedChange).toHaveBeenLastCalledWith(false)
  })
})
