import Book from '#models/book'
import type { HttpContext } from '@adonisjs/core/http'
import { booksValidator } from '#validators/book'
//import { BookPolicy } from '#policies/book_policy'

export default class BooksController {
  async index({ response }: HttpContext) {
    const books = await Book.query().preload('writer').preload('user').preload('category')
    return response.ok(books)
  }
  async store({ request, response, auth }: HttpContext) {
    // Validate request
    const { title, numberOfPages, pdfLink, abstract, editor, editionYear, imagePath, categoryId, writerId } =
      await request.validateUsing(booksValidator)

    // Create book and assign logged-in user as owner
    const book = await Book.create({
      title,
      numberOfPages,
      pdfLink,
      abstract,
      editor,
      editionYear,
      imagePath,
      categoryId,
      writerId,
      userId: auth.user!.id, // <-- assign the logged-in user's id
    })

    return response.created(book)
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

  async update({ request, response, params, bouncer }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    try {
      // Check policy: only admin or owner can update
      await bouncer.with('BookPolicy').authorize('update', book)
    } catch {
      // Return custom message instead of default "Access denied"
      return response.forbidden({
        message:
          "You didn't add this book and you're not admin, so you do not have the right to modify it.",
      })
    }

    // Update allowed fields
    const data = request.only([
      'title',
      'numberOfPages',
      'pdfLink',
      'abstract',
      'editor',
      'editionYear',
      'imagePath',
      'categoryId',
      'writerId'
    ])
    book.merge(data)
    await book.save()

    return response.ok(book)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const book = await Book.findOrFail(params.id)

    try {
      // Check policy: only admin or owner can delete
      await bouncer.with('BookPolicy').authorize('delete', book)
    } catch {
      return response.forbidden({
        message:
          "You didn't add this book and you're not admin, so you do not have the right to delete it.",
      })
    }

    await book.delete()
    return response.noContent()
  }
}
