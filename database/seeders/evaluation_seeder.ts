// database/seeders/EvaluationSeeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Evaluation from '#models/evaluation'

export default class extends BaseSeeder {
  async run() {
    await Evaluation.createMany([
      {
        note: 5,
        userId: 1,
        bookId: 1,
      },
      {
        note: 3,
        userId: 2,
        bookId: 1,
      },
      {
        note: 4,
        userId: 1,
        bookId: 2,
      },
      {
        note: 2,
        userId: 3,
        bookId: 2,
      },
    ])
  }
}
