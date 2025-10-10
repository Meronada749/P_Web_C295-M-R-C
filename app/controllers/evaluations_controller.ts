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
    const evaluation = await Evaluation.query()
      .preload('book')
      .preload('user')
      .where('id', params.id)
      .firstOrFail()

    return response.ok(evaluation)
  }

  async update({ params, request }: HttpContext) {
    const { note } = await request.validateUsing(evaluationValidator)
    const data = { note }
    const evaluation = await Evaluation.findOrFail(params.id)
    evaluation.merge(data)
    await evaluation.save()
    return evaluation
  }

  async destroy({ params }: HttpContext) {
    const writer = await Evaluation.findOrFail(params.id)
    return await writer.delete()
  }
}
