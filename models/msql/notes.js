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
      titulo VARCHAR(50) NOT NULL,
      contenido TEXT NOT NULL
    )
  `)

// Insertar datos de ejemplo
await connection.query(`
    INSERT INTO notes (titulo, contenido) VALUES
    ('Nota 1', 'Contenido de la nota 1'),
    ('Nota 2', 'Contenido de la nota 2'),
    ('Nota 3', 'Contenido de la nota 3')
  `)

export class NoteModel {
  static async gatAll () {
    const [notas] = await connection.query('SELECT titulo, contenido FROM notes')
    return notas
  }

  static async create ({ input }) {
    const { titulo, contenido } = input
    try {
      await connection.query(
        'INSERT INTO notes (titulo, contenido) ?', [titulo, contenido]
      )
    } catch (error) {
      throw new Error('Error creating note')
    }

    const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
          FROM movie WHERE id = UUID_TO_BIN(?);`,
        [uuid]
    )
  }
}
