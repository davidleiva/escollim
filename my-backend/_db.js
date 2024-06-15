const mysql = require('mysql2');

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D4v1d1982*',
    database: 'escollim'
});

// Conexión a MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
    console.log('Conexión exitosa a MySQL con mysql2');
});

// Ejemplo de consulta utilizando la conexión única
connection.query('SELECT * FROM items', (err, rows) => {
    if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return;
    }
    console.log('Filas recuperadas:', rows);
});

// Cerrar la conexión cuando ya no se necesite
connection.end();
