import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import DesignPage from './page'

const COMPONENTS = [
  'Button',
  'ActionMenu',
  'TextField',
  'FilterChip',
  'Stepper',
  'SideNav',
  'BottomNav',
  'SearchTrigger',
  'SearchDialog',
  'BookCover',
  'BookCard',
  'Shelf',
  'StatusChip',
  'Rating',
  'ProgressBar',
  'Stat',
  'EmptyState',
  'Toast',
  'Skeleton',
]

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('página /design', () => {
  it('mostra uma seção para cada um dos 19 componentes e o seletor de tema', () => {
    render(<DesignPage />)

    const titles = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(titles).toEqual(COMPONENTS)
    for (const name of COMPONENTS) {
      expect(screen.getByRole('region', { name })).toBeTruthy()
    }

    const theme = screen.getByRole('group', { name: 'Tema' })
    const first = screen.getByRole('region', { name: 'Button' })
    expect(theme.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('chama notFound em produção', () => {
    vi.stubEnv('NODE_ENV', 'production')

    let error: unknown
    try {
      DesignPage()
    } catch (caught) {
      error = caught
    }

    expect(error).toMatchObject({ digest: 'NEXT_HTTP_ERROR_FALLBACK;404' })
  })
})
