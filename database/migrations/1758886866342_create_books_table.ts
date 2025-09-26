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

      // // Relation : 1 book → 1 category
      // table
      //   .integer('category_id')
      //   .unsigned()
      //   .references('id')
      //   .inTable('categories')
      //   .onDelete('CASCADE')

      // // Relation : 1 book → 1 writer
      // table.integer('writer_id').unsigned().references('id').inTable('writers').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
