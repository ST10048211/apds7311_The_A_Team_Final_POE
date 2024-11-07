const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const ExpressBrute = require('express-brute');
const morgan = require('morgan');
const Admin = require('./models/AdminUser'); // Import the Admin model
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Express-brute configuration
const store = new ExpressBrute.MemoryStore();
const bruteForce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5 * 60 * 1000,
  maxWait: 60 * 60 * 1000,
  lifetime: 60 * 60
});

// Rate limiting for general requests (besides login)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

module.exports.bruteForce = bruteForce;

// Predefined admin users
const predefinedAdmins = [
  { username: 'admin1', password: 'password1' }, // Change these for production
  { username: 'admin2', password: 'password2' },
];

// Create admin users on server start
async function createAdmins() {
  for (const admin of predefinedAdmins) {
    const existingAdmin = await Admin.findOne({ username: admin.username });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await new Admin({ username: admin.username, password: hashedPassword }).save();
    }
  }
}

createAdmins();

// // Admin login controller
// const adminLogin = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { username, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ username });
//     if (!admin) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Here you can set a session or JWT token for the admin
//     res.json({ msg: 'Login successful', admin });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// // Admin routes
// app.use('/admin', [
//   check('username', 'Username is required').notEmpty(),
//   check('password', 'Password is required').notEmpty(),
// ]);

// app.post('/admin/login', adminLogin);

// Add this line in server.js to register admin routes
app.use('/admin', require('./routes/adminRoutes'));


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/paymentRoutes'));

// Start HTTPS server
const privateKey = fs.readFileSync('keys/privatekey.pem', 'utf8');
const certificate = fs.readFileSync('keys/certificate.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
const PORT = process.env.PORT || 5000;

httpsServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, bruteForce };



// const express = require('express');
// const connectDB = require('./config/db');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const cors = require('cors');
// const fs = require('fs');
// const https = require('https');
// const ExpressBrute = require('express-brute');
// const morgan = require('morgan');
// require('dotenv').config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(helmet());
// app.use(cors());
// app.use(morgan('dev'));

// // Express-brute configuration
// const store = new ExpressBrute.MemoryStore();
// const bruteForce = new ExpressBrute(store, {
//   freeRetries: 5,
//   minWait: 5 * 60 * 1000,
//   maxWait: 60 * 60 * 1000,
//   lifetime: 60 * 60
// });

// // Rate limiting for general requests (besides login)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });
// app.use(limiter);

// module.exports.bruteForce = bruteForce;

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api', require('./routes/paymentRoutes'));

// // Start HTTPS server
// const privateKey = fs.readFileSync('keys/privatekey.pem', 'utf8');
// const certificate = fs.readFileSync('keys/certificate.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const httpsServer = https.createServer(credentials, app);
// const PORT = process.env.PORT || 5000;

// httpsServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = { app, bruteForce };



// const express = require('express');
// const connectDB = require('./config/db');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const cors = require('cors');
// const fs = require('fs');
// const https = require('https');
// require('dotenv').config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// //Code adapted from: https://helmetjs.github.io/
// //Author: helmetjs.github

// // Middleware
// app.use(express.json());
// app.use(helmet());
// app.use(cors());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100
// });
// app.use(limiter);

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api', require('./routes/paymentRoutes'));

// // Start HTTPS server
// const privateKey = fs.readFileSync('keys/privatekey.pem', 'utf8');
// const certificate = fs.readFileSync('keys/certificate.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const httpsServer = https.createServer(credentials, app);
// const PORT = process.env.PORT || 5000;

// httpsServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
