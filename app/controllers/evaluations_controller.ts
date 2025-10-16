import Evaluation from '#models/evaluation'
import { evaluationValidator } from '#validators/evaluation'
import type { HttpContext } from '@adonisjs/core/http'

export default class EvaluationsController {
  async index({ response }: HttpContext) {
    const evaluation = await Evaluation.query().preload('book').preload('user')
    return response.ok(evaluation)
  }

  async store({ request, response }: HttpContext) {
    const { note } = await request.validateUsing(evaluationValidator)
    const evaluation = await Evaluation.create({ note })
    return response.created(evaluation)
  }

  async show({ params, response }: HttpContext) {
    // Fetch the evaluation with book and user preloaded
    const evaluation = await Evaluation.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .preload('book')
      .preload('user')
      .firstOrFail()

    // Return only the fields you need
    const result = {
      id: evaluation.id,
      note: evaluation.note,
      book_title: evaluation.book.title,
      username: evaluation.user.username,
    }

    return response.ok(result)
  }

  async update({ params, request }: HttpContext) {
    const { note } = await request.validateUsing(evaluationValidator)
    const data = { note }
    const evaluation = await Evaluation.findOrFail(params.id)
    evaluation.merge(data)
    await evaluation.save()
    return evaluation
  }

  async destroy({ params, response }: HttpContext) {
    const writer = await Evaluation.findOrFail(params.id)
    await writer.delete()
    return response.noContent()
  }
}
