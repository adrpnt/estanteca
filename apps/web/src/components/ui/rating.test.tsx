import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Rating } from './rating'

function checkedOption() {
  return screen
    .getAllByRole('radio')
    .filter((radio) => (radio as HTMLInputElement).checked)
    .map((radio) => radio.parentElement?.textContent)
}

function RatingField({ initial }: { initial: number }) {
  const [value, setValue] = useState(initial)
  return <Rating value={value} onChange={setValue} label="Sua nota para Dom Casmurro" />
}

describe('Rating', () => {
  it('nomeia a nota com vírgula decimal ou Sem nota', () => {
    const { rerender } = render(<Rating value={4.5} />)
    expect(screen.getByRole('img', { name: 'Nota 4,5 de 5' })).toBeTruthy()

    rerender(<Rating value={3} />)
    expect(screen.getByRole('img', { name: 'Nota 3 de 5' })).toBeTruthy()

    rerender(<Rating value={0} />)
    expect(screen.getByRole('img', { name: 'Sem nota' })).toBeTruthy()
  })

  it('arredonda o valor ao meio ponto entre 0 e 5', () => {
    const { rerender } = render(<Rating value={4.3} />)
    expect(screen.getByRole('img', { name: 'Nota 4,5 de 5' })).toBeTruthy()

    rerender(<Rating value={7} />)
    expect(screen.getByRole('img', { name: 'Nota 5 de 5' })).toBeTruthy()

    rerender(<Rating value={-1} />)
    expect(screen.getByRole('img', { name: 'Sem nota' })).toBeTruthy()
  })

  it('com onChange oferece 10 opções e chama onChange', async () => {
    const user = userEvent.setup()
    render(<RatingField initial={4} />)

    screen.getByRole('radiogroup', { name: 'Sua nota para Dom Casmurro' })
    const names = screen.getAllByRole('radio').map((radio) => radio.parentElement?.textContent)
    expect(names).toEqual([
      '0,5 estrela',
      '1 estrela',
      '1,5 estrela',
      '2 estrelas',
      '2,5 estrelas',
      '3 estrelas',
      '3,5 estrelas',
      '4 estrelas',
      '4,5 estrelas',
      '5 estrelas',
    ])
    expect(checkedOption()).toEqual(['4 estrelas'])

    await user.click(screen.getByRole('radio', { name: '3,5 estrelas' }))

    expect(checkedOption()).toEqual(['3,5 estrelas'])
  })

  it('muda a nota de meio em meio ponto com as setas', async () => {
    const user = userEvent.setup()
    render(<RatingField initial={4} />)

    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: '4 estrelas' }))

    await user.keyboard('{ArrowRight}')
    expect(checkedOption()).toEqual(['4,5 estrelas'])

    await user.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(checkedOption()).toEqual(['3,5 estrelas'])
  })
})
