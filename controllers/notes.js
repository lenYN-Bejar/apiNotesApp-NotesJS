import { validateNote } from '../schemas/notes.js'

export class NoteController {
  constructor ({ noteModel }) {
    this.noteModel = noteModel
  }

  getAll = async (req, res) => {
    const notes = await this.noteModel.getAll()
    res.json(notes)
  }

  create = async (req, res) => {
    const result = validateNote(req.body)
    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const newNote = await this.noteModel.create({ input: result.data })
    res.status(201).json(newNote)
  }
}
