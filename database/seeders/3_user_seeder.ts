import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
//import Hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const usersData = [
      { username: 'alice', password: 'alice123', isAdmin: true },
      { username: 'bob', password: 'alice123', isAdmin: false },
      { username: 'carol', password: 'alice123', isAdmin: false },
      { username: 'dave', password: 'alice123', isAdmin: false },
      { username: 'eve', password: 'alice123', isAdmin: false },
    ]

    for (const user of usersData) {
      await User.create({
        username: user.username,
        password: user.password,
        isAdmin: user.isAdmin,
      })
    }
  }
}
