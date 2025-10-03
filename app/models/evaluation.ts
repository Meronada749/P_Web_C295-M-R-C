import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Evaluation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare note: number
}