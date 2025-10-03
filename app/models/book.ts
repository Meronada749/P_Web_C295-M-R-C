import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import Writer from './writer.js'
import User from './user.js'
import Evaluation from './evaluation.js'
import Comment from './comment.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare numberOfPages: number

  @column()
  declare pdfLink: string

  @column()
  declare abstract: string

  @column()
  declare editor: string

  @column()
  declare editionYear: number

  @column()
  declare imagePath: string

  // Foreign key
  @column()
  declare categoryId: number

  // Foreign key
  @column()
  declare writerId: number

  // Foreign key
  @column()
  declare userId: number

  //Relation : one book belongs to one category
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  //Relation : one book belongs to one writer
  @belongsTo(() => Writer)
  declare writer: BelongsTo<typeof Writer>

  //Relation : one book belongs to one user
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Relation : book has many comments
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  // Relation : book has many evaluations
  @hasMany(() => Evaluation)
  declare evaluation: HasMany<typeof Evaluation>
}
