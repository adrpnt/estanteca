import type { SearchResult } from '@/components/ui/search-dialog'

type Shape = 'sol' | 'faixas' | 'arco' | 'losango'

function art(shape: Shape, fg: string): string {
  switch (shape) {
    case 'sol':
      return `<circle cx="138" cy="186" r="46" fill="${fg}"/>`
    case 'faixas':
      return `<rect y="156" width="200" height="12" fill="${fg}"/><rect y="180" width="200" height="12" fill="${fg}" fill-opacity=".6"/><rect y="204" width="200" height="12" fill="${fg}" fill-opacity=".3"/>`
    case 'arco':
      return `<path d="M36 246a64 64 0 0 1 128 0" fill="none" stroke="${fg}" stroke-width="14"/>`
    case 'losango':
      return `<path d="M100 136l44 56-44 56-44-56z" fill="none" stroke="${fg}" stroke-width="3"/>`
  }
}

/** Capa de exemplo: arte abstrata para obras em domínio público, como nas previews do design system. */
function cover(lines: string[], author: string, bg: string, fg: string, shape: Shape): string {
  const title = lines
    .map(
      (line, i) =>
        `<text x="18" y="${46 + i * 26}" font-family="Georgia, serif" font-size="22" font-weight="700" fill="${fg}">${line}</text>`
    )
    .join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><rect width="200" height="300" fill="${bg}"/>${art(shape, fg)}${title}<text x="18" y="282" font-family="Helvetica, Arial, sans-serif" font-size="13" fill="${fg}">${author}</text></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export const covers = {
  domCasmurro: cover(['Dom', 'Casmurro'], 'Machado de Assis', '#23324a', '#f1d9a7', 'sol'),
  bras: cover(
    ['Memórias', 'Póstumas de', 'Brás Cubas'],
    'Machado de Assis',
    '#e8dcc0',
    '#2a2420',
    'losango'
  ),
  cortico: cover(['O Cortiço'], 'Aluísio Azevedo', '#b5452d', '#f7e8d4', 'faixas'),
  iracema: cover(['Iracema'], 'José de Alencar', '#2f5d3a', '#e9e2c6', 'arco'),
  sertoes: cover(['Os Sertões'], 'Euclides da Cunha', '#c99a3b', '#2a1f10', 'sol'),
  quincas: cover(['Quincas', 'Borba'], 'Machado de Assis', '#4b2f4f', '#efd8e4', 'faixas'),
  ateneu: cover(['O Ateneu'], 'Raul Pompeia', '#1f1d1a', '#e9e4da', 'arco'),
}

export const tints = {
  domCasmurro: '#23324a',
  iracema: '#2f5d3a',
}

/** Livros da estante Cabeceira; sem `src`, a capa é a tipográfica. */
export const shelfBooks: { title: string; src?: string; author?: string }[] = [
  { title: 'Dom Casmurro', src: covers.domCasmurro },
  { title: 'Memórias Póstumas de Brás Cubas', src: covers.bras },
  { title: 'O Cortiço', src: covers.cortico },
  { title: 'Iracema', src: covers.iracema },
  { title: 'Triste Fim de Policarpo Quaresma', author: 'Lima Barreto' },
  { title: 'Os Sertões', src: covers.sertoes },
  { title: 'Quincas Borba', src: covers.quincas },
  { title: 'O Ateneu', src: covers.ateneu },
]

export const library: SearchResult[] = [
  {
    id: 'dom',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    meta: '1899',
    status: 'read',
    cover: covers.domCasmurro,
  },
  {
    id: 'quincas',
    title: 'Quincas Borba',
    author: 'Machado de Assis',
    meta: '1891',
    status: 'reading',
  },
  {
    id: 'iracema',
    title: 'Iracema',
    author: 'José de Alencar',
    meta: '1865',
    cover: covers.iracema,
  },
  { id: 'cortico', title: 'O Cortiço', author: 'Aluísio Azevedo', meta: '1890', status: 'want' },
]

export const catalog: SearchResult[] = [
  {
    id: 'bras',
    title: 'Memórias Póstumas de Brás Cubas',
    author: 'Machado de Assis',
    meta: '1881',
    cover: covers.bras,
  },
  { id: 'alienista', title: 'O Alienista', author: 'Machado de Assis', meta: '1882' },
  { id: 'esau', title: 'Esaú e Jacó', author: 'Machado de Assis', meta: '1904' },
  { id: 'sertoes', title: 'Os Sertões', author: 'Euclides da Cunha', meta: '1902' },
]
