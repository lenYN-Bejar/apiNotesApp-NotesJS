import z from 'zod'

const notaSchema = z.object({
  title: z.string(),
  description: z.string()
})

export function validateNote (input) {
  return notaSchema.safeParse(input)
}

export function validatePartialNote (input) {
  return notaSchema.partial().safeParse(input)
}
