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
import UsersController from '#controllers/users_controller'
import WritersController from '#controllers/writers_controller'
import router from '@adonisjs/core/services/router'

router.resource('books', BooksController).apiOnly()
router.resource('writers', WritersController).apiOnly()
router.resource('categories', CategoriesController).apiOnly()
router.resource('users', UsersController).apiOnly()

router
  .group(() => {
    router.resource('comments', CommentsController).apiOnly()
  })
  .prefix('books/:book_id')

router
  .group(() => {
    router.resource('evaluations', EvaluationsController).apiOnly()
  })
  .prefix('books/:book_id')

//   router
//   .group(() => {
//     router.resource('books', BooksController).apiOnly()
//     router.resource('writers', WritersController).apiOnly()
//     router.resource('categories', CategoriesController).apiOnly()
//     router.resource('users', UsersController).apiOnly()

//     // /books/:book_id/comments
//     router
//       .group(() => {
//         router.resource('comments', CommentsController).apiOnly()
//       })
//       .prefix('books/:book_id')

//     // /books/:book_id/evaluations
//     router
//       .group(() => {
//         router.resource('evaluations', EvaluationsController).apiOnly()
//       })
//       .prefix('books/:book_id')
//   })
//   .use(middleware.auth())

// router
//   .group(() => {
//     router.post('register', [AuthController, 'register'])
//     router.post('login', [AuthController, 'login'])
//     router.post('logout', [AuthController, 'logout']).use(middleware.auth())
//   })
//   .prefix('user')
