# Fundação do monorepo Specification

**Approved**: 2026-11-10 - user: "Aprovada."

## Problem Statement

A Estanteca tem escopo e design system aprovados, mas nenhum código: o repositório só guarda documentação. Toda feature do P1 (conta, acervo, estantes, leitura) precisa de uma API AdonisJS e de um web Next.js no mesmo monorepo, com banco PostgreSQL, testes rodando e a interface do design system disponível como componentes React. Sem essa base, cada feature reinventaria estrutura, tema e componentes.

## Goals

- [ ] `npm run dev` na raiz sobe a API e o web; `npm test`, `npm run lint` e `npm run typecheck` passam nas duas apps.
- [ ] O web usa os tokens do design system Estanteca com os mesmos valores, nos temas claro, escuro e automático, sem piscar na carga.
- [ ] Os 19 componentes do design system existem no web, com testes do comportamento descrito nos guias de cada um, e aparecem juntos na rota `/design`.

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| Telas e regras de conta (cadastro, login, Google, perfil, privacidade, exclusão) | Feature seguinte (escopo 5.1), com spec própria. |
| Mudanças no cadastro e login que o starter kit já traz na API | Ficam como o kit entrega; a feature de conta adapta. |
| Layout logado (`/app`) montado com SideNav, BottomNav e busca | Precisa de autenticação; os componentes ficam prontos e aparecem só em `/design`. |
| Preferência de tema salva na conta do usuário | Feature de conta; aqui a preferência fica no navegador. |
| CI, deploy, domínios e variáveis de produção | Entrega própria quando houver ambiente. |
| App móvel, PWA e pacote `packages/` compartilhado | P3 ou quando surgir um segundo consumidor. |
| Storybook | Decidido: a vitrine é a rota `/design`. |
| Funcionalidades de acervo, catálogo e busca de verdade | Os componentes recebem dados prontos; quem busca são as features de catálogo e acervo. |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
| --------------------- | -------------- | --------- | ---------- |
| Nome das apps | `apps/api` (AdonisJS) e `apps/web` (Next.js), renomeando as pastas do kit | Segue o escopo 10.1 e abre espaço para `apps/mobile` | y - user: "apps/api e apps/web" |
| Base dos componentes interativos | ActionMenu, SearchDialog, Toast e tooltip sobre as primitivas do pacote `radix-ui`, sem a CLI do shadcn (AD-003); demais componentes portados do design system | Radix já resolve foco, portais e teclado; o shadcn colide com os nomes dos tokens e descontinuou o Toast | y - user: "Radix nos interativos"; "Radix direto, sem shadcn" |
| Tema sem piscar (ajuste do critério 7 de tema) | Script inline no `<head>` lê o cookie antes da primeira pintura; o servidor não lê o cookie | Ler o cookie no layout raiz deixaria todas as páginas dinâmicas (documentação do Next.js 16) | y - user: "Script inline antes da pintura" |
| Espaçamento no Tailwind (ajuste do critério 3 de tokens) | Escala padrão de 4px do Tailwind (`p-4` = `space-4`) e variáveis `--space-N` no CSS | Os 7 passos do design system já são a escala padrão; `p-space-N` duplicaria | y - user: "Usar a escala padrão" |
| Anúncio do Toast (ajuste do critério 9 de avisos) | `aria-live` educado para sucesso e assertivo para erro, como o Radix Toast faz | O Radix evita `role="alert"` para não repetir o anúncio em leitores de tela | y - user: "Radix direto, sem shadcn" |
| Componentes desta entrega | Os 19 do design system | Destrava todas as telas do P1 | y - user: "Todos os 19" |
| Vitrine dos componentes | Rota `/design` no web, só em desenvolvimento | Sem dependências novas | y - user: "Rota /design no web" |
| Gerenciador de pacotes | npm com workspaces, como o kit cria | Menos desvio do kit e da documentação | n |
| Banco local | PostgreSQL 18 (imagem oficial `postgres:18`) em Docker Compose, com o volume em `/var/lib/postgresql`, um banco para dev e outro para testes | O escopo pede PostgreSQL e o kit vem com SQLite. A 18 é a versão estável atual; a 19 só sai em 19/11/2026. A partir da 18, a imagem oficial guarda os dados em `/var/lib/postgresql/18/docker`, então o volume monta no diretório pai | y - user: "Porque não usar o PostgreSQL 18?" |
| Testes | API com Japa (kit); web com Vitest, Testing Library e jsdom | Japa já vem no kit; Vitest é o padrão de testes de componentes React | n |
| Versões | Next.js estável mais recente com App Router; Tailwind CSS v4; React 19 | Confirmadas na fase de design pela documentação atual | n |
| Fontes | Literata, Geist e Geist Mono servidas pelo próprio app (sem pedido ao Google em tempo de execução) | Evita depender de terceiros na carga e permite pré-carregar | n |
| Onde guardar a preferência de tema | Cookie `theme` com `light`, `dark` ou `system` | Cookie chega ao servidor, então o HTML já sai no tema certo | n |
| Conferência visual | Você confere `/design` contra o design system nos dois temas; não há captura de tela automática nesta máquina | O agente não tem navegador para gerar capturas | n |
| Textos da interface | Português do Brasil, como no design system | Escopo e design system | n |

