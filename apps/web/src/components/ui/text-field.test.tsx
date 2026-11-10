import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextField } from './text-field'

describe('TextField', () => {
  it('encontra o campo pelo texto do rótulo', () => {
    render(
      <>
        <TextField label="Título" defaultValue="Dom Casmurro" />
        <TextField id="tf-isbn" label="ISBN" mono />
      </>
    )

    expect(screen.getByLabelText<HTMLInputElement>('Título').value).toBe('Dom Casmurro')
    expect(screen.getByRole('textbox', { name: 'ISBN' }).id).toBe('tf-isbn')
  })

  it('com erro marca aria-invalid e é descrito pelo erro', () => {
    const error = 'Já existe um exemplar com o código 0042. Sugestão: 0249.'
    render(<TextField label="Código do exemplar" error={error} />)

    const input = screen.getByRole('textbox', { name: 'Código do exemplar', description: error })
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(screen.getByText(error)).toBeTruthy()
  })

  it('com dica é descrito pela dica', () => {
    render(
      <>
        <TextField label="ISBN" hint="13 dígitos, com ou sem hífens." />
        <TextField label="Código" hint="Quatro dígitos." error="Código em uso." />
      </>
    )

    const isbn = screen.getByRole('textbox', {
      name: 'ISBN',
      description: '13 dígitos, com ou sem hífens.',
    })
    expect(isbn.hasAttribute('aria-invalid')).toBe(false)
    expect(
      screen.getByRole('textbox', { name: 'Código', description: 'Quatro dígitos. Código em uso.' })
    ).toBeTruthy()
  })

  it('obrigatório marca required e esconde o asterisco', () => {
    render(<TextField label="Título" required />)

    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Título' })
    expect(input.required).toBe(true)

    const asterisk = screen.getByText('*')
    expect(asterisk.closest('label')).toBe(document.querySelector(`label[for="${input.id}"]`))
    expect(asterisk.closest('[aria-hidden="true"]')).not.toBeNull()
  })

  it('mostra o prefixo escondido de leitores de tela', () => {
    render(<TextField label="Valor pago (R$)" prefix="R$" defaultValue="54,90" />)

    const input = screen.getByRole('textbox', { name: 'Valor pago (R$)' })
    const prefix = screen.getByText('R$')
    expect(prefix.closest('[aria-hidden="true"]')).not.toBeNull()
    expect(prefix.parentElement?.contains(input)).toBe(true)
    expect(input.getAttribute('aria-describedby')).toBeNull()
  })
})
