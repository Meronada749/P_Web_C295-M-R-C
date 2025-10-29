import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('comment')

      // Relation : 1 commentaire → 1 user
      table.integer('user_id').unsigned().references('id').inTable('comments').onDelete('CASCADE')

      // Relation : 1 commentaire → 1 book
      table.integer('book_id').unsigned().references('id').inTable('comments').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
