import express, { json } from 'express'
import { createNoteRouter } from './routes/notes.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ noteModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.use('/notes', createNoteRouter({ noteModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
