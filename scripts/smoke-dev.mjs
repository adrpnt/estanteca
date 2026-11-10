// Sobe `npm run dev`, espera a API (:3333) e o web (:3000) responderem 200 e encerra tudo.
// Uso: node scripts/smoke-dev.mjs
import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const TARGETS = [
  { name: 'api', url: 'http://localhost:3333' },
  { name: 'web', url: 'http://localhost:3000' },
]
const TIMEOUT_MS = 120_000

async function statusOf(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(2_000) })
    return response.status
  } catch {
    return null
  }
}

async function statuses() {
  return Promise.all(TARGETS.map((target) => statusOf(target.url)))
}

function stop(child) {
  return new Promise((resolve) => {
    if (child.exitCode !== null || child.signalCode !== null) return resolve()
    const force = setTimeout(() => process.kill(-child.pid, 'SIGKILL'), 10_000)
    child.once('exit', () => {
      clearTimeout(force)
      resolve()
    })
    // O processo roda em um grupo próprio: o sinal alcança npm, turbo e os servidores.
    process.kill(-child.pid, 'SIGTERM')
  })
}

async function main() {
  const before = await statuses()
  const busy = TARGETS.filter((_, index) => before[index] !== null)
  if (busy.length > 0) {
    return `porta já em uso antes do teste: ${busy.map((target) => target.url).join(', ')}`
  }

  const child = spawn('npm', ['run', 'dev', '--', '--ui=stream'], {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  let output = ''
  child.stdout.on('data', (chunk) => (output += chunk))
  child.stderr.on('data', (chunk) => (output += chunk))

  const deadline = Date.now() + TIMEOUT_MS
  let last = []
  try {
    while (Date.now() < deadline) {
      if (child.exitCode !== null) {
        return `npm run dev terminou com código ${child.exitCode}\n${output.slice(-2_000)}`
      }
      last = await statuses()
      if (last.every((status) => status === 200)) {
        console.log(`dev ok: ${TARGETS.map((t, i) => `${t.name} ${last[i]}`).join(', ')}`)
        return null
      }
      await sleep(1_000)
    }
    const report = TARGETS.map((t, i) => `${t.name} ${last[i] ?? 'sem resposta'}`).join(', ')
    return `sem 200 em ${TIMEOUT_MS / 1_000} s (${report})\n${output.slice(-2_000)}`
  } finally {
    await stop(child)
  }
}

const failure = await main()
if (failure) {
  console.error(`dev falhou: ${failure}`)
  process.exit(1)
}
