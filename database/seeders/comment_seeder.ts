import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Comment from '#models/comment'

export default class extends BaseSeeder {
  async run() {
    await Comment.createMany([
      {
        comment: 'Très bon livre, je recommande !',
        userId: 1,
        bookId: 1,
      },
      {
        comment: 'Un peu difficile à lire mais intéressant.',
        userId: 2,
        bookId: 1,
      },
      {
        comment: 'J’ai adoré du début à la fin.',
        userId: 1,
        bookId: 2,
      },
      {
        comment: 'Pas vraiment mon style...',
        userId: 3,
        bookId: 2,
      },
    ])
  }
}
