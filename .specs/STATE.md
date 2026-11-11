# STATE

## Decisions

### AD-001
- **Decision**: As apps do monorepo se chamam `apps/api` (AdonisJS) e `apps/web` (Next.js), renomeando `apps/backend` e `apps/frontend` do starter kit API Monorepo.
- **Reason**: Segue o escopo do projeto (seção 10.1) e deixa o lugar natural para `apps/mobile`. Pergunta: "O starter kit do AdonisJS cria as pastas apps/backend e apps/frontend, mas o escopo da Estanteca usa apps/api e apps/web. Qual nome usar?" Opção escolhida: "apps/api e apps/web".
- **Trade-off**: Os caminhos deixam de bater com a documentação do AdonisJS e com futuras atualizações do kit.
- **Scope**: Monorepo inteiro.
- **Date**: 2026-11-10
- **Status**: active

### AD-002
- **Decision**: Componentes interativos da interface (menu, dialog, toast, tooltip) são construídos sobre Radix via shadcn/ui; componentes de apresentação são próprios, portados do design system Estanteca.
- **Reason**: Radix resolve foco, portais, teclado e anúncios a leitores de tela, que são a parte difícil desses componentes. Pergunta: "Como levar os componentes para o Next.js?" Opção escolhida: "Radix nos interativos".
- **Trade-off**: Dependência de Radix e a estrutura de DOM dele; o visual precisa ser reaplicado com os tokens.
- **Scope**: `apps/web`, componentes de interface.
- **Date**: 2026-11-10
- **Status**: superseded by AD-003

### AD-003
- **Decision**: Componentes interativos da interface (menu, dialog, toast, tooltip) usam as primitivas do pacote `radix-ui` diretamente, sem a CLI nem o registro do shadcn/ui; componentes de apresentação são próprios, portados do design system Estanteca.
- **Reason**: O shadcn/ui gera componentes presos às variáveis dele (`--accent`, `--border`, `--ring`), que colidem com os tokens da Estanteca, e descontinuou o Toast em favor do Sonner, que não é Radix. Pergunta: "Radix sem a CLI do shadcn... Posso seguir assim?" Opção escolhida: "Radix direto, sem shadcn".
- **Trade-off**: Sem os componentes prontos do shadcn: cada wrapper Radix é escrito à mão com o visual do design system. O Toast anuncia com `aria-live` (educado ou assertivo), nunca `role="alert"`.
- **Scope**: `apps/web`, componentes de interface.
- **Date**: 2026-11-10
- **Status**: active

### AD-004
- **Decision**: Cada feature é um milestone no projeto "Estanteca" do Linear (ex.: "01 · Foundation") e cada fase do `tasks.md` tem uma issue nele, com as tarefas em checklist, citada na linha `**Linear**:` abaixo do título da fase. Cada fase roda em uma branch e um PR próprios:
  - **Início da fase**: (1) branch com o nome exato do `gitBranchName` da issue (padrão `pntadr/per-N-titulo`), lido no Linear e nunca deduzido; ela sai de `master` atualizada, ou da branch da fase anterior se o PR dela ainda não foi mergeado; (2) a issue vai para "In Progress", com o usuário como responsável.
  - **Fim da fase** (todas as tarefas commitadas e o gate Build verde; na última fase, depois da verificação final da feature): (1) com o ok do usuário, `git push -u origin <branch>`; (2) `gh pr create` com o título `PER-N: <título da issue>`, base `master` ou a branch da fase anterior, `--assignee @me`, o label e o corpo do modelo `feature.md` (AD-005), sem IDs de tarefa nem referências a `.specs/`; (3) o link do PR entra na issue; (4) as automações do Linear movem a issue para "In Review" quando o PR é aberto e para "Done" depois do merge, e o Claude não altera esses status.
  - **Autoria**: o PR é aberto pelo `gh` autenticado como o usuário (`adrpnt`), que fica como autor. Commits e PRs não levam `Co-Authored-By` nem linha "Generated with Claude Code".
- **Reason**: Pedido do usuário: "Quero integrar o projeto ao linear [...] Onde cada feature será uma milestone e cada task uma issue. Use como referência o projeto [Corretora Midiã]", que usa uma issue por fase (AD-022 de lá). Perguntas: "Como criar as issues da Estanteca?" Opção escolhida: "Uma issue por fase (Recomendado)". "Adotar esse fluxo na Estanteca no lugar da branch única feat/monorepo-foundation?" Opção escolhida: "Sim, igual à referência (Recomendado)".
- **Trade-off**: A `01-foundation` passa a ter sete PRs em vez de um. Fases empilhadas (PR anterior ainda não mergeado) precisam de rebase se o PR anterior mudar. Merge, force-push e deploy continuam exigindo autorização explícita.
- **Scope**: `.specs/features/` (todas as features), Linear e GitHub
- **Date**: 2026-11-10
- **Status**: active, with the PR body and labels defined by AD-005

