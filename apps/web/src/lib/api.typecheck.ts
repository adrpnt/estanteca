// Só o typecheck lê este arquivo; nada o importa.
// Se o cliente perder os tipos das rotas da API, o @ts-expect-error fica sem uso e o tsc falha.
import { api } from './api'

export function callMissingRoute() {
  // @ts-expect-error a rota não existe no registro da API
  return api.request('livros.inexistente', {})
}
