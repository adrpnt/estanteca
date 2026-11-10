import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  it('fica escondido de leitores de tela em todas as variantes', () => {
    for (const variant of ['text', 'cover', 'card', 'row'] as const) {
      const { container, unmount } = render(<Skeleton variant={variant} />)

      expect(container.children).toHaveLength(1)
      expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true')
      expect(container.firstElementChild?.children.length).toBeGreaterThan(0)
      unmount()
    }
  })
})
