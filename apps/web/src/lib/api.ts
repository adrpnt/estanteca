import { registry } from '@estanteca/api/registry'
import { createTuyau } from '@tuyau/core/client'

export const api = createTuyau({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333',
  registry,
})
