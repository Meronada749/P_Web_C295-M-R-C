import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const usersData = [
      { username: 'alice', password: 'password123', isAdmin: true },
      { username: 'bob', password: 'password123', isAdmin: false },
      { username: 'carol', password: 'password123', isAdmin: false },
      { username: 'dave', password: 'password123', isAdmin: false },
      { username: 'eve', password: 'password123', isAdmin: false },
    ]

    for (const user of usersData) {
      await User.create({
        username: user.username,
        hashPassword: await Hash.make(user.password),
        isAdmin: user.isAdmin,
      })
    }
  }
}
