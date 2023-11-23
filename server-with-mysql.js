import { createApp } from './app.js'
import { NoteModel } from './models/msql/notes.js'

createApp({ noteModel: NoteModel })
