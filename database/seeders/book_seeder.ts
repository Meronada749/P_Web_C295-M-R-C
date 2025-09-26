import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { BookFactory } from '#database/factories/book_factory'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await BookFactory.createMany(10)
  }
}
