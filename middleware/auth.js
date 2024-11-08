require('dotenv').config();
const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  // Ambil header authorization
  const header = req.headers.authorization;

  // Cek header
  if (!header) {
    return res.status(401).json({ message: 'Authorization header is required' });
  }

  // Ambil token dari header
  const token = header.split(' ')[1];

  // Cek token
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    // Verifikasi token menggunakan JWT
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    // Jika token tidak valid atau ada error lainnya
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { validateToken };
