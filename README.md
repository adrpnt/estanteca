# Estanteca

Cada livro no seu lugar. Monorepo com a API em AdonisJS (`apps/api`) e o web em Next.js (`apps/web`), sobre PostgreSQL.

## Pré-requisitos

- Node.js 24 ou mais recente
- npm 12
- Docker, com Docker Compose

## Começar

```sh
git clone https://github.com/adrpnt/estanteca.git && cd estanteca
npm install
docker compose up -d
npm run dev
```

- API: <http://localhost:3333>
- Web: <http://localhost:3000>

O `npm install` cria `apps/api/.env` a partir do `apps/api/.env.example`, com um `APP_KEY` novo, quando o arquivo ainda não existe. Um `.env` que já existe não é alterado.

O `docker compose up -d` sobe o PostgreSQL 18 na porta 5432, com o banco `estanteca` para desenvolvimento e o `estanteca_test` para os testes da API.

## Scripts da raiz

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe a API e o web em modo de desenvolvimento |
| `npm run build` | Gera o build das duas apps |
| `npm test` | Roda os testes da API (Japa) e do web (Vitest) |
| `npm run lint` | Roda o ESLint nas duas apps |
| `npm run typecheck` | Confere os tipos das duas apps |
| `npm run format` | Formata o código da API com o Prettier |
| `npm run codegen` | Regenera o registro de rotas da API usado pelo cliente tipado do web |

Os testes da API precisam do PostgreSQL no ar (`docker compose up -d`).

## Vitrine dos componentes

Com `npm run dev` rodando, <http://localhost:3000/design> mostra os componentes do design system nos estados de referência, com o seletor de tema. A rota existe só em desenvolvimento e responde 404 no build de produção.

## Estrutura

```text
apps/
  api/   API AdonisJS
  web/   Web Next.js (App Router, Tailwind CSS)
docker/  Scripts de inicialização do PostgreSQL
scripts/ Scripts da raiz (criação do .env, teste de fumaça do npm run dev)
```
