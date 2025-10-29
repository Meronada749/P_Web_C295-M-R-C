import type { HttpContext } from '@adonisjs/core/http'
import Writer from '#models/writer'
import { writerValidator } from '#validators/writer'

export default class WritersController {
  async index({ response }: HttpContext) {
    const writer = await Writer.all()
    return response.ok(writer)
  }

  async store({ request, response }: HttpContext) {
    const { firstname, lastname } = await request.validateUsing(writerValidator)
    const category = await Writer.create({ firstname, lastname })
    return response.created(category)
  }

  async show({ params, response }: HttpContext) {
    const writer = await Writer.findOrFail(params.id)
    return response.ok(writer)
  }

  async update({ params, request, response }: HttpContext) {
    const { firstname, lastname } = await request.validateUsing(writerValidator)
    const data = { firstname, lastname }
    const writer = await Writer.findOrFail(params.id)

    writer.merge(data)
    await writer.save()

    return response.ok(writer)
  }

  async destroy({ params, response }: HttpContext) {
    const writer = await Writer.findOrFail(params.id)
    await writer.delete()
    return response.noContent()
  }
}
