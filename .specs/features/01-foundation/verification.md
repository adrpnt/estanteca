# Fundação do monorepo verification

**Verdict**: FAIL
**Proofs**: `proofs.md` at 23f0a31
**Verifier**: independent sub-agent (author != verifier)

## Checks

| Check | Test | Holds |
| --- | --- | --- |
| C1 | `node scripts/smoke-dev.mjs` | yes |
| C2 | `home.spec.ts` `GET / responde 200 com um corpo JSON` | yes |
| C3 | `database.spec.ts` `conexão usa o cliente pg no banco estanteca_test` | yes |
| C4 | `npm test` | no - só o código de saída; o `turbo test` pula em silêncio um workspace sem o script `test`, então a prova passa se o Japa ou o Vitest deixar de rodar |
| C5 | `npm run lint && npm run typecheck` | no - mesmo caso do C4: código 0 não prova que as duas apps foram verificadas |
| C6 | `npm run typecheck -w @estanteca/web` (`api.typecheck.ts`) | yes - conferido com um arquivo descartável: rota válida compila e `livros.inexistente` dá TS2345 pelo nome da rota |
| C7 | `tokens.test.ts` `define as 15 cores do tema claro com os valores do design system` | yes - `design-tokens.json` é idêntico ao `project/tokens.json` do design system |
| C8 | `tokens.test.ts` `redefine as 15 cores em [data-theme="dark"]` | yes |
| C9 | `tokens.test.ts` `define raios, sombras por tema e espaçamentos com os valores do design system` | yes |
| C10 | `tokens.test.ts` `expõe os tokens no @theme e mantém --spacing em 0.25rem` | yes |
| C11 | `tokens.test.ts` `mapeia serif, sans e mono para as fontes do next/font` | yes |
| C12 | `tokens.test.ts` `aplica as cores escuras pela media query quando não há data-theme="light"` | no - prova só o CSS; os casos que a check nomeia (sem cookie e `system`) dependem de o script não gravar `data-theme`, o que está em `THEME_SCRIPT > não aplica tema para system, cookie inválido ou ausente`, que nenhuma check seleciona |
| C13 | `theme-switcher.test.tsx` `escolher Escuro aplica data-theme e grava o cookie sem recarregar` | yes |
| C14 | `theme-switcher.test.tsx` `escolher Automático remove data-theme e grava system` | yes |
| C15 | `theme.test.ts` `aplica o tema do cookie ao elemento raiz` | no - executa a string do script isolada; nada prova que o layout a injeta inline no `<head>` nem que o HTML do servidor não lê o cookie; tirar o `<script>` de `layout.tsx` deixa tudo verde |
| C16 | `theme.test.ts` `trata valor inválido como system` | yes |
| C17 | `button.test.tsx` `usa type button e a variante secondary por padrão` | yes |
| C18 | `button.test.tsx` `só com ícone usa o aria-label como nome acessível` | yes |
| C19 | `button.test.tsx` `desabilitado não chama onClick` | yes |
| C20 | `text-field.test.tsx` `encontra o campo pelo texto do rótulo` | yes |
| C21 | `text-field.test.tsx` `com erro marca aria-invalid e é descrito pelo erro` | yes |
| C22 | `text-field.test.tsx` `com dica é descrito pela dica` | yes |
| C23 | `text-field.test.tsx` `obrigatório marca required e esconde o asterisco` | yes |
| C24 | `text-field.test.tsx` `mostra o prefixo escondido de leitores de tela` | yes |
| C25 | `filter-chip.test.tsx` `expõe aria-pressed e formata a contagem em pt-BR` | yes |
| C26 | `stepper.test.tsx` `mostra Etapa 2 de 3 e marca a etapa atual` | yes |
| C27 | `stepper.test.tsx` `anuncia as etapas anteriores como concluídas` | yes |
| C28 | `action-menu.test.tsx` `abre com os itens visíveis e sem os escondidos` | yes |
| C29 | `action-menu.test.tsx` `escolher um item chama onSelect e fecha o menu` | yes |
| C30 | `action-menu.test.tsx` `Esc fecha e devolve o foco ao botão` | yes |
| C31 | `side-nav.test.tsx` `marca só o item atual com aria-current` | yes |
| C32 | `bottom-nav.test.tsx` `marca só o item atual com aria-current` | yes |
| C33 | `side-nav.test.tsx` `recolhida mantém o rótulo como nome do link` | yes |
| C34 | `side-nav.test.tsx` `o botão de recolher chama onCollapsedChange com o oposto` | yes |
| C35 | `search-trigger.test.tsx` `mostra Ctrl K fora do macOS` | yes |
| C36 | `search-trigger.test.tsx` `mostra ⌘K no macOS` | yes |
| C37 | `search-dialog.test.tsx` `Ctrl+K alterna a abertura` | yes |
| C38 | `search-dialog.test.tsx` `com menos de 3 caracteres mostra a dica e nenhuma lista` | no - só testa 2 caracteres (`ma`); os demais testes usam `machado` e `quincas borba`, então um limite deslocado (`q.length <= minChars`) passaria em toda a suíte |
| C39 | `search-dialog.test.tsx` `mostra os grupos com resultados e ignora os vazios` | yes |
| C40 | `search-dialog.test.tsx` `setas movem o resultado ativo e voltam ao início` | yes |
| C41 | `search-dialog.test.tsx` `Enter escolhe o resultado ativo` | yes |
| C42 | `search-dialog.test.tsx` `sem resultados mostra a mensagem de nada encontrado` | no - prova só a mensagem padrão; o caso `empty` que a check nomeia está em `sem resultados mostra o conteúdo de empty`, que nenhuma check seleciona |
| C43 | `search-dialog.test.tsx` `Esc e clique fora fecham` | yes |
| C44 | `search.test.ts` `jose de alencar encontra José de Alencar` | yes |
| C45 | `toast.test.tsx` `anuncia sucesso de forma educada e erro de forma assertiva` | yes |
| C46 | `toast.test.tsx` `ação e Fechar aviso removem o aviso` | yes |
| C47 | `toast.test.tsx` `sucesso some em 5 segundos e com ação em 8` | yes |
| C48 | `toast.test.tsx` `ponteiro sobre o aviso pausa a contagem` | no - prova só o ponteiro; o foco, que a check nomeia, está em `foco no aviso pausa a contagem`, que nenhuma check seleciona |
| C49 | `toast.test.tsx` `erro fica até ser fechado` | yes |
| C50 | `toast.test.ts` `o quarto aviso remove o mais antigo` | yes |
| C51 | `book-cover.test.tsx` `sem src mostra título e autor` | yes - a proporção 2:3 é visual e fica para a conferência em `/design` |
| C52 | `book-cover.test.tsx` `xs sem src mostra só a inicial` | yes |
| C53 | `book-cover.test.tsx` `sem alt fica escondido e com alt usa o texto` | yes |
| C54 | `book-card.test.tsx` `com href o título é um link para href` | yes - cobrir o card inteiro é visual (pseudo-elemento) e fica para a conferência em `/design` |
| C55 | `book-card.test.tsx` `aciona actions sem acionar o link` | yes |
| C56 | `shelf.test.tsx` `mostra a contagem e nomeia a área das capas` | no - prova só o singular ("1 livro"); o plural está em `conta as capas no plural`, que nenhuma check seleciona |
| C57 | `status-chip.test.tsx` `mostra o texto de cada um dos 7 status` | no - prova os 7 textos, mas não o `label`, que a check nomeia; ele está em `usa o label quando recebido`, que nenhuma check seleciona |
| C58 | `rating.test.tsx` `nomeia a nota com vírgula decimal ou Sem nota` | yes |
| C59 | `format.test.ts` `arredonda ao meio ponto e limita entre 0 e 5` | yes |
| C60 | `rating.test.tsx` `com onChange oferece 10 opções e chama onChange` | yes |
| C61 | `progress-bar.test.tsx` `mostra as páginas e o percentual` | yes |
| C62 | `format.test.ts` `limita o percentual entre 0 e 100` | yes |
| C63 | `stat.test.tsx` `sensível começa oculto e mostra o valor ao acionar o botão` | yes |
| C64 | `empty-state.test.tsx` `mostra o título como cabeçalho e a ação` | no - prova só o nível 2 padrão; o nível vindo de `level`, que a check nomeia, está em `mostra o título no nível de level`, que nenhuma check seleciona |
| C65 | `skeleton.test.tsx` `fica escondido de leitores de tela em todas as variantes` | yes |
| C66 | `page.test.tsx` `mostra uma seção para cada um dos 19 componentes e o seletor de tema` | yes |
| C67 | `page.test.tsx` `chama notFound em produção` | yes |
| C68 | walk - `docker compose stop`, `npm run dev`, erro de conexão no terminal da API e `http://localhost:3000` em 200 | yes |
| C69 | `shelf.test.tsx` `usa count como total quando é maior que as capas` | yes |
| C70 | `stepper.test.tsx` `limita current fora da lista` | yes |
| C71 | `node --test scripts/setup-env.test.mjs` | no - chama `setup-env.mjs` direto; o gatilho do critério é o `npm install`, e remover o `postinstall` do `package.json` da raiz deixa a prova verde |
| C72 | `shelf.test.tsx` `não conta nem desenha filhos vazios` | criada na correção (`b198101`); falha com `Children.count`/`Children.map`, conferido antes da correção |
| C73 | `npm run typecheck -w @estanteca/web` (`@ts-expect-error` em `shelf.test.tsx`) | criada na correção (`52623d1`); alargar `title` para `ReactNode` dá TS2578 |

