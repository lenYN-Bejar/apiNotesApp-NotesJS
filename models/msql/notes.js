import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'notesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

await connection.query('DROP TABLE IF EXISTS notes')

// Crear la tabla si no existe
await connection.query(`
    CREATE TABLE IF NOT EXISTS notes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      description TEXT NOT NULL
    )
  `)

// Insertar datos de ejemplo
await connection.query(`
    INSERT INTO notes (title, description) VALUES
    ('Nota 1', 'Contenido de la nota 1'),
    ('Nota 2', 'Contenido de la nota 2'),
    ('Nota 3', 'Contenido de la nota 3')
  `)

export class NoteModel {
  static async getAll () {
    const [notas] = await connection.query('SELECT id, title, description FROM notes')
    return notas
  }

  static async create ({ input }) {
    // const { title, description } = input
    try {
      const [newNota] = await connection.query(
        'INSERT INTO notes SET ?', [input]
      )
      input.id = newNota.insertId
      return (input)
    } catch (error) {
      throw new Error('Error creating note')
    }
  }

  static async update ({ id, input }) {
    // const { title, description } = input
    try {
      const [noteUpdate] = await connection.query(
        'UPDATE notes SET ? WHERE id=?', [input, id]
      )
      if (noteUpdate.affectedRows > 0) {
        const [searchNoteUpdate] = await connection.query(
          'SELECT id,title,description FROM notes WHERE id=?', [id]
        )
        return searchNoteUpdate[0]
      }
    } catch (error) {
      throw new Error('Error updating note')
    }
  }

  static async delete ({ id }) {
    const [result] = await connection.query('DELETE FROM notes WHERE id=?', [id])
    return result
  }
}

// static async create ({ input }) {
//   const { title, description } = input
//   try {
//     const [newNota] = await connection.query(
//       'INSERT INTO notes (title, description) VALUES (?,?);', [title, description]
//     )
//     input.id = newNota.insertId
//     return (input)
//   } catch (error) {
//     throw new Error('Error creating note')
//   }
// }
