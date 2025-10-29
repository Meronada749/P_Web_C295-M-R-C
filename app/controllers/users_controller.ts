import User from '#models/user'
import { userValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(userValidator)
    const users = await User.create(data)
    return response.created(users)
  }

  async show({ params, response }: HttpContext) {
    const users = await User.findOrFail(params.id)
    return response.ok(users)
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(userValidator)
    const users = await User.findOrFail(params.id)

    users.merge(data)
    await users.save()

    return response.ok(users)
  }

  async destroy({ params, response }: HttpContext) {
    const users = await User.findOrFail(params.id)
    await users.delete()
    return response.noContent()
  }
}
