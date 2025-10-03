import vine from '@vinejs/vine'
const evaluationValidator = vine.compile(
    vine.object({
       note: vine.number().withoutDecimals().positive().min(1)     
    })
)

export { evaluationValidator }