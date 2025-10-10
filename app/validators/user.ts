import vine from '@vinejs/vine'

const userValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(2),
  })
)
export { userValidator }
