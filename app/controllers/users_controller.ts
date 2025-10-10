import User from '#models/user'
import { userValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.query()
    return response.ok(users)
  }

  async store({ request, response }: HttpContext) {
    const { username } = await request.validateUsing(userValidator)
    const users = await User.create({ username })
    return response.created(users)
  }

  async show({ params }: HttpContext) {
    return await User.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const { username } = await request.validateUsing(userValidator)
    const data = { username }
    const users = await User.findOrFail(params.id)
    users.merge(data)
    await users.save()
    return users
  }

  async destroy({ params }: HttpContext) {
    const users = await User.findOrFail(params.id)
    return await users.delete()
  }
}
