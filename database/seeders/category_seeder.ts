import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      { label: "Comedy" },
      { label: "Drama" },
      { label: "Action" },
      { label: "Thriller" },
      { label: "Horror" },
      { label: "Romance" },
      { label: "Science Fiction" },
      { label: "Fantasy" },
      { label: "Documentary" },
      { label: "Animation" },
      { label: "Adventure" }
    ])

  }
}