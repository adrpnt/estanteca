import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Stat } from './stat'

describe('Stat', () => {
  it('sensível começa oculto e mostra o valor ao acionar o botão', async () => {
    const user = userEvent.setup()
    render(
      <Stat
        label="Investido"
        value="R$ 6.940,50"
        hint="Só você vê este valor"
        sensitive
        mask="R$ ••••"
      />
    )

    expect(screen.getByText('R$ ••••')).toBeTruthy()
    expect(screen.getByText('Valor oculto')).toBeTruthy()
    expect(screen.queryByText('R$ 6.940,50')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Mostrar valor' }))

    expect(screen.getByText('R$ 6.940,50')).toBeTruthy()
    expect(screen.queryByText('R$ ••••')).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Ocultar valor' }))

    expect(screen.getByText('R$ ••••')).toBeTruthy()
    expect(screen.queryByText('R$ 6.940,50')).toBeNull()
  })

  it('mostra o valor sem botão quando não é sensível', () => {
    render(<Stat label="Exemplares" value="248" hint="12 novos este mês" />)

    expect(screen.getByText('Exemplares')).toBeTruthy()
    expect(screen.getByText('248')).toBeTruthy()
    expect(screen.getByText('12 novos este mês')).toBeTruthy()
    expect(screen.queryByRole('button')).toBeNull()
  })
})