**Open questions:** none - all resolved or logged above (required before the spec is confirmed).

---

## User Stories

### P1: Monorepo rodando localmente ⭐ MVP

**User Story**: Como desenvolvedor da Estanteca, quero subir API, web e banco com um comando e rodar os testes das duas apps, para começar qualquer feature sem montar estrutura.

**Why P1**: Toda feature depende disso.

**Acceptance Criteria**:

1. WHEN o desenvolvedor roda `npm run dev` na raiz THEN o sistema SHALL servir a API em `http://localhost:3333` e o web em `http://localhost:3000`.
2. WHEN alguém faz `GET /` na API THEN a API SHALL responder 200 com um corpo JSON.
3. The API SHALL usar o PostgreSQL definido no `docker-compose.yml` da raiz, com o banco de testes separado do banco de desenvolvimento.
4. WHEN o desenvolvedor roda `npm test` na raiz THEN o sistema SHALL executar os testes da API (Japa) e do web (Vitest) e terminar com código 0.
5. WHEN o desenvolvedor roda `npm run lint` e `npm run typecheck` na raiz THEN o sistema SHALL verificar as duas apps e terminar com código 0.
6. The web SHALL ter um cliente da API tipado a partir das rotas da API, de modo que chamar uma rota inexistente falhe no `npm run typecheck`.
7. WHEN o desenvolvedor roda `npm install` na raiz sem `apps/api/.env` THEN o sistema SHALL criar esse arquivo a partir de `apps/api/.env.example` com um `APP_KEY` novo, e IF `apps/api/.env` já existe THEN o sistema SHALL mantê-lo intacto.

**Independent Test**: clonar, `docker compose up -d`, `npm install`, `npm run dev`; abrir as duas URLs; rodar `npm test`.

---

### P1: Tokens, fontes e tema ⭐ MVP

**User Story**: Como leitor, quero a Estanteca nas cores e fontes do design system, no tema claro, escuro ou no do meu sistema, para ler com conforto a qualquer hora.

**Why P1**: Todos os componentes e telas leem desses tokens.

**Acceptance Criteria**:

1. The web SHALL definir os 15 tokens de cor do design system Estanteca (versão 1) com os mesmos valores nos temas claro e escuro.
2. The web SHALL definir os tokens de espaçamento (7), raio (4) e sombra (3) do design system com os mesmos valores, inclusive as sombras por tema.
3. The web SHALL expor cada token de cor, raio e sombra como utilitário do Tailwind com o mesmo nome (ex.: `bg-surface`, `text-ink-muted`, `rounded-cover`, `shadow-cover`), e o espaçamento pela escala padrão de 4px do Tailwind, em que `space-N` corresponde a `N` (`p-4` = `space-4`).
4. The web SHALL aplicar Literata à família `serif`, Geist à `sans` e Geist Mono à `mono`, servidas pelo próprio app.
5. WHILE a preferência de tema é `system` ou não existe, the web SHALL seguir o `prefers-color-scheme` do sistema operacional.
6. WHEN o leitor escolhe Claro, Escuro ou Automático no seletor de tema THEN o web SHALL aplicar o tema na hora, sem recarregar, e gravar a escolha no cookie `theme`.
7. IF o cookie `theme` é `light` ou `dark` THEN o web SHALL aplicar esse tema ao elemento raiz antes da primeira pintura, por um script inline no `<head>`, mantendo o HTML do servidor igual para todos os visitantes.
8. IF o cookie `theme` tem um valor fora de `light`, `dark` e `system` THEN o web SHALL tratar como `system`.

