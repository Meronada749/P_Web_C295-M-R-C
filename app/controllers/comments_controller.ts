import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'
import { commentValidator } from '#validators/comment'

export default class CommentsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const comments = await Comment.query()
    return response.ok(comments)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { comment } = await request.validateUsing(commentValidator)
    const newComment = await Comment.create({ comment })
    return response.created(newComment)
  }

  /**
   * Handle form submission for the edit action
   */
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
