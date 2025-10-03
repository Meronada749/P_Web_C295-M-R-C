import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable().unique()
      table.integer('number_of_pages')
      table.string('pdf_link').unique()
      table.text('abstract')
      table.string('editor')
      table.integer('edition_year')
      table.string('image_path')

      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')

      table.integer('writer_id').unsigned().references('id').inTable('writers').onDelete('CASCADE')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
