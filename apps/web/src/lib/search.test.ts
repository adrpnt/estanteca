import { describe, expect, it } from 'vitest'
import { matchesQuery } from './search'

const iracema = ['Iracema', 'José de Alencar', '978-85-359-0277-6']

describe('matchesQuery', () => {
  it('jose de alencar encontra José de Alencar', () => {
    expect(matchesQuery(iracema, 'jose de alencar')).toBe(true)
    expect(matchesQuery(iracema, 'JOSÉ DE ALENCAR')).toBe(true)
    expect(matchesQuery(['Jose de Alencar'], 'josé')).toBe(true)
  })

  it('busca em qualquer campo', () => {
    expect(matchesQuery(iracema, 'iracema')).toBe(true)
    expect(matchesQuery(iracema, 'alencar')).toBe(true)
    expect(matchesQuery(iracema, '0277')).toBe(true)
  })

  it('não encontra quando nenhum campo corresponde', () => {
    expect(matchesQuery(iracema, 'machado')).toBe(false)
    expect(matchesQuery([], 'iracema')).toBe(false)
  })

  it('busca vazia encontra qualquer livro', () => {
    expect(matchesQuery(iracema, '')).toBe(true)
  })
})
