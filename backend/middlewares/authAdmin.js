// middleware/authAdmin.js
const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
  // Get token from the 'Authorization' header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin; // Use the correct property based on your token payload structure
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authAdmin;
