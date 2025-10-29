import Category from '#models/category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const category = await Category.all()
    return response.ok(category)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(categoryValidator)
    const category = await Category.create(data)
    return response.created(category)
  }

  async show({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return response.ok(category)
  }

  async update({ params, request, response }: HttpContext) {
    const data = await request.validateUsing(categoryValidator)
    const category = await Category.findOrFail(params.id)

    category.merge(data)
    await category.save()

    return response.ok(category)
  }

  async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return response.noContent()
  }
}
