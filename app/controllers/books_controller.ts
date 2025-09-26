import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'
import { booksValidator } from '#validators/book'

export default class BooksController {
  //Get
  async index({ response }: HttpContext) {
    const books = await Book.query()
    return response.ok(books)
  }

  //Post
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

  //Get :id
  async show({ params }: HttpContext) {
    return await Book.findOrFail(params.id)
  }

  //Put & Patch
  async update({ params, request }: HttpContext) {
    const { title, numberOfPages, pdfLink, abstract, editor, editionYear, imagePath } =
      await request.validateUsing(booksValidator)
    const books = await Book.findOrFail(params.id)
    books.merge({ title, numberOfPages, pdfLink, abstract, editor, editionYear, imagePath })
    await books.save()
    return books
  }

  //Delete
  async destroy({ params }: HttpContext) {
    const books = await Book.findOrFail(params.id)
    return await books.delete()
  }
}
