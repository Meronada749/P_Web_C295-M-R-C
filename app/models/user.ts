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
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isAdmin: boolean

  @column.dateTime({ autoCreate: true })
  declare creationDate: DateTime

  // Relation: A user can have many books
  @hasMany(() => Book)
  declare books: HasMany<typeof Book>

  // Relation: A user can have many comments
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  // Relation: A user can have many evaluations
  @hasMany(() => Evaluation)
  declare evaluations: HasMany<typeof Evaluation>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
