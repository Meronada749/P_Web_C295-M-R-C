import vine from '@vinejs/vine'

const booksValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(2).maxLength(255),
    numberOfPages: vine.number().withoutDecimals().positive().min(1),
    pdfLink: vine.string().minLength(2).maxLength(255),
    abstract: vine.string().minLength(2).maxLength(255),
    editor: vine.string().minLength(2).maxLength(255),
    editionYear: vine.number().withoutDecimals().positive().min(4),
    imagePath: vine.string().minLength(2).maxLength(255),
    categoryId: vine.number().withoutDecimals().positive().optional(),
    writerId: vine.number().withoutDecimals().positive().optional(),
  })
)
export { booksValidator }
