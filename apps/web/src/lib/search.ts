/** Texto sem acentos e em minúsculas, para comparar buscas. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

/** Algum dos campos contém a busca, ignorando acentos e maiúsculas. */
export function matchesQuery(fields: string[], query: string): boolean {
  const q = normalize(query)
  return fields.some((field) => normalize(field).includes(q))
}
