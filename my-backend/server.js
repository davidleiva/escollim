const express = require('express');
const db = require('./db'); // Importa el pool de conexiones desde db.js

const app = express();
const port = 3000;

// Ruta GET para obtener todos los items desde la base de datos
app.get('/items', async (req, res) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM items');
        res.json(rows); // Devuelve los resultados como JSON
    } catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener los items' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});