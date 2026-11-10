// Uso: node --test scripts/setup-env.test.mjs
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const SCRIPT = fileURLToPath(new URL('./setup-env.mjs', import.meta.url))
const EXAMPLE = 'TZ=UTC\nPORT=3333\n\n# App\nAPP_KEY=\nAPP_URL=http://${HOST}:${PORT}\n'

function apiDir() {
  const dir = mkdtempSync(join(tmpdir(), 'estanteca-env-'))
  writeFileSync(join(dir, '.env.example'), EXAMPLE)
  return dir
}

function run(dir) {
  execFileSync(process.execPath, [SCRIPT, dir], { stdio: 'pipe' })
}

describe('setup-env', () => {
  it('cria o .env a partir do .env.example com um APP_KEY novo quando falta', () => {
    const first = apiDir()
    const second = apiDir()

    run(first)
    run(second)

    const env = readFileSync(join(first, '.env'), 'utf8')
    const key = env.match(/^APP_KEY=(.*)$/m)[1]
    assert.match(key, /^[A-Za-z0-9_-]{32}$/)
    assert.equal(env, EXAMPLE.replace('APP_KEY=\n', `APP_KEY=${key}\n`))

    const otherKey = readFileSync(join(second, '.env'), 'utf8').match(/^APP_KEY=(.*)$/m)[1]
    assert.notEqual(otherKey, key)
  })

  it('mantém intacto um .env que já existe', () => {
    const dir = apiDir()
    const mine = 'PORT=4444\nAPP_KEY=minha-chave\n'
    writeFileSync(join(dir, '.env'), mine)

    run(dir)

    assert.equal(readFileSync(join(dir, '.env'), 'utf8'), mine)
  })
})
