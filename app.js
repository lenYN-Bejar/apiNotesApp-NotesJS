import express, { json } from 'express'
import { createConnection } from 'mysql2/promise'
import { object, string } from 'zod'

const app = express()
const port = 1234

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'notesdb'
}

// Definir el esquema de validación con Zod
const notaSchema = object({
  titulo: string(),
  contenido: string()
})

// Crear la conexión a la base de datos y definir el modelo de notas

const connection = await createConnection(dbConfig)

// Eliminar la tabla si existe (DROP TABLE)
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

// Definir las rutas de la API
app.use(json())

// Obtener todas las notas
app.get('/notes', async (req, res) => {
  const [notas] = await connection.query('SELECT * FROM notes')
  res.json(notas)
})

// Agregar una nueva nota
app.post('/notes', async (req, res) => {
  try {
    const nuevaNota = notaSchema.parse(req.body)
    const [result] = await connection.query('INSERT INTO notes SET ?', nuevaNota)
    console.log(result)
    nuevaNota.id = result.insertId
    res.status(201).json(nuevaNota)
  } catch (error) {
    res.status(400).json({ error: error.errors })
  }
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`)
})
