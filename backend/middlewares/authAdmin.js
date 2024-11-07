// // // middleware/authAdmin.js
// // const jwt = require('jsonwebtoken');

// // const authAdmin = (req, res, next) => {
// //   const token = req.header('x-auth-token');
// //   if (!token) {
// //     return res.status(401).json({ msg: 'No token, authorization denied' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.admin = decoded.admin; // Assuming your token payload includes { admin: { id: adminId } }
// //     next();
// //   } catch (error) {
// //     res.status(401).json({ msg: 'Token is not valid' });
// //   }
// // };

// // module.exports = authAdmin;


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


// const jwt = require('jsonwebtoken');

// const authAdmin = (req, res, next) => {
//   // Get token from the 'Authorization' header
//   const authHeader = req.header('Authorization');
//   if (!authHeader) {
//     console.log('No token provided');
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"
//   console.log('Token:', token); // Log the token for debugging

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded.admin; // Ensure this matches your token payload
//     console.log('Decoded admin:', decoded.admin); // Log the decoded admin
//     next();
//   } catch (error) {
//     console.error('Token verification failed:', error.message); // Log the error message
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// module.exports = authAdmin;
