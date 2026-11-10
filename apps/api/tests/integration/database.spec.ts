import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'

test.group('Banco de dados', () => {
  test('conexão usa o cliente pg no banco estanteca_test', async ({ assert }) => {
    const connection = db.manager.get(db.primaryConnectionName)
    assert.equal(connection?.config.client, 'pg')

    const result = await db.rawQuery('select current_database() as name')
    assert.equal(result.rows[0].name, 'estanteca_test')
  })
})
