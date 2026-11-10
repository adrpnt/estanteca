import { describe, expect, it } from 'vitest'
import { formatBooks, formatCount, formatRating, progress, roundRating } from './format'

describe('formatCount', () => {
  it('separa os milhares com ponto', () => {
    expect(formatCount(1234)).toBe('1.234')
    expect(formatCount(1234567)).toBe('1.234.567')
    expect(formatCount(42)).toBe('42')
  })
})

describe('formatBooks', () => {
  it('usa o singular para um livro', () => {
    expect(formatBooks(1)).toBe('1 livro')
  })

  it('usa o plural para os demais e formata o número', () => {
    expect(formatBooks(23)).toBe('23 livros')
    expect(formatBooks(0)).toBe('0 livros')
    expect(formatBooks(1234)).toBe('1.234 livros')
  })
})

describe('formatRating', () => {
  it('usa vírgula decimal', () => {
    expect(formatRating(4.5)).toBe('4,5')
    expect(formatRating(0.5)).toBe('0,5')
  })

  it('mostra notas inteiras sem casa decimal', () => {
    expect(formatRating(4)).toBe('4')
    expect(formatRating(5)).toBe('5')
  })
})

describe('roundRating', () => {
  it('arredonda ao meio ponto e limita entre 0 e 5', () => {
    expect(roundRating(4.3)).toBe(4.5)
    expect(roundRating(4.2)).toBe(4)
    expect(roundRating(4.75)).toBe(5)
    expect(roundRating(3.74)).toBe(3.5)
    expect(roundRating(0.2)).toBe(0)
    expect(roundRating(-1)).toBe(0)
    expect(roundRating(7)).toBe(5)
  })
})

describe('progress', () => {
  it('arredonda o percentual', () => {
    expect(progress(148, 256)).toBe(58)
    expect(progress(1, 3)).toBe(33)
    expect(progress(256, 256)).toBe(100)
  })

  it('limita o percentual entre 0 e 100', () => {
    expect(progress(300, 256)).toBe(100)
    expect(progress(-5, 256)).toBe(0)
  })
})
