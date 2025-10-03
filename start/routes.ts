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
import EvaluationsController from '#controllers/evaluations_controller'
import WritersController from '#controllers/writers_controller'
import router from '@adonisjs/core/services/router'

router.resource('categories', CategoriesController).apiOnly()
router.resource('books', BooksController).apiOnly()
router.resource('writers', WritersController).apiOnly()
router.resource('evaluations', EvaluationsController).apiOnly()
router.resource('comments', CommentsController).apiOnly()
