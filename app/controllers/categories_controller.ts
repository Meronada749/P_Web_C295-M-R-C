import Category from '#models/category'
import { categoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const category = await Category.query().orderBy('label')
    return response.ok(category)
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // Récupération des données envoyées par le client et validation des données
    const { label } = await request.validateUsing(categoryValidator)

    // Création d'un nouvel enseignant avec les données validées
    const category = await Category.create({ label})

    // On utilise `response.created` pour retourner un code HTTP 201 avec les
    //données de l'enseignant créé
    return response.created(category)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Category.findOrFail(params.id)
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    // Récupération des données envoyées par le client
    const { label } = await request.validateUsing(categoryValidator)
    const data = { label }
    // Vérification de l'existence de l'élève
    const category = await Category.findOrFail(params.id)
    // Mise à jour des données de l'élève
    category.merge(data)
    // Sauvegarde des modifications
    await category.save()
    return category
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    // Vérification de l'existence de la catégorie
    const category = await Category.findOrFail(params.id)

    // Suppression de la catégorie
    return await category.delete()
   }
}