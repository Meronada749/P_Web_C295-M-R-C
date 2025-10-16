import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { commentValidator } from '#validators/comment'
import Book from '#models/book'

export default class CommentsController {
  async index({ params, response }: HttpContext) {
    const book = await Book.findOrFail(params.book_id)
    await book.load('comments', (query) => {
      query.preload('user')
    })

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
    const comment = await Comment.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .preload('book')
      .preload('user')
      .firstOrFail()

    const result = {
      id: comment.id,
      comment: comment.comment,
      book_title: comment.book.title,
      username: comment.user.username,
    }

    return response.ok(result)
  }

  async update({ params, request, response }: HttpContext) {
    const { comment } = await request.validateUsing(commentValidator)
    const data = { comment }
    const comments = await Comment.findOrFail(params.id)

    comments.merge(data)
    await comments.save()

    return response.ok(comments)
  }

  async destroy({ params, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)
    await comment.delete()
    response.noContent()
  }
}
