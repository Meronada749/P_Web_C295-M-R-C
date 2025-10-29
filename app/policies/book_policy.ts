import User from '#models/user'
import Book from '#models/book'
import { BasePolicy } from '@adonisjs/bouncer'

export default class BookPolicy extends BasePolicy {
  private isOwner(user: User, book: Book): boolean {
    return book.userId === user.id
  }

  async create() {
    return true
  }

  async update(user: User, book: Book) {
    return Boolean(user.isAdmin) || this.isOwner(user, book)
  }

  async delete(user: User, book: Book) {
    return Boolean(user.isAdmin) || this.isOwner(user, book)
  }
}

export { BookPolicy }
