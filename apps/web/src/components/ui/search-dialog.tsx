'use client'

import { useEffect, useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Search } from 'lucide-react'
import { Dialog } from 'radix-ui'
import { cn } from '@/lib/cn'
import { BookCover } from './book-cover'
import { StatusChip, type LoanStatus, type ReadingStatus } from './status-chip'

export type SearchResult = {
  id: string
  title: string
  author?: string
  /** Linha extra depois do autor: "1881", "Impresso". */
  meta?: string
  cover?: string
  status?: ReadingStatus | LoanStatus
  href?: string
}

type SearchDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  query: string
  onQueryChange: (query: string) => void
  /** Ex.: [{ label: 'No seu acervo', items }, { label: 'No catálogo', items }]. */
  groups: { label: string; items: SearchResult[] }[]
  onSelect: (item: SearchResult) => void
  loading?: boolean
  /** Mínimo de caracteres antes de buscar. */
  minChars?: number
  hint?: ReactNode
  /** Conteúdo quando nada é encontrado (texto e ação de cadastro manual). */
  empty?: ReactNode
  /** Registra ⌘K / Ctrl+K na janela. */
  hotkey?: boolean
  placeholder?: string
}

const KBD =
  'box-border inline-flex h-[22px] min-w-[22px] items-center justify-center rounded-[4px] border border-line bg-surface px-1.5 font-mono text-xs leading-none font-medium text-ink-muted'
const NOTE = 'm-0 px-4 py-6 text-center font-sans text-sm leading-5 text-ink-muted'

/** Busca global (⌘K / Ctrl+K) com resultados agrupados. Não busca nada: recebe os grupos prontos. */
export function SearchDialog({
  open,
  onOpenChange,
  query,
  onQueryChange,
  groups,
  onSelect,
  loading = false,
  minChars = 3,
  hint,
  empty,
  hotkey = true,
  placeholder = 'Título, autor ou ISBN',
}: SearchDialogProps) {
  const baseId = useId()
  const listId = `${baseId}list`
  const optionId = (index: number) => `${baseId}option${index}`

  const filled = groups.filter((group) => group.items.length > 0)
  const results = filled.flatMap((group) => group.items)
  const q = query.trim()
  const tooShort = q.length < minChars
  const showList = !tooShort && results.length > 0

  // O resultado ativo volta ao primeiro quando a busca ou a lista mudam.
  const resetKey = `${query}|${results.length}`
  const [active, setActive] = useState(0)
  const [activeKey, setActiveKey] = useState(resetKey)
  if (activeKey !== resetKey) {
    setActiveKey(resetKey)
    setActive(0)
  }

  useEffect(() => {
    if (!hotkey) return
    function onKey(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hotkey, open, onOpenChange])

  useEffect(() => {
    if (open) document.getElementById(optionId(active))?.scrollIntoView({ block: 'nearest' })
  })

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!showList) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((active + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((active - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      onSelect(results[active])
    }
  }

  let body: ReactNode
  if (tooShort) {
    body = (
      <p className={NOTE}>
        {hint ?? `Digite pelo menos ${minChars} letras do título ou do autor, ou o ISBN.`}
      </p>
    )
  } else if (!showList) {
    body = (
      <div role="status" className={NOTE}>
        {loading ? 'Buscando…' : (empty ?? `Nada encontrado para “${q}”.`)}
      </div>
    )
  } else {
    let index = -1
    body = (
      <div id={listId} role="listbox" aria-label="Resultados">
        {filled.map((group, g) => {
          const labelId = `${baseId}group${g}`
          return (
            <div key={labelId} role="group" aria-labelledby={labelId} className="mt-2 first:mt-0">
              <div
                id={labelId}
                role="presentation"
                className="px-2 pt-2 pb-1 font-sans text-xs leading-4 font-medium tracking-[0.02em] text-ink-muted"
              >
                {group.label}
              </div>
              {group.items.map((item) => {
                index++
                const i = index
                return (
                  <div
                    key={`${g}-${item.id}`}
                    id={optionId(i)}
                    role="option"
                    aria-selected={i === active}
                    onMouseMove={() => i !== active && setActive(i)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => onSelect(item)}
                    className={cn(
                      'grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-sm p-2',
                      i === active &&
                        'bg-[color-mix(in_oklab,var(--color-surface-raised)_90%,var(--color-ink))]'
                    )}
                  >
                    <BookCover
                      size="xs"
                      src={item.cover}
                      title={item.title}
                      className="[&_span]:text-sm"
                      style={{ width: 32, boxShadow: 'none' }}
                    />
                    <div className="grid min-w-0">
                      <span className="truncate font-serif text-[15px] leading-5 font-semibold text-ink">
                        {item.title}
                      </span>
                      <span className="truncate font-sans text-[13px] leading-[18px] text-ink-muted">
                        {[item.author, item.meta].filter(Boolean).join(' · ')}
                      </span>
                    </div>
                    {item.status && <StatusChip status={item.status} />}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 box-border flex items-start justify-center bg-[rgb(20_18_15/0.45)] px-4 pt-[12vh] pb-4 max-[600px]:items-stretch max-[600px]:p-0">
          <Dialog.Content
            aria-describedby={undefined}
            className="box-border flex max-h-[min(560px,76vh)] w-[min(100%,600px)] flex-col overflow-hidden rounded-md border border-line bg-surface-raised shadow-raised outline-none max-[600px]:max-h-none max-[600px]:w-full max-[600px]:rounded-none max-[600px]:border-0 max-[600px]:pt-[env(safe-area-inset-top,0px)]"
          >
            <Dialog.Title className="sr-only">Busca</Dialog.Title>
            <div className="flex items-center gap-3 border-b border-line px-4 text-ink-muted focus-within:shadow-[inset_0_-2px_0_var(--color-accent)]">
              <Search size={20} strokeWidth={1.5} aria-hidden="true" focusable="false" />
              <input
                type="search"
                role="combobox"
                aria-label="Buscar título, autor ou ISBN"
                aria-autocomplete="list"
                aria-expanded={showList}
                aria-controls={showList ? listId : undefined}
                aria-activedescendant={showList ? optionId(active) : undefined}
                placeholder={placeholder}
                value={query}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => onQueryChange(event.target.value)}
                onKeyDown={onKeyDown}
                className="h-14 min-w-0 flex-1 appearance-none border-0 bg-transparent p-0 font-sans text-[17px] leading-6 text-ink outline-0 placeholder:text-ink-muted [&::-webkit-search-cancel-button]:hidden"
              />
              <kbd aria-hidden="true" className={KBD}>
                Esc
              </kbd>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-2">{body}</div>
            <div
              aria-hidden="true"
              className="flex flex-wrap gap-4 border-t border-line px-4 py-2 font-sans text-xs leading-[22px] text-ink-muted max-[600px]:hidden [&>span]:inline-flex [&>span]:items-center [&>span]:gap-1"
            >
              <span>
                <kbd className={KBD}>↑</kbd>
                <kbd className={KBD}>↓</kbd> navegar
              </span>
              <span>
                <kbd className={KBD}>Enter</kbd> abrir
              </span>
              <span>
                <kbd className={KBD}>Esc</kbd> fechar
              </span>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
