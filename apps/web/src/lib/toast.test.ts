import { afterEach, describe, expect, it } from 'vitest'
import { getToasts, toast } from './toast'

const undo = { label: 'Desfazer', onClick: () => {} }

afterEach(() => {
  toast.dismiss()
})

describe('toast queue', () => {
  it('sucesso sem ação dura 5 segundos', () => {
    toast.success('Exemplar adicionado ao acervo.')

    expect(getToasts()).toEqual([
      expect.objectContaining({
        tone: 'success',
        message: 'Exemplar adicionado ao acervo.',
        duration: 5000,
      }),
    ])
  })

  it('sucesso com ação dura 8 segundos', () => {
    toast.success('Exemplar adicionado ao acervo.', { action: undo })

    expect(getToasts()).toEqual([
      expect.objectContaining({ tone: 'success', action: undo, duration: 8000 }),
    ])
  })

  it('erro fica sem prazo, com ou sem ação', () => {
    toast.error('Não foi possível enviar a capa.')
    toast.error('O arquivo passa de 10 MB.', { action: undo })

    expect(getToasts().map((item) => [item.tone, item.duration])).toEqual([
      ['error', Infinity],
      ['error', Infinity],
    ])
  })

  it('o quarto aviso remove o mais antigo', () => {
    toast.success('Primeiro.')
    toast.error('Segundo.')
    toast.success('Terceiro.')
    toast.success('Quarto.')

    expect(getToasts().map((item) => item.message)).toEqual(['Segundo.', 'Terceiro.', 'Quarto.'])
  })

  it('dismiss remove só o aviso indicado', () => {
    toast.success('Primeiro.')
    const id = toast.success('Segundo.')
    toast.success('Terceiro.')

    toast.dismiss(id)

    expect(getToasts().map((item) => item.message)).toEqual(['Primeiro.', 'Terceiro.'])
  })
})
