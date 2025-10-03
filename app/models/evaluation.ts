import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Book from './book.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare note: number

  //fk
  @column()
  declare userId: number

  @column()
  declare bookId: number

  //Relation : one book belongs to one category
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  //Relation : one book belongs to one writer
  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>
}