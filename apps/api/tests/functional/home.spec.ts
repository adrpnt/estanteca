import { test } from '@japa/runner'

test.group('Home', () => {
  test('GET / responde 200 com um corpo JSON', async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)
    response.assertHeader('content-type', 'application/json; charset=utf-8')
    response.assertBody({ hello: 'world' })
  })
})
