import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Stepper } from './stepper'

const steps = ['Encontrar a obra', 'Escolher a edição', 'Dados do exemplar']

function currentStep() {
  return screen.getAllByRole('listitem').filter((item) => item.getAttribute('aria-current'))
}

describe('Stepper', () => {
  it('mostra Etapa 2 de 3 e marca a etapa atual', () => {
    render(<Stepper steps={steps} current={1} aria-label="Etapas do cadastro" />)

    const nav = screen.getByRole('navigation', { name: 'Etapas do cadastro' })
    expect(within(nav).getByText('Etapa 2 de 3')).toBeTruthy()

    const marked = currentStep()
    expect(marked).toHaveLength(1)
    expect(marked[0].getAttribute('aria-current')).toBe('step')
    expect(marked[0].textContent).toContain('Escolher a edição')
  })

  it('anuncia as etapas anteriores como concluídas', () => {
    render(<Stepper steps={steps} current={2} />)

    const [first, second, third] = screen.getAllByRole('listitem')
    expect(first.textContent).toBe('Encontrar a obra (concluída)')
    expect(second.textContent).toBe('Escolher a edição (concluída)')
    expect(third.textContent).not.toContain('concluída')
  })

  it('limita current fora da lista', () => {
    const { rerender } = render(<Stepper steps={steps} current={5} />)
    expect(screen.getByText('Etapa 3 de 3')).toBeTruthy()
    expect(currentStep()[0].textContent).toContain('Dados do exemplar')

    rerender(<Stepper steps={steps} current={-1} />)
    expect(screen.getByText('Etapa 1 de 3')).toBeTruthy()
    expect(currentStep()[0].textContent).toContain('Encontrar a obra')
    expect(screen.queryByText(/concluída/)).toBeNull()
  })
})
