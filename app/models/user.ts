import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Book from './book.js'
import Comment from './comment.js'
import Evaluation from './evaluation.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'hashPassword',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column({ serializeAs: null })
  declare hashPassword: string

  @column.dateTime({ autoCreate: true })
  declare creationDate: DateTime

  @column()
  declare isAdmin: boolean

  @hasMany(() => Book)
  declare book: HasMany<typeof Book>

  @hasMany(() => Comment)
  declare comment: HasMany<typeof Comment>

  @hasMany(() => Evaluation)
  declare evaluation: HasMany<typeof Evaluation>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
