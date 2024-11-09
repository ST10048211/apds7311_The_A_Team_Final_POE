// routes/admin.js
const express = require('express');
const { adminLogin, getAllPayments, getPaymentById, updatePaymentStatus } = require('../controllers/adminController');
const { check } = require('express-validator');
const authAdmin = require('../middlewares/authAdmin'); // Middleware for authenticating admin access
const router = express.Router();
const { bruteForce } = require('../server'); // Rate limiting

// Admin login route with validation and brute force protection
router.post('/login', [
  bruteForce.prevent,
  check('username', 'Username is required').notEmpty(),
  check('password', 'Password is required').notEmpty(),
], adminLogin);

// Route to get all payments with optional filtering by status
router.get('/payments', authAdmin, getAllPayments);

// Route to get details of a specific payment by ID
router.get('/payment/:paymentId', authAdmin, getPaymentById);

// Route to update the status of a specific payment (approve/decline)
router.put('/payment/:paymentId/status', authAdmin, [
  check('status', 'Status is required and must be either "approved" or "declined"').isIn(['approved', 'declined'])
], updatePaymentStatus);

module.exports = router;
