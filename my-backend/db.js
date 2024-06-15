const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Reemplaza con tu usuario de MySQL
    password: 'D4v1d1982*', // Reemplaza con tu contraseña de MySQL
    database: 'escollim', // Reemplaza con el nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar el pool para que pueda ser utilizado en otros módulos
module.exports = pool.promise();
