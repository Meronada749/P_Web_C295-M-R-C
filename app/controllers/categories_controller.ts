import Category from '#models/category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  //Get
  async index({ response }: HttpContext) {
    const category = await Category.query()
    return response.ok(category)
  }

  //Post
  async store({ request, response }: HttpContext) {
    const { label } = await request.validateUsing(categoryValidator)
    const category = await Category.create({ label })
    return response.created(category)
  }

  //Get :id
  async show({ params }: HttpContext) {
    return await Category.findOrFail(params.id)
  }

  //Put & Patch
  async update({ params, request }: HttpContext) {
    const { label } = await request.validateUsing(categoryValidator)
    const data = { label }
    const category = await Category.findOrFail(params.id)
    category.merge(data)
    await category.save()
    return category
  }

  //Delete
  async destroy({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return await category.delete()
  }
}
