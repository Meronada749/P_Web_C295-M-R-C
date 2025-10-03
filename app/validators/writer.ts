import vine from '@vinejs/vine'
const writerValidator = vine.compile(
    vine.object({
       lastname: vine.string().minLength(2).maxLength(255),
       firstname: vine.string().minLength(2).maxLength(255),
    })
)

export { writerValidator }