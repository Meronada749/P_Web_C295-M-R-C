import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'
import { booksValidator } from '#validators/book'

export default class BooksController {
  async index({ response }: HttpContext) {
    const books = await Book.query().preload('writer').preload('user').preload('category')
    return response.ok(books)
  }

  async store({ request, response }: HttpContext) {
    const { title, numberOfPages, pdfLink, abstract, editor, editionYear, imagePath } =
      await request.validateUsing(booksValidator)
    const books = await Book.create({
      title,
      numberOfPages,
      pdfLink,
      abstract,
      editor,
      editionYear,
      imagePath,
    })
    return response.created(books)
  }

  async show({ params, response }: HttpContext) {
    const books = await Book.query()
      .preload('writer')
      .preload('user')
      .preload('category')
      .where('id', params.id)
      .firstOrFail()

    return response.ok(books)
  }

  async update({ params, request }: HttpContext) {
    const { title, numberOfPages, pdfLink, abstract, editor, editionYear, imagePath } =
      await request.validateUsing(booksValidator)
    const books = await Book.findOrFail(params.id)
    books.merge({ title, numberOfPages, pdfLink, abstract, editor, editionYear, imagePath })
    await books.save()
    return books
  }

  async destroy({ params }: HttpContext) {
    const books = await Book.findOrFail(params.id)
    return await books.delete()
  }
}