### AD-005
- **Decision**: Todo PR usa um de dois modelos em `.github/PULL_REQUEST_TEMPLATE/`:
  - **`feature.md`**: funcionalidade nova (label `feature`, inclusive as fases das features), melhoria de algo existente (`enhancement`), só documentação (`documentation`) ou deploy, CI e infraestrutura (`ci/deploy`).
  - **`fix.md`**: bug, correção ou hotfix, sempre com o label `bug`. O hotfix é marcado no corpo do PR; não há label `hotfix`.
  - **Escolha**: pelo tipo da issue no Linear (label Bug leva ao `fix.md`), conferido com o prefixo dos commits (`feat`/`docs`/`chore` ou `fix`).
  - **Título**: `PER-N: <título da issue>` (AD-004).
  - **Issue obrigatória**: todo bug e hotfix tem issue no Linear antes da branch, que usa o `gitBranchName` dela, como nas fases.
  - **Abertura pelo Claude**: lê o modelo, preenche todas as seções (as que não se aplicam ficam com "Não se aplica"), sem IDs de tarefa nem referências a `.specs/`, grava o corpo num arquivo temporário e roda `gh pr create --body-file <arquivo>` com título, `--assignee @me` e o label. Pela linha de comando: `gh pr create --template fix.md`; pelo site: `?template=fix.md` na URL de comparação.
- **Reason**: Pedido do usuário: "Pode trazer os modelos.", sobre os modelos de PR do AD-023 da Corretora Midiã. Adaptados à Estanteca: partes afetadas (`apps/api`, `apps/web`, raiz), gates do monorepo, capturas nos temas claro e escuro, e checklist de privacidade, tokens e acessibilidade do escopo (5.1 e 7.2). A tabela de commits não tem coluna de tarefa.
- **Trade-off**: Troca o `enhancement` do AD-004 por `feature` para código novo; `enhancement` fica para melhorias. O repositório tem só os labels `feature`, `enhancement`, `documentation`, `ci/deploy` e `bug`, criados pelo usuário em 2026-11-10 com os nomes e descrições da Corretora Midiã. Sem `?template=`, o site do GitHub abre o corpo em branco, porque não existe modelo padrão.
- **Scope**: `.github/`, GitHub e Linear (todos os PRs)
- **Date**: 2026-11-10
- **Status**: active

### AD-006
- **Decision**: A autenticação usa os access tokens da API (guard `api`, o padrão). No web, o token fica num cookie `httpOnly` do domínio do Next.js:
  - **Login**: o Next.js chama `POST /api/v1/auth/login` no servidor, recebe o token e grava o cookie `httpOnly` (`Secure` em produção). O token nunca vai para o `localStorage` nem fica legível pelo JavaScript do navegador.
  - **Renderização no servidor**: Server Components, Route Handlers e Server Actions leem o cookie e chamam a API com `Authorization: Bearer <token>`.
  - **Logout e expiração**: o Next.js chama `POST /api/v1/account/logout`, apaga o cookie e redireciona para o login; um 401 da API também apaga o cookie.
  - **App móvel**: usa os mesmos access tokens, enviados direto no header `Authorization`.
  - **Em aberto**: como os componentes de cliente (TanStack Query na área logada) chegam à API sem ler o token, se por um Route Handler do Next.js que repassa as chamadas ou por outro arranjo. Fica para a primeira feature com login no web.
- **Reason**: O web renderiza páginas no servidor, e o servidor do Next.js só enxerga o que vem na requisição da página, então a credencial precisa estar num cookie. Os access tokens já são o guard padrão e servem sem mudança ao app móvel. Pergunta: "Como o Next.js repassa a credencial do usuário para a API: token no `localStorage`, token num cookie `httpOnly` do Next.js ou cookie de sessão do Adonis?" Opção escolhida: "Token num cookie `httpOnly` do domínio do Next.js".
- **Trade-off**: O login e o logout do web passam pelo servidor do Next.js, que guarda e repassa o token. Páginas que leem o cookie ficam dinâmicas e não podem ir para cache compartilhado; páginas públicas com dado pessoal (ex.: "está na sua estante") buscam essa parte no cliente. O guard `web` (sessão) fica sem uso.
- **Scope**: `apps/web` e `apps/api`, autenticação
- **Date**: 2026-11-11
- **Status**: active

## Handoff

- **Feature**: `.specs/features/01-foundation`
- **Phase / Task**: Execute concluído; Fase 7 (PER-56, "In Review"), PR #12 aberto
- **Completed**: Fases 1 a 6 mergeadas (PRs #6 a #11); Fase 7 com as 2 tarefas, a caminhada, o Verifier (8 achados, todos fechados por commit), 76 provas verdes e `validate_verification.py` com 0 erros; 8 lições candidatas em `.specs/LESSONS.md`
- **In-progress** (file:line): nenhum
- **Next step**: merge do PR #12 pelo usuário; a feature `01-foundation` fecha com ele. Próxima feature a especificar
- **Blockers**: none
- **Uncommitted files**: nenhum
- **Branch**: `pntadr/per-56-fase-7-vitrine-e-documentacao`
