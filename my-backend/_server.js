// server.js
const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener todos los registros de una tabla
app.get('/items', async (req, res) => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener un registro por ID
app.get('/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows, fields] = await db.query('SELECT * FROM items WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un nuevo registro
app.post('/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar un registro
app.put('/items/:id', async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const [result] = await db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    if (result.affectedRows > 0) {
      res.json({ id, name, description });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un registro
app.delete('/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM items WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
