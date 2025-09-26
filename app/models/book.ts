import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import Writer from './writer.js'

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

  //Relation : one book belongs to one category
  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  //Relation : one book belongs to one writer
  @belongsTo(() => Writer)
  declare writer: BelongsTo<typeof Writer>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
