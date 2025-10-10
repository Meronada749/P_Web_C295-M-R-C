import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Book from '#models/book'
import Category from '#models/category'
import Writer from '#models/writer'
import User from '#models/user'

export default class BookSeeder extends BaseSeeder {
  public async run() {
    const categories = await Category.query()
    const writers = await Writer.query()
    const users = await User.query()

    if (categories.length === 0 || writers.length === 0 || users.length === 0) {
      console.error('❌ Vous devez d’abord insérer des catégories, auteurs et utilisateurs.')
      return
    }

    await Book.createMany([
      {
        title: 'Clean Code',
        numberOfPages: 464,
        pdfLink: 'https://example.com/clean-code.pdf',
        abstract: 'Un guide essentiel sur la manière d’écrire du code propre et maintenable.',
        editor: 'Prentice Hall',
        editionYear: 2008,
        imagePath: '/uploads/clean-code.jpg',
        categoryId: categories[0].id,
        writerId: writers[0].id,
        userId: users[0].id,
      },
      {
        title: 'The Pragmatic Programmer',
        numberOfPages: 352,
        pdfLink: 'https://example.com/pragmatic-programmer.pdf',
        abstract: 'Des conseils pratiques pour devenir un développeur plus efficace et réfléchi.',
        editor: 'Addison-Wesley',
        editionYear: 2019,
        imagePath: '/uploads/pragmatic-programmer.jpg',
        categoryId: categories[1 % categories.length].id,
        writerId: writers[1 % writers.length].id,
        userId: users[1 % users.length].id,
      },
      {
        title: 'Refactoring',
        numberOfPages: 448,
        pdfLink: 'https://example.com/refactoring.pdf',
        abstract:
          'Comment améliorer la conception du code existant sans en changer le comportement.',
        editor: 'Addison-Wesley',
        editionYear: 2018,
        imagePath: '/uploads/refactoring.jpg',
        categoryId: categories[2 % categories.length].id,
        writerId: writers[2 % writers.length].id,
        userId: users[2 % users.length].id,
      },
      {
        title: 'Design Patterns',
        numberOfPages: 395,
        pdfLink: 'https://example.com/design-patterns.pdf',
        abstract:
          'Un catalogue de solutions éprouvées pour des problèmes récurrents de conception logicielle.',
        editor: 'Pearson Education',
        editionYear: 1994,
        imagePath: '/uploads/design-patterns.jpg',
        categoryId: categories[3 % categories.length].id,
        writerId: writers[3 % writers.length].id,
        userId: users[3 % users.length].id,
      },
      {
        title: 'You Don’t Know JS',
        numberOfPages: 278,
        pdfLink: 'https://example.com/you-dont-know-js.pdf',
        abstract: 'Une exploration approfondie des mécanismes internes de JavaScript.',
        editor: 'O’Reilly Media',
        editionYear: 2020,
        imagePath: '/uploads/you-dont-know-js.jpg',
        categoryId: categories[4 % categories.length].id,
        writerId: writers[4 % writers.length].id,
        userId: users[4 % users.length].id,
      },
    ])
  }
}