**Independent Test**: abrir `/design`, alternar os três temas, recarregar e ver que a escolha se mantém sem piscar; trocar o tema do sistema operacional com Automático ativo.

---

### P1: Componentes de ação, formulário e navegação ⭐ MVP

**User Story**: Como leitor, quero botões, campos, filtros, menus e navegação que funcionem pelo mouse, pelo toque e pelo teclado, para usar a Estanteca sem barreiras.

**Why P1**: Base de todas as telas do P1.

**Acceptance Criteria**:

1. The Button SHALL usar `type="button"` e a variante `secondary` quando não recebem outro valor.
2. WHEN o Button recebe só `icon` e `aria-label` THEN ele SHALL ter o `aria-label` como nome acessível e não mostrar texto.
3. WHILE o Button está desabilitado, the Button SHALL não chamar `onClick`.
4. The TextField SHALL associar o rótulo ao campo, de modo que o campo seja encontrado pelo texto do rótulo.
5. WHEN o TextField recebe `error` THEN o campo SHALL ter `aria-invalid="true"` e ser descrito pelo texto do erro.
6. WHEN o TextField recebe `hint` THEN o campo SHALL ser descrito pelo texto da dica.
7. WHERE o TextField é `required`, the TextField SHALL marcar o campo como obrigatório e esconder o asterisco de leitores de tela.
8. WHERE o TextField recebe `prefix`, the TextField SHALL mostrar o prefixo dentro do campo e escondê-lo de leitores de tela.
9. The FilterChip SHALL expor `aria-pressed` igual a `selected` e mostrar `count` formatado em pt-BR (`1234` vira "1.234").
10. The Stepper SHALL mostrar "Etapa N de M" e marcar a etapa atual com `aria-current="step"`.
11. The Stepper SHALL anunciar " (concluída)" a leitores de tela em cada etapa anterior à atual.
12. WHEN o leitor aciona o botão do ActionMenu THEN o menu SHALL abrir com os itens visíveis como `menuitem`, sem os itens marcados `hidden`.
13. WHEN o leitor escolhe um item do ActionMenu THEN o sistema SHALL chamar o `onSelect` desse item e fechar o menu.
14. WHEN o leitor aperta Esc com o ActionMenu aberto THEN o menu SHALL fechar e devolver o foco ao botão ⋮.
15. The SideNav e a BottomNav SHALL marcar com `aria-current="page"` o item cujo `id` é igual a `current`, e só ele.
16. WHILE a SideNav está recolhida, the SideNav SHALL manter o rótulo de cada destino como nome acessível do link.
17. WHEN o leitor aciona "Recolher menu" ou "Expandir menu" THEN a SideNav SHALL chamar `onCollapsedChange` com o estado oposto ao atual.
18. The SearchTrigger SHALL ter "Buscar título, autor ou ISBN" como nome acessível e mostrar o atalho "⌘K" no macOS e "Ctrl K" nos demais sistemas.

**Independent Test**: testes de componente com Testing Library; navegar por `/design` só com o teclado.

---

### P1: Busca global e avisos ⭐ MVP

**User Story**: Como leitor, quero achar um livro de qualquer tela pelo ⌘K e receber avisos claros do que aconteceu, para não me perder no acervo.

**Why P1**: A busca global e os toasts aparecem em todas as telas logadas do P1.

**Acceptance Criteria**:

1. WHEN o leitor aperta ⌘K (macOS) ou Ctrl+K (demais) em qualquer tela com o SearchDialog montado THEN o sistema SHALL chamar `onOpenChange` com o oposto de `open`.
2. WHILE o SearchDialog está aberto e a busca tem menos de 3 caracteres, the SearchDialog SHALL mostrar "Digite pelo menos 3 letras do título ou do autor, ou o ISBN." e nenhuma lista.
3. WHEN há resultados THEN o SearchDialog SHALL mostrar cada grupo com seu rótulo e os resultados como `option`, ignorando grupos vazios.
4. WHEN o leitor aperta seta para baixo ou para cima no campo de busca THEN o SearchDialog SHALL mover o resultado ativo, voltando ao início depois do último, e apontar o campo para ele com `aria-activedescendant`.
5. WHEN o leitor aperta Enter com um resultado ativo THEN o sistema SHALL chamar `onSelect` com esse resultado.
6. IF a busca tem 3 ou mais caracteres e nenhum resultado THEN o SearchDialog SHALL mostrar o conteúdo de `empty` ou, sem ele, `Nada encontrado para “{busca}”.`.
7. WHEN o leitor aperta Esc ou clica fora do painel THEN o sistema SHALL chamar `onOpenChange(false)`.
8. The função de comparação da busca SHALL ignorar acentos e maiúsculas: "jose de alencar" encontra "José de Alencar".
9. The Toast de sucesso SHALL ser anunciado de forma educada (`aria-live="polite"`) e o de erro de forma imediata (`aria-live="assertive"`).
10. WHEN o leitor aciona a ação ou o botão "Fechar aviso" de um Toast THEN o sistema SHALL chamar o callback correspondente e remover o aviso.
11. WHEN passam 5 segundos de um Toast de sucesso sem ação, ou 8 segundos de um com ação, THEN o sistema SHALL remover o aviso.
12. WHILE o ponteiro ou o foco está sobre um Toast, the sistema SHALL pausar a contagem para removê-lo.
13. IF o Toast é de erro THEN o sistema SHALL mantê-lo até o leitor fechar.
14. WHEN um quarto aviso chega com três na tela THEN o sistema SHALL remover o mais antigo.

