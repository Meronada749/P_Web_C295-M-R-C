import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Writer from '#models/writer'

export default class extends BaseSeeder {
  async run() {
    await Writer.createMany([
      {
        firstname: 'Victor',
        lastname: 'Hugo',
      },
      {
        firstname: 'George',
        lastname: 'Sand',
      },
      {
        firstname: 'Émile',
        lastname: 'Zola',
      },
      {
        firstname: 'Simone',
        lastname: 'de Beauvoir',
      },
      {
        firstname: 'Albert',
        lastname: 'Camus',
      },
    ])
  }
}
