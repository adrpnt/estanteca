# 01-foundation proofs

**HEAD**: 3e70ff3
**Tree**: clean
**Shell**: /bin/sh
**Result**: 76 pass, 0 fail

| Check | Proof | Result |
| --- | --- | --- |
| C1 | `node scripts/smoke-dev.mjs` | pass |
| C2 | `run api / ✔ GET / responde 200 com um corpo JSON` | pass |
| C3 | `run api / ✔ conexão usa o cliente pg no banco estanteca_test` | pass |
| C4 | `out=$(npm test 2>&1) && echo "$out" / grep -q "@estanteca/api:test: .*PASSED" && echo "$out" / grep -q "@estan` | pass |
| C5 | `out=$(npm run lint 2>&1 && npm run typecheck 2>&1) && for t in api:lint web:lint api:typecheck web:typecheck; ` | pass |
| C6 | `npm run typecheck -w @estanteca/web` | pass |
| C7 | `run web / ✓ tokens > define as 15 cores do tema claro com os valores do design system` | pass |
| C8 | `run web / ✓ tokens > redefine as 15 cores em [data-theme="dark"]` | pass |
| C9 | `run web / ✓ tokens > define raios, sombras por tema e espaçamentos com os valores do design system` | pass |
| C10 | `run web / ✓ tokens > expõe os tokens no @theme e mantém --spacing em 0.25rem` | pass |
| C11 | `run web / ✓ tokens > mapeia serif, sans e mono para as fontes do next/font` | pass |
| C12 | `run web / ✓ tokens > sem preferência ou com system, o tema segue a media query, que aplica as cores escuras` | pass |
| C13 | `run web / ✓ ThemeSwitcher > escolher Escuro aplica data-theme e grava o cookie sem recarregar` | pass |
| C14 | `run web / ✓ ThemeSwitcher > escolher Automático remove data-theme e grava system` | pass |
| C15 | `run web / ✓ THEME_SCRIPT > o layout põe no head o script que aplica o tema do cookie ao elemento raiz` | pass |
| C16 | `run web / ✓ parseTheme > trata valor inválido como system` | pass |
| C17 | `run web / ✓ Button > usa type button e a variante secondary por padrão` | pass |
| C18 | `run web / ✓ Button > só com ícone usa o aria-label como nome acessível` | pass |
| C19 | `run web / ✓ Button > desabilitado não chama onClick` | pass |
| C20 | `run web / ✓ TextField > encontra o campo pelo texto do rótulo` | pass |
| C21 | `run web / ✓ TextField > com erro marca aria-invalid e é descrito pelo erro` | pass |
| C22 | `run web / ✓ TextField > com dica é descrito pela dica` | pass |
| C23 | `run web / ✓ TextField > obrigatório marca required e esconde o asterisco` | pass |
| C24 | `run web / ✓ TextField > mostra o prefixo escondido de leitores de tela` | pass |
| C25 | `run web / ✓ FilterChip > expõe aria-pressed e formata a contagem em pt-BR` | pass |
| C26 | `run web / ✓ Stepper > mostra Etapa 2 de 3 e marca a etapa atual` | pass |
| C27 | `run web / ✓ Stepper > anuncia as etapas anteriores como concluídas` | pass |
| C28 | `run web / ✓ ActionMenu > abre com os itens visíveis e sem os escondidos` | pass |
| C29 | `run web / ✓ ActionMenu > escolher um item chama onSelect e fecha o menu` | pass |
| C30 | `run web / ✓ ActionMenu > Esc fecha e devolve o foco ao botão` | pass |
| C31 | `run web / ✓ SideNav > marca só o item atual com aria-current` | pass |
| C32 | `run web / ✓ BottomNav > marca só o item atual com aria-current` | pass |
| C33 | `run web / ✓ SideNav > recolhida mantém o rótulo como nome do link` | pass |
| C34 | `run web / ✓ SideNav > o botão de recolher chama onCollapsedChange com o oposto` | pass |
| C35 | `run web / ✓ SearchTrigger > mostra Ctrl K fora do macOS` | pass |
| C36 | `run web / ✓ SearchTrigger > mostra ⌘K no macOS` | pass |
| C37 | `run web / ✓ SearchDialog > Ctrl+K alterna a abertura` | pass |
| C38 | `run web / ✓ SearchDialog > com menos de 3 caracteres mostra a dica e nenhuma lista` | pass |
| C39 | `run web / ✓ SearchDialog > mostra os grupos com resultados e ignora os vazios` | pass |
| C40 | `run web / ✓ SearchDialog > setas movem o resultado ativo e voltam ao início` | pass |
| C41 | `run web / ✓ SearchDialog > Enter escolhe o resultado ativo` | pass |
| C42 | `run web / ✓ SearchDialog > sem resultados mostra a mensagem de nada encontrado ou o conteúdo de empty` | pass |
| C43 | `run web / ✓ SearchDialog > Esc e clique fora fecham` | pass |
| C44 | `run web / ✓ matchesQuery > jose de alencar encontra José de Alencar` | pass |
| C45 | `run web / ✓ Toast > anuncia sucesso de forma educada e erro de forma assertiva` | pass |
| C46 | `run web / ✓ Toast > ação e Fechar aviso removem o aviso` | pass |
| C47 | `run web / ✓ Toast > sucesso some em 5 segundos e com ação em 8` | pass |
| C48 | `run web / ✓ Toast > ponteiro ou foco no aviso pausam a contagem` | pass |
| C49 | `run web / ✓ Toast > erro fica até ser fechado` | pass |
| C50 | `run web / ✓ toast queue > o quarto aviso remove o mais antigo` | pass |
| C51 | `run web / ✓ BookCover > sem src mostra título e autor` | pass |
| C52 | `run web / ✓ BookCover > xs sem src mostra só a inicial` | pass |
| C53 | `run web / ✓ BookCover > sem alt fica escondido e com alt usa o texto` | pass |
| C54 | `run web / ✓ BookCard > com href o título é um link para href` | pass |
| C55 | `run web / ✓ BookCard > aciona actions sem acionar o link` | pass |
| C56 | `run web / ✓ Shelf > mostra a contagem e nomeia a área das capas` | pass |
| C57 | `run web / ✓ StatusChip > mostra o texto de cada um dos 7 status ou o label` | pass |
| C58 | `run web / ✓ Rating > nomeia a nota com vírgula decimal ou Sem nota` | pass |
| C59 | `run web / ✓ roundRating > arredonda ao meio ponto e limita entre 0 e 5` | pass |
| C60 | `run web / ✓ Rating > com onChange oferece 10 opções e chama onChange` | pass |
| C61 | `run web / ✓ ProgressBar > mostra as páginas e o percentual` | pass |
| C62 | `run web / ✓ progress > limita o percentual entre 0 e 100` | pass |
| C63 | `run web / ✓ Stat > sensível começa oculto e mostra o valor ao acionar o botão` | pass |
| C64 | `run web / ✓ EmptyState > mostra o título como cabeçalho no nível de level e a ação` | pass |
| C65 | `run web / ✓ Skeleton > fica escondido de leitores de tela em todas as variantes` | pass |
| C66 | `run web / ✓ página /design > mostra uma seção para cada um dos 19 componentes e o seletor de tema` | pass |
| C67 | `run web / ✓ página /design > chama notFound em produção` | pass |
| C68 | `walk - com docker compose stop, rodar npm run dev e ver o erro de conexão do PostgreSQL no terminal da API enq` | pass (Walked) |
| C69 | `run web / ✓ Shelf > usa count como total quando é maior que as capas` | pass |
| C70 | `run web / ✓ Stepper > limita current fora da lista` | pass |
| C71 | `node --test scripts/setup-env.test.mjs` | pass |
| C72 | `run web / ✓ Shelf > não conta nem desenha filhos vazios` | pass |
| C73 | `npm run typecheck -w @estanteca/web` | pass |
| Build | `npm run build` | pass |
| Build | `npm run typecheck` | pass |
| Build | `npm run lint` | pass |

