import User from '#models/user'
import Comment from '#models/comment'
import { BasePolicy } from '@adonisjs/bouncer'
//import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Book from '#models/book'

export default class CommentPolicy extends BasePolicy {
  private async isOwner(user: User, comment: Comment): Promise<boolean> {
    const book = await Book.query()
      .where('id', comment.bookId)
      .where('userId', user.id)
      .select('id') // on réduit la charge
      .first()
    return !!book
  }
  // Peut mettre à jour un commentaire
  async update(user: User, comment: Comment) {
    return user.isAdmin === true || this.isOwner(user, comment)
  }
  // Peut supprimer un commentaire
  async delete(user: User, comment: Comment) {
    return user.isAdmin === true || this.isOwner(user, comment)
  }
  // Peut créer un commentaire (par défaut : tous les enseignants)
  async create(user: User) {
    return user.isAdmin === true || user.username === 'admin'
  }
}
export { CommentPolicy }
