import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().unique()

      table.string('username').nullable().unique()

      table.string('hash_password').nullable().unique()

      table.boolean('is_admin').notNullable().defaultTo(0)

      table.timestamp('creation_date').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
