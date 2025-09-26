import factory from '@adonisjs/lucid/factories'
import Book from '#models/book'

export const BookFactory = factory
  .define(Book, async ({ faker }) => {
    return {
      title: faker.book.title(),
      numberOfPages: 150,
      pdfLink: faker.internet.url(),
      abstract: faker.lorem.sentence(),
      editor: faker.book.author(),
      editionYear: faker.date.past({ years: 20 }).getFullYear(),
      imagePath: '/Desktop',
    }
  })
  .build()
