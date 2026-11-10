// Cria apps/api/.env a partir do .env.example, com um APP_KEY novo, quando o arquivo não existe.
// Roda no postinstall da raiz. Uso: node scripts/setup-env.mjs [pasta da API]
import { randomBytes } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = process.argv[2] ?? fileURLToPath(new URL('../apps/api/', import.meta.url))
const env = join(dir, '.env')
const example = join(dir, '.env.example')

if (!existsSync(env) && existsSync(example)) {
  // 32 caracteres URL-safe, o mesmo formato do `node ace generate:key`.
  const key = randomBytes(24).toString('base64url')
  const content = readFileSync(example, 'utf8').replace(/^APP_KEY=.*$/m, `APP_KEY=${key}`)
  writeFileSync(env, content, { flag: 'wx' })
  console.log('apps/api/.env criado a partir do .env.example, com um APP_KEY novo.')
}
