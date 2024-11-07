const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  // Currently logged in user ID
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // Recipient Account Information
  recipientAccountNumber: { type: String, required: true },
  recipientBankName: { type: String, required: true },
  recipientAccOwnerName: { type: String, required: true },
  accountType: { type: String, required: true },
  swiftCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  // Transfer Details
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  bankName: { type: String, required: true },

  // Payment Status
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Payment', PaymentSchema);
