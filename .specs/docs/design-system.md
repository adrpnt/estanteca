# Design system

Guia de consulta do design system da Estanteca para quem desenha ou implementa telas. Os princípios visuais estão no [escopo, seção 7](scope.md#7-diretrizes-de-design). Este arquivo diz onde cada coisa vive, quais regras de uso valem e como estender.

Este guia **não repete valores de tokens**. Cor, tamanho e sombra são lidos nas fontes da verdade abaixo, que são testadas. Se este arquivo e o código divergirem, vale o código.

## 1. Fontes da verdade

| O quê | Onde | Papel |
| ----- | ---- | ----- |
| Tokens (valores e uso) | [`apps/web/src/styles/design-tokens.json`](../../apps/web/src/styles/design-tokens.json) | Cópia do `tokens.json` v1 do design system. Cada token tem um campo `usage` que diz onde ele pode aparecer. **Leia o `usage` antes de usar um token.** |
| Tokens em CSS | [`apps/web/src/styles/tokens.css`](../../apps/web/src/styles/tokens.css) | Variáveis CSS e `@theme` do Tailwind v4, nos três modos de tema. Escrito à mão. |
| Paridade JSON ↔ CSS | [`apps/web/src/styles/tokens.test.ts`](../../apps/web/src/styles/tokens.test.ts) | Falha se um valor do CSS divergir do JSON. |
| Componentes | [`apps/web/src/components/ui/`](../../apps/web/src/components/ui/) | 19 componentes React, cada um com `<nome>.test.tsx` ao lado. |
| Regras de exibição | [`apps/web/src/lib/`](../../apps/web/src/lib/) | `format.ts`, `search.ts`, `toast.ts`, `theme.ts`: regras testáveis sem renderizar. |
| Vitrine | `http://localhost:3000/design` ([`app/design/page.tsx`](../../apps/web/src/app/design/page.tsx)) | Todos os componentes nos estados de referência, com o seletor de tema. Só em desenvolvimento; responde 404 em produção. |
| Artefato original | claude.ai, artefato `3wJJghiug3NRiRHqpu1NmW` | Origem dos tokens, do markup e dos textos dos componentes. Referência histórica; o código é quem manda. |

## 2. Tokens

### 2.1 Como usar no código

| Grupo | Variável CSS | Utilitário Tailwind |
| ----- | ------------ | ------------------- |
| Cores | `--color-<nome>` | `bg-surface`, `text-ink-muted`, `border-line-strong`, `bg-status-read-soft` |
| Raios | `--radius-cover`, `--radius-sm`, `--radius-md`, `--radius-full` | `rounded-cover`, `rounded-sm`, `rounded-md`, `rounded-full` |
| Sombras | `--shadow-cover`, `--shadow-raised`, `--shadow-focus-ring` | `shadow-cover`, `shadow-raised`, `shadow-focus-ring` |
| Espaçamento | `--space-1` … `--space-12` (CSS solto) | Escala padrão do Tailwind: `p-4` = `space-4` = 16px |
| Fontes | `--font-serif`, `--font-sans`, `--font-mono` | `font-serif`, `font-sans`, `font-mono` |

- **Nunca** escreva cor em hex, `rgb()` ou cor da paleta do Tailwind (`bg-gray-100`) num componente. Se nenhum token serve, falta um token (ver seção 5).
- O espaçamento não tem utilitários próprios (`p-space-4`) de propósito: os 7 passos da grade de 4px (4, 8, 12, 16, 24, 32, 48) caem na escala padrão do Tailwind, e `tokens.test.ts` garante `--spacing: 0.25rem`. Use só esses 7 passos.
- As sombras usam `--theme-shadow-*` por baixo porque o Tailwind copia o valor do `@theme` para o utilitário. Para trocar uma sombra no tema escuro, mude `--theme-shadow-*`, não `--shadow-*`.

### 2.2 Tipografia

Os estilos (display, title, book-title, heading, body, caption, data) estão em `type.groups` no JSON. **Não existe utilitário por estilo**: os componentes aplicam os valores do JSON como classes arbitrárias, por exemplo `book-title` → `font-serif text-[17px] leading-[22px] font-semibold`. Copie de um componente que já usa o estilo e confira com o JSON.

Se o mesmo estilo começar a se repetir em telas, vale criar um `@utility` em `tokens.css` (ex.: `type-book-title`) e um teste de paridade, seguindo a seção 5.

## 3. Regras de uso

Estas regras não aparecem só de ler os nomes dos tokens. Elas vêm do campo `usage` do JSON, do escopo e das decisões do projeto.

### Cor

- **Uma cor de destaque só: `accent`** (verde de encadernação). Ela é usada na ação principal, no item ativo da navegação, em links e no anel de foco. Não use `accent` como decoração.
- **Cores de status só para status**: `status-read` (Lido), `status-loaned` (Emprestado), `status-overdue` (Atrasado e erros de formulário). Elas **sempre** vêm com rótulo ou ícone, nunca só a cor.
- `line` é decorativa (divisores, contorno de card). Borda de controle (campo, checkbox, botão secundário) usa `line-strong`, que tem pelo menos 3:1 sobre `surface` e `surface-raised`.
- Texto sobre `accent` usa `on-accent`. Texto sobre `accent-soft` usa `accent`.
- O fundo atrás da capa no `BookCard` pode levar a **cor dominante da capa** (`tint`), misturada a 12% com `surface-raised`. É a única cor fora dos tokens que entra na interface.

### Tipografia

- **Literata (serif)** só para títulos de página e nomes de obras. Use um `display` por tela, no máximo.
- **Geist (sans)** para tudo que é interface.
- **Geist Mono** para ISBN, CDD, CDU, páginas e códigos de exemplar, com algarismos tabulares. Em formulário, use `TextField mono`.
- Nada em CAIXA ALTA (escopo 7.1).

### Forma e profundidade

- `radius-cover` (cantos quase retos) **só** em capas e lombadas. A interface em volta usa `radius-sm` (controles) e `radius-md` (cards, painéis).
- A profundidade vem das capas: toda capa tem `shadow-cover`. Cards são planos, com borda `line`.
- `shadow-raised` só no que flutua: menus, popovers, busca global e toasts.

### Tema

- Três modos: claro, escuro e automático (segue o `prefers-color-scheme`).
- O tema é aplicado por um **script inline no `<head>`** (`THEME_SCRIPT` em `lib/theme.ts`), que lê o cookie `theme` e marca `data-theme` antes da primeira pintura. O servidor **não** lê o cookie, para as páginas continuarem estáticas. Não troque isso por leitura do cookie em Server Component.
- Todo token de cor ou sombra precisa de valor nos dois temas, nos dois blocos escuros de `tokens.css`: `[data-theme="dark"]` e o `@media (prefers-color-scheme: dark)`.

### Acessibilidade

- Contraste WCAG AA nos dois temas. As combinações permitidas estão no `usage` de cada token. **Não há teste automático de contraste**: ao criar ou mudar uma cor, confira a razão nos dois temas.
- Foco visível em todo elemento interativo com `shadow-focus-ring` (vão de 2px na cor da página e anel de 2px em `accent`).
- Toda transição e animação tem `motion-reduce:` (normalmente `motion-reduce:transition-none` ou `motion-reduce:animate-none`).
- Botão só com ícone precisa de `aria-label`.
- Toast anuncia com `aria-live` (assertivo para erro, educado para sucesso), nunca com `role="alert"`.

### Ícones

- `lucide-react`, 18px e `strokeWidth={1.5}` em controles (20px na navegação), com `aria-hidden="true"` quando há rótulo ao lado.

### Textos e números

- Interface em português, com frases curtas e no tom das amostras da vitrine.
- Contagens, notas e percentuais passam por `lib/format.ts` (`formatCount` → "1.234", `formatBooks` → "1 livro" / "23 livros", `formatRating` → "4,5"). Não formate número direto no componente.
- Busca compara texto sem acentos e sem maiúsculas (`lib/search.ts`).
- Mensagem de erro diz o que fazer: "Já existe um exemplar com o código 0042. Sugestão: 0249."

## 4. Componentes

Os 19 componentes estão em `apps/web/src/components/ui/`. A coluna **Base** diz se o componente usa uma primitiva do pacote `radix-ui` (decisão AD-003: Radix direto, sem a CLI do shadcn/ui) ou se é próprio. As props completas estão no tipo de cada arquivo, com comentários.

### Ações e formulário

| Componente | Quando usar | Variantes e props-chave | Base |
| ---------- | ----------- | ----------------------- | ---- |
| `Button` | Qualquer ação | `variant`: `primary` (uma vez por tela), `secondary` (padrão), `ghost`; `size`: `md`, `sm`; `icon` sem `children` vira botão só de ícone | Próprio |
| `ActionMenu` | Ações de um item (exemplar, estante) atrás de "⋯" | `items` com `'separator'`, `danger` (destrutiva) e `hidden` (funcionalidade ainda não entregue); `align` | Radix `DropdownMenu` |
| `TextField` | Campo de texto com rótulo | `hint`, `error` (diz o que fazer), `mono` (ISBN, CDD, código), `prefix` (unidade, como "R$", repetida no rótulo) | Próprio |
| `FilterChip` | Filtro liga/desliga em listas | `selected` (`aria-pressed`), `count` | Próprio |
| `Stepper` | Indicador de etapas de formulário guiado | `steps` (até três palavras cada), `current` (a partir de 0) | Próprio |

### Navegação e busca

| Componente | Quando usar | Variantes e props-chave | Base |
| ---------- | ----------- | ----------------------- | ---- |
| `SideNav` | Navegação principal no desktop | `items`, `footerItems`, `current` (id), `collapsed` + `onCollapsedChange`; recolhida, mostra tooltip com o rótulo | Radix `Tooltip` |
| `BottomNav` | Navegação principal no mobile | `items`, `current`; fixe em `bottom: 0` e reserve 60px mais a área segura | Próprio |
| `SearchTrigger` | Abre a busca global no cabeçalho | Mostra o atalho `⌘K` / `Ctrl K` conforme o sistema | Próprio |
| `SearchDialog` | Busca global | Não busca nada: recebe os `groups` de resultados prontos. `query` controlada, `minChars` (padrão 3), `loading`, `empty`, `hotkey` (registra `⌘K` / `Ctrl+K`) | Radix `Dialog` |

### Livros e estantes

| Componente | Quando usar | Variantes e props-chave | Base |
| ---------- | ----------- | ----------------------- | ---- |
| `BookCover` | Toda capa de livro | `size`: `xs`, `sm`, `md`, `lg`; sem `src`, desenha capa em branco com título e autor; sem `alt`, é decorativa | Próprio |
| `BookCard` | Livro em grade ou lista | `layout`: `grid`, `list`; `status`, `meta` (linha mono), `tint` (cor da capa), `actions` (normalmente um `ActionMenu`) | Próprio |
| `Shelf` | Prateleira horizontal com rolagem | `title`, `count`, `action`, `headingLevel` | Próprio |
| `StatusChip` | Status de leitura ou empréstimo | Leitura: `want`, `reading`, `read`, `paused`, `abandoned`. Empréstimo: `loaned`, `overdue`. O rótulo padrão vem do status | Próprio |
| `Rating` | Nota de 0 a 5, com meio ponto | Só leitura (sem `onChange`) ou editável (com `onChange`, vira `radiogroup`); `size`, `showValue` | Próprio |

### Dados e feedback

| Componente | Quando usar | Variantes e props-chave | Base |
| ---------- | ----------- | ----------------------- | ---- |
| `ProgressBar` | Progresso de leitura | `current` + `total` (páginas) ou `value` (percentual) | Próprio |
| `Stat` | Número em destaque no dashboard | `value` já formatado; `sensitive` adiciona mostrar/ocultar e começa oculto, com `mask` ("R$ ••••") | Próprio |
| `EmptyState` | Lista ou tela sem conteúdo | `title`, `description`, `action` (normalmente `Button primary`), `illustration` (`false` remove) | Próprio |
| `Toast` + `Toaster` + `toast()` | Confirmação ou erro depois de uma ação | `toast.success(msg, { action })`, `toast.error(msg)`. No máximo 3 na fila; some em 5s, 8s com ação; erro fica até ser fechado | Radix `Toast` + fila em `lib/toast.ts` |
| `Skeleton` | Carregamento | `variant`: `text` (`lines`), `cover` (`size`), `card`, `row` | Próprio |

Fora de `ui/`: `ThemeSwitcher` (`components/theme-switcher.tsx`), um grupo de rádios Claro, Escuro e Automático que grava o cookie por `applyTheme`.

## 5. Como estender

### Novo token ou mudança de valor

1. Edite `design-tokens.json`: valor (nos dois temas, se for cor ou sombra) e `usage`.
2. Espelhe em `tokens.css`: no `@theme static` (claro), em `:root[data-theme="dark"]` e no bloco `@media (prefers-color-scheme: dark)`. Sombra vai em `--theme-shadow-*`, nos mesmos três lugares.
3. Atualize `tokens.test.ts` se o teste contar os tokens (ex.: "as 15 cores").
4. Confira o contraste nos dois temas.
5. Se o token criar uma regra nova, acrescente na seção 3 deste arquivo.

### Novo componente

1. Antes, veja se uma variante de um componente existente resolve.
2. Crie `components/ui/<nome>.tsx` com props tipadas por `type` e comentários de uso nas props não óbvias, como nos vizinhos.
3. Interativo com foco, portal ou teclado (menu, dialog, popover, tooltip): use a primitiva do `radix-ui` e aplique o visual com tokens. Apresentação: componente próprio.
4. Use `cn()` de `lib/cn.ts` para juntar classes. Regra de exibição (formatação, filtro, contagem) vai para `lib/`, com teste unitário.
5. Escreva `<nome>.test.tsx` ao lado (Vitest, Testing Library e `user-event`), cobrindo papéis ARIA, teclado e cada estado.
6. Adicione uma `Section` na vitrine `app/design/page.tsx`, com os estados de referência, e confira nos dois temas.
7. Acrescente uma linha na tabela da seção 4.

## 6. Decisões relacionadas

- **AD-003** (`.specs/STATE.md`): primitivas do pacote `radix-ui` direto, sem a CLI nem o registro do shadcn/ui. Os nomes de variável do shadcn (`--accent`, `--border`, `--ring`) colidem com os tokens da Estanteca.
- **Tema sem piscar e páginas estáticas**: script inline no `<head>`, sem leitura do cookie no servidor. A justificativa está no design da fundação (`.specs/features/01-foundation/design.md`, Tech Decisions).
- **`cn()` local** em vez de `clsx` e `tailwind-merge`: os componentes não dependem de sobrescrever classes conflitantes.
