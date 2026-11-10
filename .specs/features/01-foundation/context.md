# Fundação do monorepo Context

**Gathered:** 2026-11-10
**Spec:** `.specs/features/01-foundation/spec.md`
**Status:** Ready for design

---

## Feature Boundary

Monorepo AdonisJS (API) + Next.js (web) com PostgreSQL, testes nas duas apps, tokens e tema do design system Estanteca e os 19 componentes base, vistos na rota `/design`. Conta (escopo 5.1) é a feature seguinte.

---

## Implementation Decisions

### Nome das apps

- `apps/api` e `apps/web`, renomeando as pastas `apps/backend` e `apps/frontend` do starter kit. User: "apps/api e apps/web (Recommended)".

### Base dos componentes

- Componentes interativos (ActionMenu, SearchDialog, Toast e tooltip) sobre Radix, via shadcn/ui, com o visual dos tokens. Os demais vêm direto do design system. User: "Radix nos interativos (Recommended)".

### Tamanho da entrega

- Os 19 componentes do design system entram nesta feature. User: "Todos os 19 (Recommended)".

### Vitrine

- Rota `/design` no web, só em desenvolvimento. User: "Rota /design no web (Recommended)".

### Banco de dados

- PostgreSQL 18 no lugar do 17 proposto antes. User: "Porque não usar o PostgreSQL 18?"

### Ajustes do design (2026-11-10)

- Tema aplicado por script inline antes da pintura; o critério 7 de tema foi ajustado. User: "Script inline antes da pintura (Recommended)".
- Espaçamento pela escala padrão de 4px do Tailwind; o critério 3 de tokens foi ajustado. User: "Usar a escala padrão (Recommended)".
- Primitivas do pacote `radix-ui` sem a CLI do shadcn (AD-003); o critério 9 de avisos passou a citar `aria-live`. User: "Radix direto, sem shadcn (Recommended)".
- As mudanças do usuário no `.gitignore` entram no commit da estrutura. User: "Incluir as suas no commit (Recommended)".

### Agent's Discretion

Nenhuma área delegada explicitamente.

### Declined / Undiscussed Gray Areas → Assumptions

Gerenciador de pacotes, ferramentas de teste do web, versões, fontes servidas pelo app, cookie de tema e conferência visual manual estão na tabela de Assumptions da spec, aguardando correção.

---

## Specific References

- [Design system Estanteca](https://claude.ai/artifact/3wJJghiug3NRiRHqpu1NmW): tokens, guias e previews de cada componente.

---

## Deferred Ideas

- Pacote `packages/ui` compartilhado quando o app móvel existir.
- CI no GitHub Actions.
