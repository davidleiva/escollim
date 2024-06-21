const express = require('express');
const db = require('./db'); // Importa el pool de conexiones desde db.js
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware'); // Importa el middleware correctamente

app.use('/auth', authRoutes);

// Ejemplo -> Ruta GET para obtener todos los items desde la base de datos
app.get('/items', async (req, res) => {
    try {
        const [rows, fields] = await db.query('SELECT * FROM items');
        res.json(rows); // Devuelve los resultados como JSON
    } catch (error) {
        console.error('Error al obtener los items:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener los items' });
    }
});

// Ruta protegida
app.get('/inicio', authMiddleware, (req, res) => {
    res.json({ message: 'Bienvenido a la página de inicio', user: req.user });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});