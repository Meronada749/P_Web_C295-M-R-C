import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { commentValidator } from '#validators/comment'
import Book from '#models/book'

export default class CommentsController {
  async index({ params, response }: HttpContext) {
    const book = await Book.findOrFail(params.book_id)
    await book.load('comments', (query) => {
      query.preload('book').preload('user')
    })
    return response.ok(book.comments)
  }

  async store({ request, response }: HttpContext) {
    const { comment } = await request.validateUsing(commentValidator)
    const newComment = await Comment.create({ comment })
    return response.created(newComment)
  }

  async show({ params, response }: HttpContext) {
    const book = await Comment.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .firstOrFail()
    return response.ok(book)
  }

  async update({ params, request }: HttpContext) {
    const { comment } = await request.validateUsing(commentValidator)
    const data = { comment }
    const comments = await Comment.findOrFail(params.id)
    comments.merge(data)
    await comments.save()
    return comments
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
    return await comment.delete()
  }
}