## Findings

| Finding | Evidence | Fix | Closed |
| --- | --- | --- | --- |
| A Shelf conta filhos vazios como livros e desenha `<li>` vazios | Teste descartável em 23f0a31: `<Shelf title="X">{[capa, false, null]}</Shelf>` mostra "3 livros" com 3 `<li>` para 1 capa; `{capa}{false && capa}` mostra "2 livros". `shelf.tsx:27` usa `Children.count` e `shelf.tsx:60` usa `Children.map`, que contam `null`, `undefined` e booleanos | usar `Children.toArray(children)` na contagem e na lista; testar uma prateleira com filho condicional (`false`) mostrando "1 livro" e 1 item | `b198101`, C72 |
| Com `title` que não é string, o nome da área das capas vira "Livros da estante estante" | Teste descartável: `<Shelf title={<em>Cabeceira</em>}>` dá `aria-label="Livros da estante estante"`; o critério fixa `Livros da estante {título}` (`shelf.tsx:28`) | restringir `title` a string ou receber um nome acessível explícito; testar o caso | `52623d1`, C73 |
| O Stepper não limita `current` não inteiro nem `NaN` | Teste descartável: `current={1.5}` mostra "Etapa 2.5 de 3" e nenhuma etapa com `aria-current="step"`; `current={NaN}` mostra "Etapa NaN de 3" (`stepper.tsx:28` só aplica `min`/`max`) | arredondar (ou truncar) e tratar `NaN` como 0 antes de limitar; acrescentar os casos ao teste `limita current fora da lista` | `16683a0`, C70 |
| O limite de 3 caracteres da busca não tem teste na fronteira | C38 testa só `ma`; nenhum teste usa uma busca com exatamente 3 caracteres, então `<=` no lugar de `<` em `search-dialog.tsx:66` passa (o descartável confirma que hoje `mac` mostra a lista e `  ma  ` mostra a dica) | no teste do C38, afirmar que uma busca de 3 caracteres (`mac`) mostra as opções e que `  ma  ` (2 depois do trim) mostra a dica | `bc097b6`, C38 |
| Checks cuja prova seleciona só um dos casos que a própria check nomeia | C12 (sem cookie/`system` no script), C42 (`empty`), C48 (foco), C56 (plural), C57 (`label`), C64 (`level`): o outro caso está num teste verde que nenhuma check seleciona, então quebrar esse caso não derruba a prova da check | levar o segundo caso para dentro do teste que a prova seleciona (ou trocar a prova para um teste que cubra os dois) | `743079c`, C12, C42, C48, C56, C57, C64 |
| Nada prova que o script de tema está inline no `<head>` | C15 executa `THEME_SCRIPT` isolado; `layout.tsx` não tem teste, então remover o `<script dangerouslySetInnerHTML>` do `<head>` (o que faz a página piscar) não falha nada | testar o `RootLayout` (render estático) afirmando que o `<head>` tem um `<script>` com `THEME_SCRIPT` e que o layout não lê cookies | `7cbf5f0`, C15 |
| `npm test`, `npm run lint` e `npm run typecheck` passam mesmo se uma app ficar de fora | C4 e C5 julgam só o código de saída; o turbo pula sem erro um workspace sem o script da tarefa | trocar a prova por um comando que afirme as duas tarefas na saída (por exemplo, falhar se faltar `@estanteca/api:test` ou `@estanteca/web:test`, e o mesmo para lint e typecheck) | `c910a69`, C4, C5 |
| A ligação do `npm install` com o `setup-env.mjs` não é provada | C71 roda o script direto; o `postinstall` em `package.json` pode sumir sem a prova falhar | em `setup-env.test.mjs`, afirmar que `scripts.postinstall` do `package.json` da raiz executa `scripts/setup-env.mjs` | `7d3aff5`, C71 |
