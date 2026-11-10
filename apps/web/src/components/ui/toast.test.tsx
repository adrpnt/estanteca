import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { toast } from '@/lib/toast'
import { Toaster } from './toast'

const added = 'Exemplar adicionado ao acervo.'
const moved = 'Dom Casmurro foi para a estante Cabeceira.'
const failed = 'Não foi possível enviar a capa: o arquivo passa de 10 MB.'

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms)
  })
}

afterEach(() => {
  act(() => toast.dismiss())
  vi.useRealTimers()
})

describe('Toast', () => {
  it('anuncia sucesso de forma educada e erro de forma assertiva', async () => {
    render(<Toaster />)

    act(() => {
      toast.success(added)
      toast.error(failed)
    })

    await waitFor(() => {
      const statuses = screen.getAllByRole('status')
      const success = statuses.find((el) => el.textContent?.includes(added))
      const error = statuses.find((el) => el.textContent?.includes(failed))
      expect(success?.getAttribute('aria-live')).toBe('polite')
      expect(error?.getAttribute('aria-live')).toBe('assertive')
    })
    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('ação e Fechar aviso removem o aviso', async () => {
    const user = userEvent.setup()
    const onUndo = vi.fn()
    render(<Toaster />)

    act(() => {
      toast.success(added, { action: { label: 'Desfazer', onClick: onUndo } })
      toast.success(moved)
    })

    await user.click(screen.getByRole('button', { name: 'Desfazer' }))

    expect(onUndo).toHaveBeenCalledTimes(1)
    expect(screen.queryByText(added)).toBeNull()
    expect(screen.getByText(moved)).toBeTruthy()

    await user.click(screen.getByRole('button', { name: 'Fechar aviso' }))

    expect(screen.queryByText(moved)).toBeNull()
  })

  it('sucesso some em 5 segundos e com ação em 8', () => {
    vi.useFakeTimers()
    render(<Toaster />)

    act(() => {
      toast.success(moved)
      toast.success(added, { action: { label: 'Desfazer', onClick: () => {} } })
    })

    advance(4999)
    expect(screen.getByText(moved)).toBeTruthy()
    expect(screen.getByText(added)).toBeTruthy()

    advance(1)
    expect(screen.queryByText(moved)).toBeNull()
    expect(screen.getByText(added)).toBeTruthy()

    advance(2999)
    expect(screen.getByText(added)).toBeTruthy()

    advance(1)
    expect(screen.queryByText(added)).toBeNull()
  })

  it('ponteiro ou foco no aviso pausam a contagem', () => {
    vi.useFakeTimers()
    render(<Toaster />)

    act(() => {
      toast.success(moved)
    })

    advance(3000)
    fireEvent.pointerMove(screen.getByText(moved))
    advance(10000)
    expect(screen.getByText(moved)).toBeTruthy()

    fireEvent.pointerLeave(screen.getByRole('region'))
    advance(1999)
    expect(screen.getByText(moved)).toBeTruthy()

    advance(1)
    expect(screen.queryByText(moved)).toBeNull()

    act(() => {
      toast.success(added)
    })

    advance(3000)
    const close = screen.getByRole('button', { name: 'Fechar aviso' })
    act(() => close.focus())
    advance(10000)
    expect(screen.getByText(added)).toBeTruthy()

    act(() => close.blur())
    advance(1999)
    expect(screen.getByText(added)).toBeTruthy()

    advance(1)
    expect(screen.queryByText(added)).toBeNull()
  })

  it('foco no aviso pausa a contagem', () => {
    vi.useFakeTimers()
    render(<Toaster />)

    act(() => {
      toast.success(moved)
    })

    advance(3000)
    const close = screen.getByRole('button', { name: 'Fechar aviso' })
    act(() => close.focus())
    advance(10000)
    expect(screen.getByText(moved)).toBeTruthy()

    act(() => close.blur())
    advance(1999)
    expect(screen.getByText(moved)).toBeTruthy()

    advance(1)
    expect(screen.queryByText(moved)).toBeNull()
  })

  it('erro fica até ser fechado', () => {
    vi.useFakeTimers()
    render(<Toaster />)

    act(() => {
      toast.error(failed, { action: { label: 'Escolher outro', onClick: () => {} } })
    })

    advance(60_000)
    expect(screen.getByText(failed)).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Fechar aviso' }))
    expect(screen.queryByText(failed)).toBeNull()
  })
})
