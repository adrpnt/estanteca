import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { FilterChip } from './filter-chip'

describe('FilterChip', () => {
  it('expõe aria-pressed e formata a contagem em pt-BR', () => {
    render(
      <>
        <FilterChip label="Impresso" count={1234} selected />
        <FilterChip label="Digital" count={37} />
      </>
    )

    const printed = screen.getByRole('button', { name: /Impresso/ })
    const digital = screen.getByRole('button', { name: /Digital/ })

    expect(printed.getAttribute('aria-pressed')).toBe('true')
    expect(printed.textContent).toContain('1.234')
    expect(digital.getAttribute('aria-pressed')).toBe('false')
    expect(digital.textContent).toContain('37')
  })

  it('acionar o filtro alterna aria-pressed', async () => {
    const user = userEvent.setup()

    function Filters() {
      const [selected, setSelected] = useState(false)
      return (
        <FilterChip
          label="Autografados"
          selected={selected}
          onClick={() => setSelected(!selected)}
        />
      )
    }
    render(<Filters />)

    const chip = screen.getByRole('button', { name: 'Autografados' })
    expect(chip.getAttribute('type')).toBe('button')

    await user.click(chip)
    expect(chip.getAttribute('aria-pressed')).toBe('true')

    await user.click(chip)
    expect(chip.getAttribute('aria-pressed')).toBe('false')
  })
})
