import { Router } from 'express'
import { NoteController } from '../controllers/notes.js'

export const createNoteRouter = ({ noteModel }) => {
  const notesRoutes = Router()
  const noteController = new NoteController({ noteModel })

  notesRoutes.get('/', noteController.getAll)
  notesRoutes.post('/', noteController.create)
  notesRoutes.patch('/:id', noteController.update)
  notesRoutes.delete('/:id', noteController.delete)

  return notesRoutes
}
