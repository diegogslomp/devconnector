const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verifiy token
  try {
    const decodedUser = jwt.verify(token, config.get('jwtSecret'));
    req.user = decodedUser;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
