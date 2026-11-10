import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Ellipsis, Plus } from 'lucide-react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { ActionMenu, type ActionMenuItem } from '@/components/ui/action-menu'
import { BookCard } from '@/components/ui/book-card'
import { BookCover } from '@/components/ui/book-cover'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Rating } from '@/components/ui/rating'
import { Shelf } from '@/components/ui/shelf'
import { Skeleton } from '@/components/ui/skeleton'
import { Stat } from '@/components/ui/stat'
import { StatusChip } from '@/components/ui/status-chip'
import { Stepper } from '@/components/ui/stepper'
import { TextField } from '@/components/ui/text-field'
import {
  BottomNavDemo,
  FilterChipDemo,
  RatingChoice,
  SearchDialogDemo,
  SearchTriggerDemo,
  SideNavDemo,
  ToastDemo,
} from './demos'
import { covers, shelfBooks, tints } from './samples'

export const metadata: Metadata = {
  title: 'Design system · Estanteca',
}

const ICON = { size: 18, strokeWidth: 1.5 }
const NOTE = 'font-mono text-xs leading-[18px] text-ink-muted'
const GRID = 'grid max-w-[600px] grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-x-4 gap-y-6'

const ACTIONS: ActionMenuItem[] = [
  { label: 'Editar' },
  { label: 'Mover de estante' },
  { label: 'Marcar como lendo' },
  { label: 'Emprestar', hidden: true },
  'separator',
  { label: 'Remover do acervo', danger: true },
]

const STEPS = ['Encontrar a obra', 'Escolher a edição', 'Dados do exemplar']

function Section({ name, children }: { name: string; children: ReactNode }) {
  const id = `componente-${name}`
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4 border-t border-line pt-8">
      <h2 id={id} className="m-0 font-serif text-2xl leading-tight font-semibold text-ink">
        {name}
      </h2>
      {children}
    </section>
  )
}

function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="m-0 flex flex-col gap-2.5">
      {children}
      <figcaption className="font-mono text-[11px] leading-4 text-ink-muted">{caption}</figcaption>
    </figure>
  )
}

function CardMenu() {
  return (
    <Button
      variant="ghost"
      size="sm"
      icon={<Ellipsis {...ICON} />}
      aria-label="Ações do exemplar"
    />
  )
}

