import Category from '#models/category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ response }: HttpContext) {
    const category = await Category.query()
    return response.ok(category)
  }

  async store({ request, response }: HttpContext) {
    const { label } = await request.validateUsing(categoryValidator)
    const category = await Category.create({ label })
    return response.created(category)
  }

  async show({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return response.ok(category)
  }

  async update({ params, request }: HttpContext) {
    const { label } = await request.validateUsing(categoryValidator)
    const data = { label }
    const category = await Category.findOrFail(params.id)
    category.merge(data)
    await category.save()
    return category
  }

  async destroy({ params, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    return response.noContent()
  }
}
