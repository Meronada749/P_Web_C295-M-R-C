import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Book from './book.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare note: number

  // Foreign key
  @column()
  declare userId: number

  // Foreign key
  @column()
  declare bookId: number

  // Relation: An evaluation belongs to a user
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Relation: An evaluation belongs to a book
  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>
}
