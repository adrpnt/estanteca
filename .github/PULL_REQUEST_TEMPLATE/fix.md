## Issue

Closes PER-N

<!-- Link da issue no Linear. Todo bug e hotfix tem issue antes da branch. Título do PR: "PER-N: <título da issue>". Label do GitHub: bug. -->

## Tipo

- [ ] Bug (correção planejada)
- [ ] Hotfix (produção afetada, urgente)

## Problema

**O que acontece:**

**O que deveria acontecer:**

**Onde:** <!-- página, rota da API ou componente -->

**Impacto:** <!-- quem é afetado; perde dado do acervo? expõe dado privado? -->

**Como reproduzir:**

1. ...

## Causa raiz

<!-- Por que acontecia, com arquivo:linha. -->

## Correção

<!-- O que mudou e por que resolve. Só a correção, sem refatoração junto. -->

## Teste de regressão

- [ ] Teste novo que falhava antes e agora passa: `caminho/do/teste`
- [ ] Sem teste automatizado. Motivo:

## Como validar

1. ...

## Gates rodados

<!-- Liste os comandos executados e o resultado. Remova o que não se aplica. Os testes da API precisam do PostgreSQL no ar: docker compose up -d. -->

- [ ] `npm run build`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm test` (API e web)

## Risco e rollback

- **Áreas afetadas:**
- **Rollback:** reverter este PR / outro passo:
- **Hotfix:** precisa de deploy logo após o merge? sim / não

## Checklist do projeto

- [ ] Correção mínima, sem mudanças fora do problema
- [ ] Regras de privacidade e policies do dono do acervo continuam valendo
- [ ] Nenhum dado privado exposto (valor investido, dados de aquisição, perfil, estantes e anotações privados)
- [ ] Nenhum segredo no código
