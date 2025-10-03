import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('comment')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('evaluations')
        .onDelete('CASCADE')

      table
        .integer('book_id')
        .unsigned()
        .references('id')
        .inTable('evaluations')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}