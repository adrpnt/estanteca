## Issue

Closes PER-N

<!-- Link da issue no Linear. Título do PR: "PER-N: <título da issue>". -->

## Tipo

<!-- Label do GitHub: feature, enhancement, documentation ou ci/deploy. -->

- [ ] Nova funcionalidade (`feature`)
- [ ] Melhoria de algo existente (`enhancement`)
- [ ] Documentação (`documentation`)
- [ ] Deploy, CI ou infraestrutura (`ci/deploy`)

## O que muda

<!-- 2 a 4 frases: o que entra e por quê. -->

## Partes afetadas

- [ ] `apps/api` (AdonisJS: rotas, modelos, migrações, policies)
- [ ] `apps/web` (Next.js: páginas, componentes, estilos)
- [ ] Raiz do monorepo (Docker, scripts, configuração)
- [ ] Documentação

<!-- Se uma rota da API mudou, o ajuste no cliente tipado e no apps/web precisa estar neste mesmo PR. -->

## Commits

| Commit    | Descrição |
| --------- | --------- |
| `abc1234` | ...       |

## Como testar

1. ...

## Gates rodados

<!-- Liste os comandos executados e o resultado. Remova o que não se aplica. Os testes da API precisam do PostgreSQL no ar: docker compose up -d. -->

- [ ] `npm run build`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm test` (API e web)

## Capturas de tela

<!-- Obrigatório quando muda algo visual: antes e depois, nos temas claro e escuro, no celular e no desktop. -->

## Checklist do projeto

- [ ] Nenhum segredo no código; `.env.example` atualizado se surgiu variável nova
- [ ] Privacidade respeitada: valor investido e dados de aquisição não saem em rotas públicas, e o que é privado (perfil, estantes, anotações) só aparece para o dono
- [ ] Cores, raios, sombras e espaçamentos vêm dos tokens do design system, sem valores soltos
- [ ] Acessibilidade: contraste WCAG AA nos dois temas, foco visível, navegação por teclado e `prefers-reduced-motion`
- [ ] Textos da interface em pt-BR e nomes técnicos em inglês
