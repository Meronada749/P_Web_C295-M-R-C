import Evaluation from '#models/evaluation'
import { evaluationValidator } from '#validators/evaluation'
import type { HttpContext } from '@adonisjs/core/http'

export default class EvaluationsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const evaluation = await Evaluation.query()
    return response.ok(evaluation)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { note } = await request.validateUsing(evaluationValidator)
    const evaluation = await Evaluation.create({ note })
    return response.created(evaluation)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Evaluation.findOrFail(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const { note } = await request.validateUsing(evaluationValidator)
    const data = { note }
    const evaluation = await Evaluation.findOrFail(params.id)
    evaluation.merge(data)
    await evaluation.save()
    return evaluation
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const writer = await Evaluation.findOrFail(params.id)
    return await writer.delete()
  }
}