const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token yok, erişim reddedildi.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // decoded içinde id olur, req.user ile diğer handlerlarda kullanabilirsin
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token geçersiz veya süresi dolmuş.' });
  }
}

module.exports = authMiddleware;