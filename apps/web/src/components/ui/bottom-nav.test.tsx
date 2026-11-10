import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BottomNav } from './bottom-nav'
import type { NavItem } from './side-nav'

const items: NavItem[] = [
  { id: 'inicio', label: 'Início', href: '/app', icon: <svg /> },
  { id: 'acervo', label: 'Acervo', href: '/app/acervo', icon: <svg /> },
  { id: 'estantes', label: 'Estantes', href: '/app/estantes', icon: <svg /> },
  { id: 'leituras', label: 'Leituras', href: '/app/leituras', icon: <svg /> },
  { id: 'perfil', label: 'Perfil', href: '/app/perfil', icon: <svg /> },
]

describe('BottomNav', () => {
  it('marca só o item atual com aria-current', () => {
    render(<BottomNav items={items} current="leituras" />)

    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeTruthy()
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(5)
    const current = screen.getAllByRole('link', { current: 'page' })
    expect(current).toHaveLength(1)
    expect(current[0]).toBe(screen.getByRole('link', { name: 'Leituras' }))
    expect(current[0].getAttribute('href')).toBe('/app/leituras')
  })
})
