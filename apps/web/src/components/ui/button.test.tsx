import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './button'

const plus = (
  <svg data-testid="icon" viewBox="0 0 24 24">
    <path d="M12 5v14" />
  </svg>
)

describe('Button', () => {
  it('usa type button e a variante secondary por padrão', () => {
    render(
      <>
        <Button>Criar estante</Button>
        <Button variant="secondary">Mover de estante</Button>
        <Button variant="primary">Adicionar exemplar</Button>
        <Button type="submit">Salvar exemplar</Button>
      </>
    )

    const standard = screen.getByRole('button', { name: 'Criar estante' })
    const secondary = screen.getByRole('button', { name: 'Mover de estante' })
    const primary = screen.getByRole('button', { name: 'Adicionar exemplar' })

    expect(standard.getAttribute('type')).toBe('button')
    expect(standard.className).toBe(secondary.className)
    expect(standard.className).not.toBe(primary.className)
    expect(screen.getByRole('button', { name: 'Salvar exemplar' }).getAttribute('type')).toBe(
      'submit'
    )
  })

  it('só com ícone usa o aria-label como nome acessível', () => {
    render(<Button icon={plus} aria-label="Mais ações" />)

    const button = screen.getByRole('button', { name: 'Mais ações' })
    expect(button.contains(screen.getByTestId('icon'))).toBe(true)
    expect(button.textContent).toBe('')
  })

  it('desabilitado não chama onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Salvar exemplar
      </Button>
    )

    const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Salvar exemplar' })
    await user.click(button)

    expect(button.disabled).toBe(true)
    expect(onClick).not.toHaveBeenCalled()
  })
})
