import z from 'zod'

const notaSchema = z.object({
  titulo: z.string(),
  contenido: z.string()
})

export function validateNote (input) {
  return notaSchema.safeParse(input)
}
