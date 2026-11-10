import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Sem `globals: true`, o Testing Library não desmonta sozinho entre os testes.
afterEach(() => {
  cleanup()
})

// APIs que o jsdom não implementa e que as primitivas do Radix usam.
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
  Element.prototype.setPointerCapture = () => {}
  Element.prototype.releasePointerCapture = () => {}
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
