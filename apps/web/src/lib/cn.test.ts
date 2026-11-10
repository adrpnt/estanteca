import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('junta as classes separadas por espaço', () => {
    expect(cn('px-4', 'py-2', 'rounded-md')).toBe('px-4 py-2 rounded-md')
  })

  it('ignora valores falsos', () => {
    expect(cn('px-4', false, null, undefined, '', 'text-sm')).toBe('px-4 text-sm')
  })
})
