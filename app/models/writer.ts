import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Book from './book.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Writer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare lastname: string

  @column()
  declare firstname: string

  // Relation: A writer can have many books
  @hasMany(() => Book)
  declare books: HasMany<typeof Book>
}
