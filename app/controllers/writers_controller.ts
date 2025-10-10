import type { HttpContext } from '@adonisjs/core/http'
import Writer from '#models/writer'
import { writerValidator } from '#validators/writer'

export default class WritersController {
  async index({ response }: HttpContext) {
    const writer = await Writer.query()
    return response.ok(writer)
  }

  async store({ request, response }: HttpContext) {
    const { firstname, lastname } = await request.validateUsing(writerValidator)
    const category = await Writer.create({ firstname, lastname })
    return response.created(category)
  }

  async show({ params }: HttpContext) {
    return await Writer.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const { firstname, lastname } = await request.validateUsing(writerValidator)
    const data = { firstname, lastname }
    const writer = await Writer.findOrFail(params.id)
    writer.merge(data)
    await writer.save()
    return writer
  }

  async destroy({ params }: HttpContext) {
    const writer = await Writer.findOrFail(params.id)
    return await writer.delete()
  }
}
