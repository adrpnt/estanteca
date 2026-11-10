'use client'

import { useState, type MouseEvent } from 'react'
import { BookOpen, House, Library, LibraryBig, SlidersHorizontal, UserRound } from 'lucide-react'
import { BottomNav } from '@/components/ui/bottom-nav'
import { Button } from '@/components/ui/button'
import { FilterChip } from '@/components/ui/filter-chip'
import { Rating } from '@/components/ui/rating'
import { SearchDialog, type SearchResult } from '@/components/ui/search-dialog'
import { SearchTrigger } from '@/components/ui/search-trigger'
import { SideNav, type NavItem } from '@/components/ui/side-nav'
import { Toaster } from '@/components/ui/toast'
import { matchesQuery } from '@/lib/search'
import { toast } from '@/lib/toast'
import { catalog, library } from './samples'

const ICON = { size: 20, strokeWidth: 1.5 }

function navItem(
  id: string,
  label: string,
  icon: NavItem['icon'],
  select: (id: string) => void,
  count?: number
): NavItem {
  return {
    id,
    label,
    href: `#${id}`,
    icon,
    count,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      select(id)
    },
  }
}

export function SideNavDemo() {
  const [current, setCurrent] = useState('acervo')
  const [collapsed, setCollapsed] = useState(false)

  const items = [
    navItem('inicio', 'Início', <House {...ICON} />, setCurrent),
    navItem('acervo', 'Acervo', <Library {...ICON} />, setCurrent, 248),
    navItem('estantes', 'Estantes', <LibraryBig {...ICON} />, setCurrent, 12),
    navItem('leituras', 'Leituras', <BookOpen {...ICON} />, setCurrent),
    navItem('perfil', 'Perfil público', <UserRound {...ICON} />, setCurrent),
  ]
  const footer = [navItem('config', 'Configurações', <SlidersHorizontal {...ICON} />, setCurrent)]
  const frame = 'flex h-[420px] overflow-hidden rounded-md border border-line bg-surface'

  return (
    <div className="flex flex-wrap gap-6">
      <div className={frame}>
        <SideNav
          items={items}
          footerItems={footer}
          current={current}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          homeHref="#inicio"
        />
        <div className="w-30" />
      </div>
      <div className={frame}>
        <SideNav
          items={items}
          footerItems={footer}
          current={current}
          collapsed
          homeHref="#inicio"
          aria-label="Principal (recolhida)"
        />
      </div>
    </div>
  )
}

export function BottomNavDemo() {
  const [current, setCurrent] = useState('leituras')

  const items = [
    navItem('inicio', 'Início', <House {...ICON} />, setCurrent),
    navItem('acervo', 'Acervo', <Library {...ICON} />, setCurrent),
    navItem('estantes', 'Estantes', <LibraryBig {...ICON} />, setCurrent),
    navItem('leituras', 'Leituras', <BookOpen {...ICON} />, setCurrent),
    navItem('perfil', 'Perfil', <UserRound {...ICON} />, setCurrent),
  ]

  return (
    <div className="max-w-[390px] overflow-hidden rounded-md border border-line">
      <BottomNav items={items} current={current} aria-label="Principal (celular)" />
    </div>
  )
}

const FILTERS = [
  { id: 'rom', label: 'Romances', count: 42 },
  { id: 'cab', label: 'Cabeceira', count: 8 },
  { id: 'imp', label: 'Impresso', count: 211 },
  { id: 'dig', label: 'Digital', count: 37 },
  { id: 'aut', label: 'Autografados', count: 9 },
]

export function FilterChipDemo() {
  const [selected, setSelected] = useState<Record<string, boolean>>({ rom: true, imp: true })

  return (
    <div role="group" aria-label="Filtros do acervo" className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <FilterChip
          key={filter.id}
          label={filter.label}
          count={filter.count}
          selected={!!selected[filter.id]}
          onClick={() => setSelected({ ...selected, [filter.id]: !selected[filter.id] })}
        />
      ))}
    </div>
  )
}

export function RatingChoice() {
  const [value, setValue] = useState(4)
  return <Rating value={value} onChange={setValue} label="Sua nota para Dom Casmurro" />
}

function search(items: SearchResult[], query: string): SearchResult[] {
  const q = query.trim()
  return items.filter((item) => matchesQuery([item.title, item.author ?? ''], q))
}

const BAR = 'flex items-center gap-6 border-b border-line py-4'
const BRAND = 'font-serif text-xl leading-none font-semibold tracking-[-0.015em] text-ink'

export function SearchTriggerDemo() {
  return (
    <header className={BAR}>
      <span className={BRAND}>Estanteca</span>
      <SearchTrigger />
    </header>
  )
}

export function SearchDialogDemo() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('machado')
  const [opened, setOpened] = useState<string | null>(null)

  return (
    <div>
      <header className={BAR}>
        <span className={BRAND}>Estanteca</span>
        <SearchTrigger onClick={() => setOpen(true)} />
      </header>
      <p className="my-4 text-sm leading-[18px] text-ink-muted">
        {opened ? `Abrindo ${opened}.` : 'Use ⌘K ou Ctrl+K para abrir e fechar a busca.'}
      </p>
      <SearchDialog
        open={open}
        onOpenChange={setOpen}
        query={query}
        onQueryChange={setQuery}
        groups={[
          { label: 'No seu acervo', items: search(library, query) },
          { label: 'No catálogo', items: search(catalog, query) },
        ]}
        onSelect={(item) => {
          setOpened(item.title)
          setOpen(false)
        }}
        empty={
          <span>
            Nada encontrado para “{query.trim()}”.{' '}
            <a href="#cadastro" className="text-accent">
              Cadastrar manualmente
            </a>
          </span>
        }
      />
    </div>
  )
}

function noop() {}

function showToasts() {
  toast.success('Exemplar adicionado ao acervo.', { action: { label: 'Desfazer', onClick: noop } })
  toast.success('Dom Casmurro foi para a estante Cabeceira.')
  toast.error('Não foi possível enviar a capa: o arquivo passa de 10 MB.', {
    action: { label: 'Escolher outro', onClick: noop },
  })
}

export function ToastDemo() {
  return (
    <>
      <Button onClick={showToasts}>Mostrar avisos</Button>
      <Toaster />
    </>
  )
}
