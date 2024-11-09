// controllers/adminController.js
const Admin = require('../models/AdminUser');
const Payment = require('../models/Payment'); // Assuming you have a Payment model
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Admin login
exports.adminLogin = async (req, res) => {

  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create payload for the JWT token
    const payload = { admin: { id: admin.id } }; // use `admin.id`

    // Generate the JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });
    console.log(token);
    // Send the token back in the response
    res.json({ msg: 'Login successful', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Fetch all payments with optional filtering
exports.getAllPayments = async (req, res) => {
    try {
      console.log("Received request for payments");
      const { status } = req.query;
      const filter = status ? { status } : {};
      const payments = await Payment.find(filter);
      res.json(payments);
    } catch (error) {
      console.error("Error in getAllPayments:", error.message);
      res.status(500).json({ msg: 'Error fetching payments' });
    }
  };
  

// Fetch details of a specific payment
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Error fetching payment details' });
  }
};

// Update payment status (approve/decline)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'declined'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const payment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      { status },
      { new: true }
    );
    
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    const responseMsg = status === 'approved' ? 'Payment successfully submitted to SWIFT' : 'Payment declined';
    res.json({ msg: responseMsg, payment });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Error updating payment status' });
  }
};
