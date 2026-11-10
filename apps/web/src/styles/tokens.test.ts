import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { compile } from 'tailwindcss'
import { describe, expect, it } from 'vitest'
import tokens from './design-tokens.json'

const source = readFileSync(join(import.meta.dirname, 'tokens.css'), 'utf8')

const colors = tokens.color.tokens
const radii = tokens.radius.tokens
const shadows = tokens.shadow.tokens
const spaces = tokens.spacing.tokens

const shadowName = (name: string) => (name.startsWith('shadow-') ? name : `shadow-${name}`)
const radiusUtility = (name: string) => name.replace('radius-', 'rounded-')

const candidates = [
  ...colors.flatMap(({ name }) => [`bg-${name}`, `text-${name}`, `border-${name}`]),
  ...radii.map(({ name }) => radiusUtility(name)),
  ...shadows.map(({ name }) => shadowName(name)),
  'p-4',
]

const css = (await compile(`@tailwind utilities;\n${source}`)).build(candidates)

function block(input: string, header: string): string {
  const start = input.indexOf(`${header} {`)
  if (start === -1) throw new Error(`bloco não encontrado: ${header}`)
  const open = input.indexOf('{', start)
  let depth = 0
  for (let i = open; i < input.length; i++) {
    if (input[i] === '{') depth++
    if (input[i] === '}' && --depth === 0) return input.slice(open + 1, i)
  }
  throw new Error(`bloco sem fechamento: ${header}`)
}

function vars(body: string): Record<string, string> {
  return Object.fromEntries(
    [...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()])
  )
}

const themeVars = vars(block(css, ':root, :host'))
const rootVars = vars(block(css, ':root'))
const darkVars = vars(block(css, ':root[data-theme="dark"]'))
const systemDarkVars = vars(
  block(block(css, '@media (prefers-color-scheme: dark)'), ':root:not([data-theme="light"])')
)

describe('tokens', () => {
  it('define as 15 cores do tema claro com os valores do design system', () => {
    expect(colors).toHaveLength(15)
    for (const { name, value } of colors) {
      expect(themeVars[`--color-${name}`], name).toBe(value.light)
    }
  })

  it('redefine as 15 cores em [data-theme="dark"]', () => {
    for (const { name, value } of colors) {
      expect(darkVars[`--color-${name}`], name).toBe(value.dark)
    }
  })

  it('define raios, sombras por tema e espaçamentos com os valores do design system', () => {
    expect(radii).toHaveLength(4)
    for (const { name, value } of radii) {
      expect(themeVars[`--${name}`], name).toBe(value)
    }

    expect(shadows).toHaveLength(3)
    for (const { name, value } of shadows) {
      expect(rootVars[`--theme-${shadowName(name)}`], `${name} claro`).toBe(value.light)
      expect(darkVars[`--theme-${shadowName(name)}`], `${name} escuro`).toBe(value.dark)
    }

    expect(spaces).toHaveLength(7)
    for (const { name, value } of spaces) {
      expect(rootVars[`--${name}`], name).toBe(value)
    }
  })

  it('expõe os tokens no @theme e mantém --spacing em 0.25rem', () => {
    for (const { name } of colors) {
      expect(block(css, `.bg-${name}`)).toContain(`background-color: var(--color-${name});`)
      expect(block(css, `.text-${name}`)).toContain(`color: var(--color-${name});`)
      expect(block(css, `.border-${name}`)).toContain(`border-color: var(--color-${name});`)
    }
    for (const { name } of radii) {
      expect(block(css, `.${radiusUtility(name)}`)).toContain(`border-radius: var(--${name});`)
    }
    for (const { name } of shadows) {
      expect(block(css, `.${shadowName(name)}`)).toContain(
        `--tw-shadow: var(--theme-${shadowName(name)});`
      )
    }

    expect(themeVars['--spacing']).toBe('0.25rem')
    expect(block(css, '.p-4')).toContain('padding: calc(var(--spacing) * 4);')
    for (const { name, value } of spaces) {
      const step = Number(name.replace('space-', ''))
      expect(`${step * 4}px`, name).toBe(value)
    }
  })

  it('aplica as cores escuras pela media query quando não há data-theme="light"', () => {
    for (const { name, value } of colors) {
      expect(systemDarkVars[`--color-${name}`], name).toBe(value.dark)
    }
    for (const { name, value } of shadows) {
      expect(systemDarkVars[`--theme-${shadowName(name)}`], name).toBe(value.dark)
    }
  })
})
