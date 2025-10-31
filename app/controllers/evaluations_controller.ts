import Book from '#models/book'
import Evaluation from '#models/evaluation'
import { evaluationValidator } from '#validators/evaluation'
import type { HttpContext } from '@adonisjs/core/http'

export default class EvaluationsController {
  async index({ params, response }: HttpContext) {
    const book = await Book.findOrFail(params.book_id)
    await book.load('evaluations', (query) => {
      query.preload('user')
    })

    const result = book.evaluations.map((evaluation) => ({
      book_title: book.title,
      username: evaluation.user.username,
      note: evaluation.note,
    }))

    return response.ok(result)
  }

  // async store({ request, response }: HttpContext) {
  //   const data = await request.validateUsing(evaluationValidator)
  //   const evaluation = await Evaluation.create(data)
  //   return response.created(evaluation)
  // }

  async store({ request, response, auth, params }: HttpContext) {
    const { note } = request.only(['note'])

    const evaluation = await Evaluation.create({
      note,
      bookId: params.book_id,
      userId: auth.user!.id,
    })

    return response.created(evaluation)
  }

  async show({ params, response }: HttpContext) {
    const evaluation = await Evaluation.query()
      .where('id', params.id)
      .where('book_id', params.book_id)
      .preload('book')
      .preload('user')
      .firstOrFail()

    const result = {
      id: evaluation.id,
      note: evaluation.note,
      book_title: evaluation.book.title,
      username: evaluation.user.username,
    }

    return response.ok(result)
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(evaluationValidator)
    const evaluation = await Evaluation.findOrFail(params.id)

    evaluation.merge(data)
    await evaluation.save()

    return response.ok(evaluation)
  }

  async destroy({ params, response }: HttpContext) {
    const writer = await Evaluation.findOrFail(params.id)
    await writer.delete()
    return response.noContent()
  }
}