## Output

`Run api` - exit 0

```
❯ Executed 2 migrations (58 ms)

functional / Home (tests/functional/home.spec.ts)
  ✔ GET / responde 200 com um corpo JSON (21.73ms)

integration / Banco de dados (tests/integration/database.spec.ts)
  ✔ conexão usa o cliente pg no banco estanteca_test (1.94ms)
❯ Reverted 2 migrations (20 ms)

 PASSED 

Tests  2 passed (2)
 Time  60ms
npm notice run @estanteca/api@0.0.0 test
npm notice run node ace test --reporters=spec
```

`Run web` - exit 0

```
 ✓ src/lib/toast.test.ts > toast queue > erro fica sem prazo, com ou sem ação 0ms
 ✓ src/lib/toast.test.ts > toast queue > o quarto aviso remove o mais antigo 0ms
 ✓ src/lib/toast.test.ts > toast queue > dismiss remove só o aviso indicado 0ms

 Test Files  27 passed (27)
      Tests  98 passed (98)
   Start at  16:09:47
   Duration  3.40s (environment 58%, tests 16%, setup 13%, import 11%, transform 2%)

Environment  jsdom was created 27 times · 11.42s total, 58% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

npm notice run @estanteca/web@0.0.0 test
npm notice run vitest run --reporter=verbose
```

`node scripts/smoke-dev.mjs` - exit 0

```
dev ok: api 200, web 200
```

`out=$(npm test 2>&1) && echo "$out" / grep -q "@estanteca/api:test: .*PASSED" && echo "$out" / grep -q "@estan` - exit 0

```
(no output)
```

`out=$(npm run lint 2>&1 && npm run typecheck 2>&1) && for t in api:lint web:lint api:typecheck web:typecheck; ` - exit 0

```
(no output)
```

`npm run typecheck -w @estanteca/web` - exit 0

```
Generating route types...
✓ Types generated successfully
npm notice run @estanteca/web@0.0.0 typecheck
npm notice run next typegen && tsc --noEmit
```

`node --test scripts/setup-env.test.mjs` - exit 0

```
▶ setup-env
  ✔ roda no npm install da raiz (0.459875ms)
  ✔ cria o .env a partir do .env.example com um APP_KEY novo quando falta (74.979417ms)
  ✔ mantém intacto um .env que já existe (37.890792ms)
✔ setup-env (113.891417ms)
ℹ tests 3
ℹ suites 1
ℹ pass 3
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 163.591958
```