**Independent Test**: em `/design`, abrir a busca pelo atalho, filtrar sem acento, navegar com as setas, abrir um resultado; disparar toasts e esperar.

---

### P1: Componentes de livro, leitura e painel ⭐ MVP

**User Story**: Como leitor, quero ver capas, prateleiras, status, notas e indicadores do jeito do design system, para reconhecer meus livros de relance.

**Why P1**: Acervo, estantes, leitura e dashboard do P1 são montados com eles.

**Acceptance Criteria**:

1. WHEN o BookCover não recebe `src` THEN ele SHALL mostrar o título (e o autor nos tamanhos `md` e `lg`) numa capa em branco 2:3.
2. WHERE o BookCover tem tamanho `xs` sem `src`, the BookCover SHALL mostrar só a primeira letra do título.
3. IF o BookCover não recebe `alt` THEN ele SHALL ficar escondido de leitores de tela; com `alt`, SHALL ter esse texto como nome acessível.
4. WHEN o BookCard recebe `href` THEN o título SHALL ser um link para `href` que cobre o card inteiro.
5. WHEN o leitor aciona um controle passado em `actions` do BookCard THEN o sistema SHALL executar esse controle sem navegar para o `href`.
6. The Shelf SHALL mostrar a contagem em pt-BR com singular e plural ("1 livro", "23 livros") e ter a área das capas focável com o nome `Livros da estante {título}`.
7. The StatusChip SHALL mostrar "Quero ler", "Lendo", "Lido", "Pausado", "Abandonado", "Emprestado" e "Atrasado" para `want`, `reading`, `read`, `paused`, `abandoned`, `loaned` e `overdue`, ou o `label` quando recebido.
8. The Rating em modo de exibição SHALL ter o nome acessível "Nota X de 5" com vírgula decimal, ou "Sem nota" quando o valor é 0.
9. The Rating SHALL arredondar o valor para o meio ponto mais próximo entre 0 e 5.
10. WHERE o Rating recebe `onChange`, the Rating SHALL oferecer 10 opções de rádio, de "0,5 estrela" a "5 estrelas", e chamar `onChange` com o valor escolhido.
11. WHEN a ProgressBar recebe `current` e `total` THEN ela SHALL mostrar `p. {current} de {total} · {pct}%` e expor `aria-valuenow` igual ao percentual arredondado.
12. The ProgressBar SHALL limitar o percentual entre 0 e 100.
13. WHERE o Stat é `sensitive`, the Stat SHALL começar mostrando `mask` e o botão "Mostrar valor", e mostrar o valor depois que o leitor aciona o botão.
14. The EmptyState SHALL mostrar o título como cabeçalho de nível 2, ou do nível em `level`, e a ação recebida.
15. The Skeleton SHALL ficar escondido de leitores de tela.

**Independent Test**: testes de componente; conferência visual em `/design`.

---

### P1: Vitrine `/design` ⭐ MVP

**User Story**: Como pessoa que constrói a Estanteca, quero ver todos os componentes juntos no app, nos dois temas, para conferir com o design system.

**Why P1**: É onde se confere o visual, já que os testes cobrem o comportamento.

**Acceptance Criteria**:

1. WHEN alguém abre `/design` em desenvolvimento THEN o web SHALL mostrar os 19 componentes, um por seção, nos estados das previews do design system, com o seletor de tema no topo.
2. IF o web roda em produção THEN `/design` SHALL responder 404.

