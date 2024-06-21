const jwt = require('jsonwebtoken');
const JWT_SECRET = '3sc0ll1m1979/'; // Asegúrate de que esta clave coincida con la usada en auth.js

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

module.exports = authMiddleware;
