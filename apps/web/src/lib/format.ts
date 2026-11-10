const integer = new Intl.NumberFormat('pt-BR')
const upToOneDecimal = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** 1234 → "1.234" */
export function formatCount(n: number): string {
  return integer.format(n)
}

/** 1 → "1 livro"; 23 → "23 livros" */
export function formatBooks(n: number): string {
  return `${formatCount(n)} ${n === 1 ? 'livro' : 'livros'}`
}

/** 4.5 → "4,5"; 4 → "4" */
export function formatRating(value: number): string {
  return upToOneDecimal.format(value)
}

/** Meio ponto mais próximo, entre 0 e 5. */
export function roundRating(value: number): number {
  return clamp(Math.round(value * 2) / 2, 0, 5)
}

/** Percentual inteiro de `current` em `total`, entre 0 e 100. */
export function progress(current: number, total: number): number {
  return Math.round(clamp((current / total) * 100, 0, 100))
}
