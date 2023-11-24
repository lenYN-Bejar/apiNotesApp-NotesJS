import { validateNote, validatePartialNote } from '../schemas/notes.js'

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

  update = async (req, res) => {
    const { id } = req.params
    const result = validatePartialNote(req.body)

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const updateNote = await this.noteModel.update({ id, input: result.data })
    return res.json(updateNote)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.noteModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Note not found' })
    }

    return res.json({ message: 'Note deleted' })
  }
}
