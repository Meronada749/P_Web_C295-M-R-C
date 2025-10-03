/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import BooksController from '#controllers/books_controller'
import CategoriesController from '#controllers/categories_controller'
import CommentsController from '#controllers/comments_controller'
//import EvaluationsController from '#controllers/evaluations_controller'
import WritersController from '#controllers/writers_controller'
import router from '@adonisjs/core/services/router'

//router.resource('evaluations', EvaluationsController).apiOnly()

router.resource('books', BooksController).apiOnly()
// Routes imbriquées sur les commentaires
// pour le CRUD /books/:book_id/comments
router
  .group(() => {
    router.resource('comments', CommentsController).apiOnly()
  })
  .prefix('books/:book_id')

router.resource('writers', WritersController).apiOnly()

router.resource('categories', CategoriesController).apiOnly()
