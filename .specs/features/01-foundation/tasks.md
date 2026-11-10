# Fundação do monorepo Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and follow its Execute flow and Critical Rules.** Do not search for skill files by filesystem path. The skill is the source of truth for the full flow (per-task cycle, sub-agent delegation, the walk, check_proofs, the Verifier and the screens sub-agent).

**If the skill cannot be activated, STOP and tell the user - do not proceed without it.**

---

**Design**: `.specs/features/01-foundation/design.md`
**Status**: Approved
**Approved**: 2026-11-10 - user: "Aprovo as tarefas, e a execução será inline, mas não execute nada agora."
**Branch**: uma por fase, com o `gitBranchName` da issue da fase (AD-004)
**Linear**: projeto [Estanteca](https://linear.app/adrpnt/project/estanteca-f9f002f87ec6/overview), milestone "01 · Foundation"; uma issue por fase (PER-50 a PER-56); fluxo de branch e PR em AD-004
**Build**: `npm run build; npm run typecheck; npm run lint`
**Run api**: `npm test -w @estanteca/api -- --reporters=spec`
**Run web**: `npm run test -w @estanteca/web -- --reporter=verbose`

Pré-requisito de todas as execuções da API: `docker compose up -d` (PostgreSQL 18).

---

## Test Coverage Matrix

> Generated from codebase, project guidelines, and spec - confirm before Execute. Guidelines found: none - strong defaults applied. O repositório não tem testes nem guias de teste; a API segue o padrão Japa do starter kit (`tests/functional`, `tests/unit`, `*.spec.ts`) e o web usa Vitest com arquivos `*.test.ts(x)` ao lado do código, como decidido na spec.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
| ---------- | ------------------ | -------------------- | ---------------- | ----------- |
| API - rotas | e2e (Japa functional) | Toda rota da feature: caminho feliz e erro | `apps/api/tests/functional/**/*.spec.ts` | `npm test -w @estanteca/api` |
| API - banco e configuração | integration (Japa) | Conexão, banco de testes separado | `apps/api/tests/integration/**/*.spec.ts` | `npm test -w @estanteca/api` |
| Web - regras (`src/lib`) | unit | Todos os ramos; 1:1 com os critérios; todos os casos de borda listados | `apps/web/src/lib/*.test.ts` | `npm run test -w @estanteca/web` |
| Web - componentes | unit (Testing Library) | 1:1 com os critérios de cada componente, incluindo teclado e nome acessível | `apps/web/src/components/**/*.test.tsx` | `npm run test -w @estanteca/web` |
| Web - tokens e estilos | unit (paridade) | Cada token de cor, raio, sombra e espaçamento, nos dois temas | `apps/web/src/styles/*.test.ts` | `npm run test -w @estanteca/web` |
| Web - páginas | unit | Conteúdo e 404 em produção | `apps/web/src/app/**/*.test.tsx` | `npm run test -w @estanteca/web` |
| Scaffold, configuração, Docker, scripts | none | - (build gate e provas por comando) | - | build gate only |

## Gate Check Commands

> Generated from codebase - confirm before Execute.

| Gate Level | When to Use | Command |
| ---------- | ----------- | ------- |
| Quick | Tarefas só com testes do web | `npm run test -w @estanteca/web` |
| Full | Tarefas com testes da API | `docker compose up -d && npm test -w @estanteca/api` |
| Build | Fim de fase e tarefas de configuração | `npm run build && npm run typecheck && npm run lint && npm test` |

---

## Execution Plan

Phases are ordered and run sequentially - each phase completes before the next begins, and tasks within a phase execute in order.

### Phase 1: Estrutura e API

**Linear**: [PER-50](https://linear.app/adrpnt/issue/PER-50/fase-1-estrutura-e-api) · branch `pntadr/per-50-fase-1-estrutura-e-api`

```
T1 → T2 → T3
```

### Phase 2: Base do web

**Linear**: [PER-51](https://linear.app/adrpnt/issue/PER-51/fase-2-base-do-web) · branch `pntadr/per-51-fase-2-base-do-web`

```
T4 → T5 → T6 → T7
```

### Phase 3: Tokens, fontes e tema

**Linear**: [PER-52](https://linear.app/adrpnt/issue/PER-52/fase-3-tokens-fontes-e-tema) · branch `pntadr/per-52-fase-3-tokens-fontes-e-tema`

```
T8 → T9 → T10 → T11
```

### Phase 4: Regras e componentes de formulário

**Linear**: [PER-53](https://linear.app/adrpnt/issue/PER-53/fase-4-regras-e-componentes-de-formulario) · branch `pntadr/per-53-fase-4-regras-e-componentes-de-formulario`

```
T12 → T13 → T14 → T15 → T16 → T17 → T18
```

### Phase 5: Livro, leitura e painel

**Linear**: [PER-54](https://linear.app/adrpnt/issue/PER-54/fase-5-livro-leitura-e-painel) · branch `pntadr/per-54-fase-5-livro-leitura-e-painel`

```
T19 → T20 → T21 → T22 → T23 → T24 → T25 → T26
```

### Phase 6: Interativos e navegação

**Linear**: [PER-55](https://linear.app/adrpnt/issue/PER-55/fase-6-interativos-e-navegacao) · branch `pntadr/per-55-fase-6-interativos-e-navegacao`

```
T27 → T28 → T29 → T30 → T31 → T32 → T33
```

### Phase 7: Vitrine e documentação

**Linear**: [PER-56](https://linear.app/adrpnt/issue/PER-56/fase-7-vitrine-e-documentacao) · branch `pntadr/per-56-fase-7-vitrine-e-documentacao`

```
T34 → T35
```

---

## Task Breakdown

### T1: Gerar o monorepo a partir do starter kit

**What**: Criar o monorepo com `npm create adonisjs@latest -- --kit=api-monorepo` num diretório temporário e trazê-lo para a raiz, renomeando `apps/backend` para `apps/api` (`@estanteca/api`) e `apps/frontend` para `apps/web` (`@estanteca/web`), atualizando `create-adonisjs.json`, removendo `pnpm-workspace.yaml` e `.yarnrc.yml`, e mesclando o `.gitignore` do kit com o da raiz (incluindo as mudanças do usuário).
**Where**: `package.json` (raiz)
**Depends on**: None
**Reuses**: starter kit API Monorepo
**Requirement**: FOUND-01

**Done when**:

- [x] `npm install` na raiz conclui sem erro, com `package-lock.json`
- [x] `apps/api` e `apps/web` existem com os nomes `@estanteca/api` e `@estanteca/web`
- [x] Gate check passes: `npm run build && npm run typecheck && npm run lint && npm test`

**Status**: ✅ Complete. O kit desta versão já sai só com npm (sem `create-adonisjs.json`, `pnpm-workspace.yaml` e `.yarnrc.yml`). `apps/api/database/schema.ts`, regerado a cada `migration:run`, entrou no `.prettierignore` da API porque o lint do kit falhava nele.

**Tests**: none
**Gate**: build

**Commit**: `chore: scaffold monorepo from the AdonisJS API starter kit`

---

### T2: PostgreSQL 18 no Docker Compose

**What**: Criar `docker-compose.yml` com `postgres:18`, porta 5432, volume `pgdata:/var/lib/postgresql`, healthcheck, e o script de init que cria o banco `estanteca_test`.
**Where**: `docker-compose.yml`
**Depends on**: T1
**Reuses**: imagem oficial `postgres:18`
**Requirement**: FOUND-02

**Done when**:

- [x] `docker compose up -d` deixa o serviço saudável
- [x] `docker compose exec db psql -U estanteca -lqt` lista `estanteca` e `estanteca_test`
- [x] Gate check passes: `npm run build && npm run typecheck && npm run lint && npm test`

**Status**: ✅ Complete

**Tests**: none
**Gate**: build

**Commit**: `chore: add PostgreSQL 18 service for development and tests`

---

### T3: API no PostgreSQL

**What**: Trocar a conexão padrão da API para `pg` (variáveis `PG_*` validadas em `start/env.ts`, `.env.example`, `.env.test` com `PG_DB_NAME=estanteca_test`), remover `better-sqlite3`, rodar as migrações no bootstrap dos testes e cobrir `GET /` e a conexão com testes.
**Where**: `apps/api/config/database.ts`
**Depends on**: T2
**Reuses**: conexão `pg` comentada do kit; `tests/bootstrap.ts`
**Requirement**: FOUND-01, FOUND-02

**Done when**:

- [x] `tests/functional/home.spec.ts`: `GET /` responde 200 com JSON
- [x] `tests/integration/database.spec.ts`: a conexão usa o cliente `pg` e o banco atual é `estanteca_test`
- [x] Gate check passes: `docker compose up -d && npm test -w @estanteca/api`
- [x] Test count: 2 tests pass (no silent deletions)

**Status**: ✅ Complete. A suíte `integration` entrou no `adonisrc.ts`, que o kit não trazia. `PG_PASSWORD` é `string`, não `secret`, porque o driver `pg` espera texto. O `**Run api**` ganhou `--reporters=spec`: fora de um terminal o Japa usa o reporter de pontos e não imprime os títulos que as provas procuram.

**Tests**: integration
**Gate**: full

**Commit**: `feat(api): use PostgreSQL as the default database`

---

### T4: Criar o app Next.js

**What**: Gerar `apps/web` com `create-next-app` (Next.js 16, TypeScript, App Router, `src/`, Tailwind v4, ESLint flat config, alias `@/*`), com scripts `dev` (porta 3000), `build`, `lint` (`eslint .`) e `typecheck` (`tsc --noEmit`), e `lang="pt-BR"` no layout.
**Where**: `apps/web/package.json`
**Depends on**: None - a fase anterior já está concluída
**Reuses**: `create-next-app`
**Requirement**: FOUND-01, FOUND-03

**Done when**:

- [x] `npm run dev -w @estanteca/web` serve `http://localhost:3000`
- [x] Gate check passes: `npm run build && npm run typecheck && npm run lint && npm test`

**Status**: ✅ Complete. O `create-next-app` 16.4 gera o Tailwind com `@tailwindcss/turbopack` (não `@tailwindcss/postcss`) e liga `cacheComponents` e `partialPrefetching` por padrão; ficou como gerado. `agentRules: false` impede o `next dev` de criar `AGENTS.md` ao detectar um agente. `typecheck` roda `next typegen` antes do `tsc`, porque `LayoutProps` vem dos tipos gerados pelo Next. O `turbo.json` guarda `.next/**` como saída do build. O placeholder do kit (`README.md`, `.gitkeep`) saiu, e o código gerado foi formatado com o Prettier do repositório.

**Tests**: none
**Gate**: build

**Commit**: `feat(web): create the Next.js app`

---

### T5: Testes do web com Vitest

**What**: Configurar Vitest (jsdom, `@vitejs/plugin-react`, alias `@`), Testing Library, `user-event`, `vitest.setup.ts` com polyfills para Radix (`hasPointerCapture`, `scrollIntoView`, `ResizeObserver`), script `test` (`vitest run`) e o utilitário `lib/cn.ts` com seus testes.
**Where**: `apps/web/vitest.config.mts`
**Depends on**: T4
**Reuses**: guia de Vitest da documentação do Next.js 16
**Requirement**: FOUND-03

**Done when**:

- [x] `lib/cn.test.ts`: junta classes e ignora valores falsos
- [x] `npm test` na raiz roda Japa e Vitest e termina com 0
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 2 tests pass (no silent deletions)

**Status**: ✅ Complete. O alias `@` fica em `resolve.alias` do Vitest, sem `vite-tsconfig-paths`. Sem `globals: true`, o `vitest.setup.ts` chama `cleanup()` depois de cada teste.

**Tests**: unit
**Gate**: quick

**Commit**: `test(web): set up Vitest and Testing Library`

---

### T6: Cliente da API tipado

**What**: Criar `lib/api.ts` com `createTuyau` e o registro `@estanteca/api/registry` (`NEXT_PUBLIC_API_URL`, padrão `http://localhost:3333`), e `lib/api.typecheck.ts` com uma chamada a rota inexistente marcada com `@ts-expect-error`, para o typecheck falhar se o cliente perder a tipagem.
**Where**: `apps/web/src/lib/api.ts`
**Depends on**: T5
**Reuses**: exemplo de cliente do README do kit
**Requirement**: FOUND-04

**Done when**:

- [x] `npm run typecheck` na raiz passa
- [x] Remover o `@ts-expect-error` faz o typecheck falhar (verificado à mão e revertido)
- [x] Gate check passes: `npm run build && npm run typecheck && npm run lint && npm test`

**Status**: ✅ Complete. O cliente usa `api.request('<nome da rota>', ...)`, cujo nome só aceita as rotas do registro. O tsconfig do web ganhou `experimentalDecorators`, porque o `tsc` segue os tipos do registro até os modelos Lucid da API (`database/schema.ts`), que usam decorators; o Next compila com SWC, então a opção só afeta a checagem.

**Tests**: none
**Gate**: build

**Commit**: `feat(web): add the typed API client`

---

### T7: Script de verificação do ambiente de desenvolvimento

**What**: Criar `scripts/smoke-dev.mjs`, que sobe `npm run dev`, espera `http://localhost:3333` e `http://localhost:3000` responderem 200 (até 120 s), imprime `dev ok: api 200, web 200`, encerra os processos e sai com 0 (ou 1 com o motivo).
**Where**: `scripts/smoke-dev.mjs`
**Depends on**: T6
**Reuses**: nada
**Requirement**: FOUND-01

**Done when**:

- [x] `node scripts/smoke-dev.mjs` imprime `dev ok: api 200, web 200` e sai com 0
- [x] Nenhum processo fica rodando depois do script
- [x] Gate check passes: `npm run build && npm run typecheck && npm run lint && npm test`

**Status**: ✅ Complete. O script roda `npm run dev -- --ui=stream` num grupo de processos próprio e encerra o grupo inteiro (SIGTERM, SIGKILL depois de 10 s). Falha logo se `:3333` ou `:3000` já respondem antes de subir, para a prova não passar com servidores de outra sessão.

**Tests**: none
**Gate**: build

**Commit**: `chore: add a smoke check for the dev servers`

---

### T8: Tokens do design system

**What**: Copiar o `tokens.json` v1 do design system para `src/styles/design-tokens.json`, escrever `src/styles/tokens.css` (cores e sombras por tema em `@theme`, redefinidas em `:root[data-theme="dark"]` e em `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`; raios; `--space-N`) e importar em `globals.css`, com o teste de paridade.
**Where**: `apps/web/src/styles/tokens.css`
**Depends on**: None - a fase anterior já está concluída
**Reuses**: `tokens.json` do artefato
**Requirement**: TOK-01, THEME-01

**Done when**:

- [x] `styles/tokens.test.ts` cobre: 15 cores no claro, 15 no escuro (seletor explícito e media query), 4 raios, 3 sombras por tema, 7 espaçamentos e `--spacing: 0.25rem`
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 7 tests pass (no silent deletions)

**Status**: ✅ Complete. O Tailwind v4 copia o valor de uma sombra do `@theme` para o utilitário, então redefinir `--shadow-cover` no escuro não mudaria `shadow-cover`: as sombras ficam em `@theme inline` apontando para `--theme-shadow-*`, que mudam com o tema. Cores, raios e `--spacing` ficam em `@theme static`, porque o Tailwind só emite as variáveis usadas por algum utilitário. O teste compila o `tokens.css` com o `compile` do pacote `tailwindcss` e confere variáveis e utilitários contra o `design-tokens.json`. O `body` passou a usar `surface` e `ink` no lugar das cores do `create-next-app`.

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the Estanteca design tokens`

---

### T9: Fontes

**What**: Criar `app/fonts.ts` com Literata (eixo `opsz`), Geist e Geist Mono via `next/font/google`, aplicar as variáveis no `<html>` e mapear `--font-serif`, `--font-sans` e `--font-mono` no `@theme`.
**Where**: `apps/web/src/app/fonts.ts`
**Depends on**: T8
**Reuses**: `next/font/google`
**Requirement**: TOK-02

**Done when**:

- [x] `styles/tokens.test.ts` cobre o mapeamento das três famílias para as variáveis do `next/font`
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 8 tests pass (no silent deletions)

**Status**: ✅ Complete. O mapeamento `--font-serif/sans/mono` fica no `tokens.css`, em `@theme inline`, com as pilhas de reserva do `tokens.json`; saiu do `globals.css` junto com o `font-family: Arial` do `body`, e o `html` herda a Geist pelo `--default-font-family` do Tailwind. O teste simula `next/font/google` e confere que os utilitários usam as variáveis declaradas em `app/fonts.ts`. O cache de build do Turbopack (`.next/cache/turbopack`) gerou o CSS com o `globals.css` da versão anterior no primeiro build depois da edição; o build seguinte saiu certo.

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): load Literata, Geist and Geist Mono`

---

### T10: Regras de tema

**What**: Criar `lib/theme.ts` com `parseTheme`, `THEME_SCRIPT` e `applyTheme`, com testes que executam o script inline num documento jsdom com cookie.
**Where**: `apps/web/src/lib/theme.ts`
**Depends on**: T9
**Reuses**: padrão "Preventing flash before hydration" do Next.js 16
**Requirement**: THEME-01

**Done when**:

- [x] `lib/theme.test.ts` cobre: `parseTheme` para `light`, `dark`, `system`, ausente e inválido; o script aplica `light`/`dark` e não aplica nada para `system` ou inválido; `applyTheme` grava o cookie e ajusta `data-theme`
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 14 tests pass (no silent deletions)

**Status**: ✅ Complete. `applyTheme` muda o `data-theme` antes de gravar o cookie, e a gravação fica num `try`, para o tema trocar mesmo com cookies bloqueados.

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add theme preference rules`

---

### T11: Seletor de tema

**What**: Criar `components/theme-switcher.tsx` (rádios "Claro", "Escuro", "Automático") e injetar `THEME_SCRIPT` no `<head>` do layout raiz com `suppressHydrationWarning`.
**Where**: `apps/web/src/components/theme-switcher.tsx`
**Depends on**: T10
**Reuses**: `lib/theme.ts`
**Requirement**: THEME-01

**Done when**:

- [x] `theme-switcher.test.tsx` cobre: marca a opção do cookie atual; escolher "Escuro" aplica `data-theme="dark"` e grava o cookie sem recarregar; "Automático" remove `data-theme`
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 17 tests pass (no silent deletions)

**Status**: ✅ Complete. O seletor lê o cookie com `useSyncExternalStore`: no servidor vale `system` e no cliente vale o cookie, sem divergência na hidratação. O HTML pré-renderizado de `/` continua estático, com o script no `<head>` e sem `data-theme`. Gate de build da fase verde (17 testes no web, 2 na API).

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the theme switcher`

---

### T12: Regras de formatação

**What**: Criar `lib/format.ts` com `formatCount`, `formatBooks`, `formatRating`, `roundRating` e `progress`.
**Where**: `apps/web/src/lib/format.ts`
**Depends on**: None - a fase anterior já está concluída
**Reuses**: `Intl.NumberFormat('pt-BR')`
**Requirement**: UI-03, UI-12, UI-14, UI-15

**Done when**:

- [x] `lib/format.test.ts` cobre: "1.234"; "1 livro" e "23 livros"; "4,5"; arredondamento ao meio ponto e limites 0 e 5; percentual arredondado e limitado entre 0 e 100
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 25 tests pass (no silent deletions)

**Status**: ✅ Complete. `formatRating` usa no máximo uma casa decimal, como o design system ("4,5" e "4"), e `formatBooks(0)` dá "0 livros".

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add pt-BR formatting rules`

---

### T13: Regra de comparação da busca

**What**: Criar `lib/search.ts` com `normalize` e `matchesQuery`, ignorando acentos e maiúsculas.
**Where**: `apps/web/src/lib/search.ts`
**Depends on**: T12
**Reuses**: `String.prototype.normalize('NFD')`
**Requirement**: UI-08

**Done when**:

- [x] `lib/search.test.ts` cobre: "jose de alencar" encontra "José de Alencar"; busca em qualquer campo; sem correspondência; busca vazia
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 29 tests pass (no silent deletions)

**Status**: ✅ Complete. A spec não define a busca vazia: `matchesQuery` com busca vazia encontra qualquer livro (não filtra), e o SearchDialog só busca a partir de 3 caracteres.

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add accent-insensitive search matching`

---

### T14: Button

**What**: Criar o `Button` (variantes `primary`, `secondary`, `ghost`; tamanhos `md`, `sm`; `icon`) com o visual do design system.
**Where**: `apps/web/src/components/ui/button.tsx`
**Depends on**: T13
**Reuses**: `lib/cn.ts`; markup do `bundle.js` do design system
**Requirement**: UI-01

**Done when**:

- [x] `button.test.tsx` cobre os critérios 1 a 3 de ação, formulário e navegação
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 32 tests pass (no silent deletions)

**Status**: ✅ Complete. As cores de borda ficam só nas variantes e o espaçamento lateral só nos tamanhos, porque o `cn()` não resolve utilitários conflitantes. O teste da variante padrão compara o botão sem `variant` com um `secondary` explícito, sem depender de nomes de classe.

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the Button component`

---

### T15: TextField

**What**: Criar o `TextField` (rótulo, dica, erro, obrigatório, `mono`, `prefix`, `readOnly`).
**Where**: `apps/web/src/components/ui/text-field.tsx`
**Depends on**: T14
**Reuses**: markup do design system
**Requirement**: UI-02

**Done when**:

- [x] `text-field.test.tsx` cobre os critérios 4 a 8
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 37 tests pass (no silent deletions)

**Status**: ✅ Complete. É `'use client'` por causa do `useId`. Com erro, a borda fica em `status-overdue` também no foco, como no design system. A prop `prefix` substitui o atributo HTML de mesmo nome.

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the TextField component`

---

### T16: FilterChip

**What**: Criar o `FilterChip` com `aria-pressed` e contagem em pt-BR.
**Where**: `apps/web/src/components/ui/filter-chip.tsx`
**Depends on**: T15
**Reuses**: `lib/format.ts`
**Requirement**: UI-03

**Done when**:

- [x] `filter-chip.test.tsx` cobre o critério 9
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 39 tests pass (no silent deletions)

**Status**: ✅ Complete. O check do chip selecionado é o SVG inline do design system (o traço do `Check` do Lucide), porque o `lucide-react` só entra na T24.

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the FilterChip component`

---

### T17: Stepper

**What**: Criar o `Stepper` com "Etapa N de M", `aria-current="step"`, etapas concluídas anunciadas e rótulos escondidos visualmente abaixo de 520px de contêiner.
**Where**: `apps/web/src/components/ui/stepper.tsx`
**Depends on**: T16
**Reuses**: markup do design system
**Requirement**: UI-04

**Done when**:

- [x] `stepper.test.tsx` cobre os critérios 10 e 11 e o caso de borda de `current` fora da lista
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 42 tests pass (no silent deletions)

**Status**: ✅ Complete. Os rótulos fora da etapa atual ficam `sr-only` com `@max-[520px]` sobre o `@container` do Stepper; o jsdom não avalia container queries, então esse corte fica para a conferência em `/design`.

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the Stepper component`

---

### T18: StatusChip

**What**: Criar o `StatusChip` com os 7 status e `label`.
**Where**: `apps/web/src/components/ui/status-chip.tsx`
**Depends on**: T17
**Reuses**: cores de status dos tokens
**Requirement**: UI-13

**Done when**:

- [x] `status-chip.test.tsx` cobre o critério 7 de livro, leitura e painel
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 44 tests pass (no silent deletions)

**Status**: ✅ Complete. `ReadingStatus` e `LoanStatus` são exportados para o BookCard e o SearchDialog. Gate de build da fase verde (44 testes no web, 2 na API).

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the StatusChip component`

---

### T19: BookCover

**What**: Criar o `BookCover` (2:3, `xs`/`sm`/`md`/`lg`, capa em branco, `alt`).
**Where**: `apps/web/src/components/ui/book-cover.tsx`
**Depends on**: None - a fase anterior já está concluída
**Reuses**: markup do design system
**Requirement**: UI-10

**Done when**:

- [x] `book-cover.test.tsx` cobre os critérios 1 a 3
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 49 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the BookCover component`

---

### T20: BookCard

**What**: Criar o `BookCard` (grade e lista, link que cobre o card, `actions` acima do link, `tint`, `status`).
**Where**: `apps/web/src/components/ui/book-card.tsx`
**Depends on**: T19
**Reuses**: `BookCover`, `StatusChip`
**Requirement**: UI-11

**Done when**:

- [x] `book-card.test.tsx` cobre os critérios 4 e 5
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 51 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the BookCard component`

---

### T21: Shelf

**What**: Criar a `Shelf` (cabeçalho, contagem, área de capas rolável e focável).
**Where**: `apps/web/src/components/ui/shelf.tsx`
**Depends on**: T20
**Reuses**: `lib/format.ts`
**Requirement**: UI-12

**Done when**:

- [x] `shelf.test.tsx` cobre o critério 6 e o caso de borda de `count` maior que as capas
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 54 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the Shelf component`

---

### T22: Rating

**What**: Criar o `Rating` (exibição e escolha com 10 rádios).
**Where**: `apps/web/src/components/ui/rating.tsx`
**Depends on**: T21
**Reuses**: `lib/format.ts`
**Requirement**: UI-14

**Done when**:

- [x] `rating.test.tsx` cobre os critérios 8 a 10
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 58 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the Rating component`

---

### T23: ProgressBar

**What**: Criar a `ProgressBar` (páginas ou percentual).
**Where**: `apps/web/src/components/ui/progress-bar.tsx`
**Depends on**: T22
**Reuses**: `lib/format.ts`
**Requirement**: UI-15

**Done when**:

- [x] `progress-bar.test.tsx` cobre os critérios 11 e 12
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 60 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the ProgressBar component`

---

### T24: Stat

**What**: Criar o `Stat` com `sensitive`, `mask` e o botão de mostrar e ocultar.
**Where**: `apps/web/src/components/ui/stat.tsx`
**Depends on**: T23
**Reuses**: ícones `Eye`/`EyeOff` do `lucide-react`
**Requirement**: UI-16

**Done when**:

- [x] `stat.test.tsx` cobre o critério 13 e o valor visível quando não é `sensitive`
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 62 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the Stat component`

---

### T25: EmptyState

**What**: Criar o `EmptyState` com a ilustração de prateleira.
**Where**: `apps/web/src/components/ui/empty-state.tsx`
**Depends on**: T24
**Reuses**: desenho SVG do design system
**Requirement**: UI-17

**Done when**:

- [x] `empty-state.test.tsx` cobre o critério 14
- [x] Gate check passes: `npm run test -w @estanteca/web`
- [x] Test count: 64 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the EmptyState component`

---

### T26: Skeleton

**What**: Criar o `Skeleton` (`text`, `cover`, `card`, `row`).
**Where**: `apps/web/src/components/ui/skeleton.tsx`
**Depends on**: T25
**Reuses**: formas do design system
**Requirement**: UI-17

**Done when**:

- [ ] `skeleton.test.tsx` cobre o critério 15 nas quatro variantes
- [ ] Gate check passes: `npm run test -w @estanteca/web`
- [ ] Test count: 65 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the Skeleton component`

---

### T27: SideNav

**What**: Criar a `SideNav` (marca, destinos, rodapé, recolher; Tooltip do Radix nos itens recolhidos).
**Where**: `apps/web/src/components/ui/side-nav.tsx`
**Depends on**: None - a fase anterior já está concluída
**Reuses**: `radix-ui` Tooltip; `lucide-react`
**Requirement**: UI-06

**Done when**:

- [ ] `side-nav.test.tsx` cobre os critérios 15 (SideNav), 16 e 17
- [ ] Gate check passes: `npm run test -w @estanteca/web`
- [ ] Test count: 69 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the SideNav component`

---

### T28: BottomNav

**What**: Criar a `BottomNav` com área segura no rodapé.
**Where**: `apps/web/src/components/ui/bottom-nav.tsx`
**Depends on**: T27
**Reuses**: tipo `NavItem` da SideNav
**Requirement**: UI-06

**Done when**:

- [ ] `bottom-nav.test.tsx` cobre o critério 15 (BottomNav)
- [ ] Gate check passes: `npm run test -w @estanteca/web`
- [ ] Test count: 70 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the BottomNav component`

---

### T29: SearchTrigger

**What**: Criar o `SearchTrigger` com o atalho conforme o sistema operacional.
**Where**: `apps/web/src/components/ui/search-trigger.tsx`
**Depends on**: T28
**Reuses**: `lucide-react` Search
**Requirement**: UI-07

**Done when**:

- [ ] `search-trigger.test.tsx` cobre o critério 18 (nome acessível, "⌘K" no macOS, "Ctrl K" nos demais)
- [ ] Gate check passes: `npm run test -w @estanteca/web`
- [ ] Test count: 73 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the SearchTrigger component`

---

### T30: ActionMenu

**What**: Criar o `ActionMenu` sobre o DropdownMenu do Radix (itens, separador, `danger`, `hidden`, `disabled`).
**Where**: `apps/web/src/components/ui/action-menu.tsx`
**Depends on**: T29
**Reuses**: `radix-ui` DropdownMenu
**Requirement**: UI-05

**Done when**:

- [ ] `action-menu.test.tsx` cobre os critérios 12 a 14
- [ ] Gate check passes: `npm run test -w @estanteca/web`
- [ ] Test count: 76 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the ActionMenu component`

---

### T31: SearchDialog

**What**: Criar o `SearchDialog` sobre o Dialog do Radix, com combobox (`aria-activedescendant`), grupos, mínimo de 3 caracteres, vazio e atalho global.
**Where**: `apps/web/src/components/ui/search-dialog.tsx`
**Depends on**: T30
**Reuses**: `radix-ui` Dialog; `BookCover`; `StatusChip`
**Requirement**: UI-08

**Done when**:

- [ ] `search-dialog.test.tsx` cobre os critérios 1 a 7 de busca global e avisos
- [ ] Gate check passes: `npm run test -w @estanteca/web`
- [ ] Test count: 84 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the SearchDialog component`

---

### T32: Fila de avisos

**What**: Criar `lib/toast.ts` com a fila (máximo 3, o mais antigo sai), as durações (5000 ms, 8000 ms com ação, infinita para erro) e `toast.success`, `toast.error`, `toast.dismiss`.
**Where**: `apps/web/src/lib/toast.ts`
**Depends on**: T31
**Reuses**: nada
**Requirement**: UI-09

**Done when**:

- [ ] `lib/toast.test.ts` cobre: durações por tipo; erro sem prazo; quarto aviso remove o mais antigo; `dismiss`
- [ ] Gate check passes: `npm run test -w @estanteca/web`
- [ ] Test count: 89 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the notice queue`

---

### T33: Toast

**What**: Criar `Toast` e `Toaster` sobre o Toast do Radix (`type="background"` para sucesso, `"foreground"` para erro), com ação e "Fechar aviso".
**Where**: `apps/web/src/components/ui/toast.tsx`
**Depends on**: T32
**Reuses**: `radix-ui` Toast; `lib/toast.ts`
**Requirement**: UI-09

**Done when**:

- [ ] `toast.test.tsx` cobre os critérios 9 a 13 (com timers falsos)
- [ ] Gate check passes: `npm run test -w @estanteca/web`
- [ ] Test count: 95 tests pass (no silent deletions)

**Tests**: unit
**Gate**: quick

**Commit**: `feat(web): add the Toast component`

---

### T34: Vitrine `/design`

**What**: Criar `app/design/page.tsx` com o seletor de tema e uma seção por componente nos estados das previews, usando as capas de exemplo de `app/design/samples.ts`, e `notFound()` em produção.
**Where**: `apps/web/src/app/design/page.tsx`
**Depends on**: None - a fase anterior já está concluída
**Reuses**: os 19 componentes; dados das previews do design system
**Requirement**: DSN-01

**Done when**:

- [ ] `design/page.test.tsx` cobre: 19 seções com os nomes dos componentes e o seletor de tema; 404 em produção
- [ ] Gate check passes: `npm run build && npm run typecheck && npm run lint && npm test`
- [ ] Test count: 97 tests pass (no silent deletions)

**Tests**: unit
**Gate**: build

**Commit**: `feat(web): add the /design component showcase`

---

### T35: README da raiz

**What**: Escrever o `README.md` da raiz com pré-requisitos (Node 24, npm 12, Docker), os comandos do clone ao `npm run dev`, os scripts da raiz e onde fica a vitrine.
**Where**: `README.md`
**Depends on**: T34
**Reuses**: nada
**Requirement**: FOUND-01

**Done when**:

- [ ] Do clone ao `npm run dev` em no máximo 4 comandos
- [ ] Gate check passes: `npm run build && npm run typecheck && npm run lint && npm test`

**Tests**: none
**Gate**: build

**Commit**: `docs: add setup instructions`

---

## Checks

**C1** - `npm run dev` na raiz serve a API em `:3333` e o web em `:3000` (FOUND-01, AC 1)
Proof: `node scripts/smoke-dev.mjs`

**C2** - `GET /` na API responde 200 com JSON (FOUND-01, AC 2)
Proof: run api | ✔ GET / responde 200 com um corpo JSON

**C3** - A API usa PostgreSQL e os testes rodam no banco `estanteca_test` (FOUND-02, AC 3)
Proof: run api | ✔ conexão usa o cliente pg no banco estanteca_test

**C4** - `npm test` na raiz roda Japa e Vitest e termina com 0 (FOUND-03, AC 4)
Proof: `npm test`

**C5** - `npm run lint` e `npm run typecheck` verificam as duas apps e terminam com 0 (FOUND-03, AC 5)
Proof: `npm run lint && npm run typecheck`

**C6** - Chamar uma rota inexistente no cliente tipado falha no typecheck (FOUND-04, AC 6)
Proof: `npm run typecheck -w @estanteca/web`

**C7** - Os 15 tokens de cor têm os valores do design system nos dois temas (TOK-01, AC 1)
Proof: run web | ✓ tokens > define as 15 cores do tema claro com os valores do design system

**C8** - Os tokens de cor do tema escuro valem no seletor explícito (TOK-01, AC 1)
Proof: run web | ✓ tokens > redefine as 15 cores em [data-theme="dark"]

**C9** - Espaçamentos (7), raios (4) e sombras (3, por tema) têm os valores do design system (TOK-01, AC 2)
Proof: run web | ✓ tokens > define raios, sombras por tema e espaçamentos com os valores do design system

**C10** - Cores, raios e sombras viram utilitários Tailwind de mesmo nome e o espaçamento segue a escala de 4px (TOK-01, AC 3)
Proof: run web | ✓ tokens > expõe os tokens no @theme e mantém --spacing em 0.25rem

**C11** - `serif`, `sans` e `mono` apontam para Literata, Geist e Geist Mono servidas pelo app (TOK-02, AC 4)
Proof: run web | ✓ tokens > mapeia serif, sans e mono para as fontes do next/font

**C12** - Sem preferência ou com `system`, o tema segue o `prefers-color-scheme` (THEME-01, AC 5)
Proof: run web | ✓ tokens > aplica as cores escuras pela media query quando não há data-theme="light"

**C13** - Escolher um tema no seletor aplica na hora e grava o cookie `theme` (THEME-01, AC 6)
Proof: run web | ✓ ThemeSwitcher > escolher Escuro aplica data-theme e grava o cookie sem recarregar

**C14** - "Automático" no seletor volta a seguir o sistema (THEME-01, AC 6)
Proof: run web | ✓ ThemeSwitcher > escolher Automático remove data-theme e grava system

**C15** - Com cookie `light` ou `dark`, o script inline aplica o tema antes da primeira pintura (THEME-01, AC 7)
Proof: run web | ✓ THEME_SCRIPT > aplica o tema do cookie ao elemento raiz

**C16** - Cookie com valor inválido é tratado como `system` (THEME-01, AC 8)
Proof: run web | ✓ parseTheme > trata valor inválido como system

**C17** - Button usa `type="button"` e `secondary` por padrão (UI-01, AC 1)
Proof: run web | ✓ Button > usa type button e a variante secondary por padrão

**C18** - Button só com ícone usa o `aria-label` como nome e não mostra texto (UI-01, AC 2)
Proof: run web | ✓ Button > só com ícone usa o aria-label como nome acessível

**C19** - Button desabilitado não chama `onClick` (UI-01, AC 3)
Proof: run web | ✓ Button > desabilitado não chama onClick

**C20** - TextField associa o rótulo ao campo (UI-02, AC 4)
Proof: run web | ✓ TextField > encontra o campo pelo texto do rótulo

**C21** - TextField com `error` marca `aria-invalid` e é descrito pelo erro (UI-02, AC 5)
Proof: run web | ✓ TextField > com erro marca aria-invalid e é descrito pelo erro

**C22** - TextField com `hint` é descrito pela dica (UI-02, AC 6)
Proof: run web | ✓ TextField > com dica é descrito pela dica

**C23** - TextField obrigatório marca o campo e esconde o asterisco de leitores de tela (UI-02, AC 7)
Proof: run web | ✓ TextField > obrigatório marca required e esconde o asterisco

**C24** - TextField com `prefix` mostra o prefixo e o esconde de leitores de tela (UI-02, AC 8)
Proof: run web | ✓ TextField > mostra o prefixo escondido de leitores de tela

**C25** - FilterChip expõe `aria-pressed` igual a `selected` e mostra a contagem em pt-BR (UI-03, AC 9)
Proof: run web | ✓ FilterChip > expõe aria-pressed e formata a contagem em pt-BR

**C26** - Stepper mostra "Etapa N de M" e marca a etapa atual (UI-04, AC 10)
Proof: run web | ✓ Stepper > mostra Etapa 2 de 3 e marca a etapa atual

**C27** - Stepper anuncia " (concluída)" nas etapas anteriores (UI-04, AC 11)
Proof: run web | ✓ Stepper > anuncia as etapas anteriores como concluídas

**C28** - ActionMenu abre com os itens visíveis como `menuitem`, sem os `hidden` (UI-05, AC 12)
Proof: run web | ✓ ActionMenu > abre com os itens visíveis e sem os escondidos

**C29** - Escolher um item chama `onSelect` e fecha o menu (UI-05, AC 13)
Proof: run web | ✓ ActionMenu > escolher um item chama onSelect e fecha o menu

**C30** - Esc fecha o ActionMenu e devolve o foco ao botão (UI-05, AC 14)
Proof: run web | ✓ ActionMenu > Esc fecha e devolve o foco ao botão

**C31** - SideNav marca só o item atual com `aria-current="page"` (UI-06, AC 15)
Proof: run web | ✓ SideNav > marca só o item atual com aria-current

**C32** - BottomNav marca só o item atual com `aria-current="page"` (UI-06, AC 15)
Proof: run web | ✓ BottomNav > marca só o item atual com aria-current

**C33** - SideNav recolhida mantém o rótulo como nome acessível do link (UI-06, AC 16)
Proof: run web | ✓ SideNav > recolhida mantém o rótulo como nome do link

**C34** - Recolher ou expandir chama `onCollapsedChange` com o oposto (UI-06, AC 17)
Proof: run web | ✓ SideNav > o botão de recolher chama onCollapsedChange com o oposto

**C35** - SearchTrigger tem o nome acessível e o atalho certo por sistema (UI-07, AC 18)
Proof: run web | ✓ SearchTrigger > mostra Ctrl K fora do macOS

**C36** - SearchTrigger mostra "⌘K" no macOS (UI-07, AC 18)
Proof: run web | ✓ SearchTrigger > mostra ⌘K no macOS

**C37** - ⌘K ou Ctrl+K chama `onOpenChange` com o oposto de `open` (UI-08, AC 1)
Proof: run web | ✓ SearchDialog > Ctrl+K alterna a abertura

**C38** - Com menos de 3 caracteres, mostra a dica e nenhuma lista (UI-08, AC 2)
Proof: run web | ✓ SearchDialog > com menos de 3 caracteres mostra a dica e nenhuma lista

**C39** - Com resultados, mostra os grupos com rótulo e as opções, sem grupos vazios (UI-08, AC 3)
Proof: run web | ✓ SearchDialog > mostra os grupos com resultados e ignora os vazios

**C40** - Setas movem o resultado ativo, voltando ao início, com `aria-activedescendant` (UI-08, AC 4)
Proof: run web | ✓ SearchDialog > setas movem o resultado ativo e voltam ao início

**C41** - Enter chama `onSelect` com o resultado ativo (UI-08, AC 5)
Proof: run web | ✓ SearchDialog > Enter escolhe o resultado ativo

**C42** - Sem resultados, mostra `empty` ou "Nada encontrado para “…”." (UI-08, AC 6)
Proof: run web | ✓ SearchDialog > sem resultados mostra a mensagem de nada encontrado

**C43** - Esc ou clique fora chamam `onOpenChange(false)` (UI-08, AC 7)
Proof: run web | ✓ SearchDialog > Esc e clique fora fecham

**C44** - A comparação da busca ignora acentos e maiúsculas (UI-08, AC 8)
Proof: run web | ✓ matchesQuery > jose de alencar encontra José de Alencar

**C45** - Toast de sucesso é educado e o de erro é assertivo (UI-09, AC 9)
Proof: run web | ✓ Toast > anuncia sucesso de forma educada e erro de forma assertiva

**C46** - Ação e "Fechar aviso" chamam o callback e removem o aviso (UI-09, AC 10)
Proof: run web | ✓ Toast > ação e Fechar aviso removem o aviso

**C47** - Sucesso some em 5 s, ou 8 s com ação (UI-09, AC 11)
Proof: run web | ✓ Toast > sucesso some em 5 segundos e com ação em 8

**C48** - Ponteiro ou foco pausam a contagem (UI-09, AC 12)
Proof: run web | ✓ Toast > ponteiro sobre o aviso pausa a contagem

**C49** - Erro fica até o leitor fechar (UI-09, AC 13)
Proof: run web | ✓ Toast > erro fica até ser fechado

**C50** - O quarto aviso remove o mais antigo (UI-09, AC 14)
Proof: run web | ✓ toast queue > o quarto aviso remove o mais antigo

**C51** - BookCover sem `src` mostra título e autor numa capa em branco (UI-10, AC 1)
Proof: run web | ✓ BookCover > sem src mostra título e autor

**C52** - BookCover `xs` sem `src` mostra só a inicial (UI-10, AC 2)
Proof: run web | ✓ BookCover > xs sem src mostra só a inicial

**C53** - BookCover sem `alt` fica escondido de leitores de tela; com `alt`, usa o texto (UI-10, AC 3)
Proof: run web | ✓ BookCover > sem alt fica escondido e com alt usa o texto

**C54** - BookCard com `href` tem o título como link que cobre o card (UI-11, AC 4)
Proof: run web | ✓ BookCard > com href o título é um link para href

**C55** - Controle em `actions` funciona sem navegar (UI-11, AC 5)
Proof: run web | ✓ BookCard > aciona actions sem acionar o link

**C56** - Shelf mostra a contagem com singular e plural e a área focável com nome (UI-12, AC 6)
Proof: run web | ✓ Shelf > mostra a contagem e nomeia a área das capas

**C57** - StatusChip mostra o texto de cada status ou o `label` (UI-13, AC 7)
Proof: run web | ✓ StatusChip > mostra o texto de cada um dos 7 status

**C58** - Rating de exibição tem o nome "Nota X de 5" ou "Sem nota" (UI-14, AC 8)
Proof: run web | ✓ Rating > nomeia a nota com vírgula decimal ou Sem nota

**C59** - Rating arredonda ao meio ponto entre 0 e 5 (UI-14, AC 9)
Proof: run web | ✓ roundRating > arredonda ao meio ponto e limita entre 0 e 5

**C60** - Rating com `onChange` oferece 10 rádios e chama `onChange` (UI-14, AC 10)
Proof: run web | ✓ Rating > com onChange oferece 10 opções e chama onChange

**C61** - ProgressBar mostra "p. 148 de 256 · 58%" e `aria-valuenow` 58 (UI-15, AC 11)
Proof: run web | ✓ ProgressBar > mostra as páginas e o percentual

**C62** - ProgressBar limita o percentual entre 0 e 100 (UI-15, AC 12)
Proof: run web | ✓ progress > limita o percentual entre 0 e 100

**C63** - Stat sensível começa oculto e mostra o valor ao acionar "Mostrar valor" (UI-16, AC 13)
Proof: run web | ✓ Stat > sensível começa oculto e mostra o valor ao acionar o botão

**C64** - EmptyState mostra o título no nível certo e a ação (UI-17, AC 14)
Proof: run web | ✓ EmptyState > mostra o título como cabeçalho e a ação

**C65** - Skeleton fica escondido de leitores de tela (UI-17, AC 15)
Proof: run web | ✓ Skeleton > fica escondido de leitores de tela em todas as variantes

**C66** - `/design` mostra os 19 componentes, um por seção, com o seletor de tema (DSN-01, AC 1)
Proof: run web | ✓ página /design > mostra uma seção para cada um dos 19 componentes e o seletor de tema

**C67** - `/design` responde 404 em produção (DSN-01, AC 2)
Proof: run web | ✓ página /design > chama notFound em produção

**C68** - Com o Docker parado, a API falha com a mensagem de conexão e o web continua no ar (edge case)
Proof: walk - com `docker compose stop`, rodar `npm run dev` e ver o erro de conexão do PostgreSQL no terminal da API enquanto `http://localhost:3000` responde

**C69** - A Shelf mostra `count` como total quando é maior que as capas (edge case)
Proof: run web | ✓ Shelf > usa count como total quando é maior que as capas

**C70** - O Stepper limita `current` ao primeiro ou ao último passo (edge case)
Proof: run web | ✓ Stepper > limita current fora da lista

---

## Handoff

The feature's live state, written as it happens - a compaction gives no warning.

**Settled mid-build:** o `next dev` criava `apps/web/AGENTS.md` ao detectar um agente; desligado com `agentRules: false` no `next.config.ts` - user: "Desligar (Recomendado)" · execução inline, sem sub-agentes, e só quando o usuário pedir - user: "Aprovo as tarefas, e a execução será inline, mas não execute nada agora." · O `**Build**` falha antes da T1 porque o repositório não tem `package.json`; a T1 segue e `validate_tasks.py --execute` precisa passar verde antes da T2 - user: "Seguir e validar após a T1 (Recomendado)" · Planejamento e modelos de PR entram em dois commits antes da T1 (`docs` com `.specs/`, `chore` com `.github/`) - user: "Dois commits antes da T1 (Recomendado)"
**Dispatched:** none
**Walked:** none

---

## Phase Execution Map

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7

Phase 1:  T1 → T2 → T3
Phase 2:  T4 → T5 → T6 → T7
Phase 3:  T8 → T9 → T10 → T11
Phase 4:  T12 → T13 → T14 → T15 → T16 → T17 → T18
Phase 5:  T19 → T20 → T21 → T22 → T23 → T24 → T25 → T26
Phase 6:  T27 → T28 → T29 → T30 → T31 → T32 → T33
Phase 7:  T34 → T35
```

Execution is strictly sequential - there is no intra-phase parallelism. A single agent (or batch worker) works one task at a time, in order.
