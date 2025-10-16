import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { commentValidator } from '#validators/comment'
import Book from '#models/book'

export default class CommentsController {
  async index({ params, response }: HttpContext) {
    const book = await Book.findOrFail(params.book_id)

    // Load only comments with user
    await book.load('comments', (query) => {
      query.preload('user') // only need user, not book
    })

    // Map the result to include only what you need
    const result = book.comments.map((comment) => ({
      book_title: book.title,
      username: comment.user.username,
      comment: comment.comment,
    }))

    return response.ok(result)
  }

  async store({ request, response }: HttpContext) {
    const { comment } = await request.validateUsing(commentValidator)
    const newComment = await Comment.create({ comment })
    return response.created(newComment)
  }

  async show({ params, response }: HttpContext) {
    // Fetch the comment with book and user preloaded
    const comment = await Comment.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .preload('book')
      .preload('user')
      .firstOrFail()

    // Return only the fields you need
    const result = {
      id: comment.id,
      comment: comment.comment,
      book_title: comment.book.title,
      username: comment.user.username,
    }

    return response.ok(result)
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
  async destroy({ params, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
    await comment.delete()
    response.noContent()
  }
}
