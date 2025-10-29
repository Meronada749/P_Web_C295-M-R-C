import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Book from './book.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare comment: string

  // Foreign key
  @column()
  declare userId: number

  // Foreign key
  @column()
  declare bookId: number

  // Relation: A comment belongs to a user
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Relation: A comment belongs to a book
  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>
}