**Independent Test**: abrir `/design` com `npm run dev`; rodar o build de produção e pedir `/design`.

---

## Edge Cases

- IF o Docker não está rodando THEN `npm run dev` SHALL deixar a API falhar com a mensagem de conexão do PostgreSQL, sem derrubar o web.
- WHEN a Shelf recebe `count` maior que o número de capas THEN ela SHALL mostrar `count` como total.
- IF o Stepper recebe `current` fora da lista THEN ele SHALL limitar ao primeiro ou ao último passo.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| FOUND-01 | P1: Monorepo rodando localmente (1, 2) | Tasks | In Tasks |
| FOUND-02 | P1: Monorepo rodando localmente (3) | Tasks | In Tasks |
| FOUND-03 | P1: Monorepo rodando localmente (4, 5) | Tasks | In Tasks |
| FOUND-04 | P1: Monorepo rodando localmente (6) | Tasks | In Tasks |
| FOUND-05 | P1: Monorepo rodando localmente (7) | Tasks | In Tasks |
| TOK-01 | P1: Tokens, fontes e tema (1, 2, 3) | Tasks | In Tasks |
| TOK-02 | P1: Tokens, fontes e tema (4) | Tasks | In Tasks |
| THEME-01 | P1: Tokens, fontes e tema (5, 6, 7, 8) | Tasks | In Tasks |
| UI-01 | P1: Ação, formulário e navegação (1-3) Button | Tasks | In Tasks |
| UI-02 | P1: Ação, formulário e navegação (4-8) TextField | Tasks | In Tasks |
| UI-03 | P1: Ação, formulário e navegação (9) FilterChip | Tasks | In Tasks |
| UI-04 | P1: Ação, formulário e navegação (10, 11) Stepper | Tasks | In Tasks |
| UI-05 | P1: Ação, formulário e navegação (12-14) ActionMenu | Tasks | In Tasks |
| UI-06 | P1: Ação, formulário e navegação (15-17) SideNav e BottomNav | Tasks | In Tasks |
| UI-07 | P1: Ação, formulário e navegação (18) SearchTrigger | Tasks | In Tasks |
| UI-08 | P1: Busca global e avisos (1-8) SearchDialog | Tasks | In Tasks |
| UI-09 | P1: Busca global e avisos (9-14) Toast | Tasks | In Tasks |
| UI-10 | P1: Livro, leitura e painel (1-3) BookCover | Tasks | In Tasks |
| UI-11 | P1: Livro, leitura e painel (4, 5) BookCard | Tasks | In Tasks |
| UI-12 | P1: Livro, leitura e painel (6) Shelf | Tasks | In Tasks |
| UI-13 | P1: Livro, leitura e painel (7) StatusChip | Tasks | In Tasks |
| UI-14 | P1: Livro, leitura e painel (8-10) Rating | Tasks | In Tasks |
| UI-15 | P1: Livro, leitura e painel (11, 12) ProgressBar | Tasks | In Tasks |
| UI-16 | P1: Livro, leitura e painel (13) Stat | Tasks | In Tasks |
| UI-17 | P1: Livro, leitura e painel (14, 15) EmptyState e Skeleton | Tasks | In Tasks |
| DSN-01 | P1: Vitrine `/design` (1, 2) | Tasks | In Tasks |

**Coverage:** 26 total, 26 mapped to tasks, 0 unmapped

---

## Differences from the source

None - the product matches the source. Os componentes interativos trocam a implementação própria do design system por primitivas Radix (AD-003), mantendo o mesmo visual, os mesmos textos e o mesmo comportamento de teclado.

## Sources

- `.specs/docs/scope.md` seções 7 (diretrizes de design) e 10 (arquitetura e stack) - estrutura do monorepo, stack e princípios de interface.
- [Design system Estanteca](https://claude.ai/artifact/3wJJghiug3NRiRHqpu1NmW) - binding - tokens (valores exatos), guias e previews dos 19 componentes.
- Documentação do AdonisJS v7 (starter kit API Monorepo: `apps/backend` e `apps/frontend`, workspaces npm, Turborepo, SQLite por padrão, autenticação incluída).

---

## Success Criteria

- [ ] Do clone ao `npm run dev` com API e web no ar em menos de 5 comandos.
- [ ] `npm test`, `npm run lint` e `npm run typecheck` verdes na raiz.
- [ ] Os 19 componentes em `/design` batem com o design system nos dois temas, na sua conferência.