/** Vitrine dos componentes, só em desenvolvimento. */
export default function DesignPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <main className="mx-auto box-border flex w-full max-w-5xl flex-col gap-10 px-4 py-10 font-sans text-ink">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 font-serif text-4xl leading-tight font-semibold">Design system</h1>
          <p className="m-0 mt-1 text-sm text-ink-muted">
            Os componentes da Estanteca nos estados das previews.
          </p>
        </div>
        <ThemeSwitcher />
      </header>

      <Section name="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" icon={<Plus {...ICON} />}>
            Adicionar exemplar
          </Button>
          <Button>Criar estante</Button>
          <Button variant="ghost">Cancelar</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">
            Marcar como lido
          </Button>
          <Button size="sm">Mover de estante</Button>
          <Button variant="ghost" size="sm" icon={<Ellipsis {...ICON} />} aria-label="Mais ações" />
          <Button disabled>Salvar exemplar</Button>
        </div>
      </Section>

      <Section name="ActionMenu">
        <div className="max-w-[640px]">
          <BookCard
            layout="list"
            title="Dom Casmurro"
            author="Machado de Assis"
            meta="Impresso · 1899"
            status="read"
            href="#dom-casmurro"
            actions={<ActionMenu items={ACTIONS} />}
          />
          <BookCard
            layout="list"
            title="Iracema"
            author="José de Alencar"
            meta="Impresso · 1865"
            status="reading"
            href="#iracema"
            actions={<ActionMenu items={ACTIONS} />}
          />
          <BookCard
            layout="list"
            title="O Cortiço"
            author="Aluísio Azevedo"
            meta="Digital · 1890"
            href="#o-cortico"
            actions={<ActionMenu items={ACTIONS} />}
          />
        </div>
      </Section>

      <Section name="TextField">
        <form className="grid max-w-[760px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-4 gap-y-5">
          <TextField id="tf-titulo" label="Título" required defaultValue="Dom Casmurro" />
          <TextField
            id="tf-isbn"
            label="ISBN"
            mono
            inputMode="numeric"
            placeholder="978-85-…"
            hint="13 dígitos, com ou sem hífens."
          />
          <TextField
            id="tf-valor"
            label="Valor pago (R$)"
            prefix="R$"
            inputMode="decimal"
            defaultValue="54,90"
          />
          <TextField
            id="tf-codigo"
            label="Código do exemplar"
            required
            mono
            defaultValue="0042"
            error="Já existe um exemplar com o código 0042. Sugestão: 0249."
          />
          <TextField
            id="tf-autores"
            label="Autores"
            readOnly
            defaultValue="Machado de Assis"
            hint="Esta obra já está no acervo de outros leitores, então os autores não podem ser editados aqui."
          />
        </form>
      </Section>

      <Section name="FilterChip">
        <FilterChipDemo />
      </Section>

      <Section name="Stepper">
        <div className="grid max-w-[640px] gap-6">
          <Stepper steps={STEPS} current={1} aria-label="Etapas do cadastro" />
          <div className="max-w-[300px]">
            <p className={`m-0 mb-2 ${NOTE}`}>Em contêiner estreito</p>
            <Stepper steps={STEPS} current={1} aria-label="Etapas do cadastro" />
          </div>
        </div>
      </Section>

      <Section name="SideNav">
        <SideNavDemo />
      </Section>

      <Section name="BottomNav">
        <BottomNavDemo />
      </Section>

      <Section name="SearchTrigger">
        <SearchTriggerDemo />
      </Section>

      <Section name="SearchDialog">
        <SearchDialogDemo />
      </Section>

      <Section name="BookCover">
        <div className="flex flex-wrap items-end gap-6">
          <Figure caption="lg · imagem">
            <BookCover
              size="lg"
              src={covers.domCasmurro}
              alt="Capa de Dom Casmurro, de Machado de Assis"
            />
          </Figure>
          <Figure caption="md · imagem">
            <BookCover
              size="md"
              src={covers.cortico}
              alt="Capa de O Cortiço, de Aluísio Azevedo"
            />
          </Figure>
          <Figure caption="md · sem capa">
            <BookCover size="md" title="Triste Fim de Policarpo Quaresma" author="Lima Barreto" />
          </Figure>
          <Figure caption="sm · sem capa">
            <BookCover size="sm" title="Os Sertões" author="Euclides da Cunha" />
          </Figure>
          <Figure caption="xs · sem capa">
            <BookCover size="xs" title="Iracema" />
          </Figure>
        </div>
      </Section>

      <Section name="BookCard">
        <div className="grid gap-8">
          <div className={GRID}>
            <BookCard
              title="Dom Casmurro"
              author="Machado de Assis"
              cover={covers.domCasmurro}
              tint={tints.domCasmurro}
              status="read"
              href="#dom-casmurro"
            />
            <BookCard
              title="Iracema"
              author="José de Alencar"
              cover={covers.iracema}
              tint={tints.iracema}
              status="reading"
              href="#iracema"
            />
            <BookCard
              title="Triste Fim de Policarpo Quaresma"
              author="Lima Barreto"
              status="want"
              href="#policarpo"
            />
          </div>
          <div className="max-w-[640px]">
            <BookCard
              layout="list"
              title="Os Sertões"
              author="Euclides da Cunha"
              cover={covers.sertoes}
              meta="Impresso · 1902"
              status="loaned"
              href="#os-sertoes"
              actions={<CardMenu />}
            />
            <BookCard
              layout="list"
              title="Quincas Borba"
              author="Machado de Assis"
              cover={covers.quincas}
              meta="Digital · 1891"
              status="overdue"
              statusLabel="Atrasado há 5 dias"
              href="#quincas-borba"
              actions={<CardMenu />}
            />
            <BookCard
              layout="list"
              title="O Ateneu"
              author="Raul Pompeia"
              meta="Impresso · 1888"
              href="#o-ateneu"
              actions={<CardMenu />}
            />
          </div>
        </div>
      </Section>

      <Section name="Shelf">
        <Shelf
          title="Cabeceira"
          description="Os livros que estou lendo ou que vêm logo em seguida."
          count={23}
          headingLevel={3}
          action={
            <Button variant="ghost" size="sm">
              Ver estante
            </Button>
          }
        >
          {shelfBooks.map((book) => (
            <BookCover
              key={book.title}
              size="md"
              src={book.src}
              title={book.title}
              author={book.author}
              alt={book.title}
            />
          ))}
        </Shelf>
      </Section>

      <Section name="StatusChip">
        <div className="flex flex-wrap items-center gap-2">
          <StatusChip status="want" />
          <StatusChip status="reading" />
          <StatusChip status="read" />
          <StatusChip status="paused" />
          <StatusChip status="abandoned" />
          <StatusChip status="loaned" />
          <StatusChip status="overdue" />
          <StatusChip status="overdue" label="Atrasado há 5 dias" />
        </div>
      </Section>

      <Section name="Rating">
        <div className="grid grid-cols-[max-content_1fr] items-center gap-x-6 gap-y-4">
          <span className={NOTE}>exibição</span>
          <div>
            <Rating value={4.5} />
          </div>
          <span className={NOTE}>compacta</span>
          <div>
            <Rating value={3} size="sm" />
          </div>
          <span className={NOTE}>escolha</span>
          <div>
            <RatingChoice />
          </div>
        </div>
      </Section>

      <Section name="ProgressBar">
        <div className="grid max-w-[420px] gap-6">
          <ProgressBar label="Memórias Póstumas de Brás Cubas" current={148} total={256} />
          <ProgressBar label="Meta de 2026: 18 de 30 livros" value={60} />
        </div>
      </Section>

      <Section name="Stat">
        <div className="grid max-w-[560px] grid-cols-2 gap-4">
          <Stat label="Exemplares" value="248" hint="12 novos este mês" />
          <Stat label="Lidos" value="61%" hint="151 de 248 exemplares" />
          <Stat label="Autografados" value="9" hint="4% do acervo" />
          <Stat
            label="Investido"
            value="R$ 6.940,50"
            hint="Só você vê este valor"
            sensitive
            mask="R$ ••••"
          />
        </div>
      </Section>

      <Section name="EmptyState">
        <EmptyState
          level={3}
          title="Sua estante ainda está vazia"
          description="Adicione o primeiro livro pelo ISBN ou pelo título. Ele aparece aqui assim que for cadastrado."
          action={<Button variant="primary">Adicionar exemplar</Button>}
        />
      </Section>

      <Section name="Toast">
        <div className="flex flex-col items-start gap-2">
          <ToastDemo />
        </div>
      </Section>

      <Section name="Skeleton">
        <div aria-busy="true" className="grid gap-8">
          <span className="sr-only" role="status">
            Carregando acervo
          </span>
          <div className={GRID}>
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
          <div className="max-w-[640px]">
            <Skeleton variant="row" />
            <Skeleton variant="row" />
          </div>
          <div className="max-w-[420px]">
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
      </Section>
    </main>
  )
}
