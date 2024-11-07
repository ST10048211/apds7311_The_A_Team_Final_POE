// // src/PaymentDetails.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PaymentDetails = () => {
//   const { paymentId } = useParams();
//   const navigate = useNavigate();
//   const [payment, setPayment] = useState(null);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       try {
//         const response = await axios.get(`https://localhost:5000/admin/payment/${paymentId}`);
//         setPayment(response.data);
//       } catch (error) {
//         console.error('Error fetching payment details:', error);
//       }
//     };

//     fetchPaymentDetails();
//   }, [paymentId]);

//   const updatePaymentStatus = async (status) => {
//     try {
//       await axios.put(`https://localhost:5000/admin/payment/${paymentId}/status`, { status });
//       setMessage(`Payment successfully ${status === 'approved' ? 'submitted to SWIFT and approved' : 'declined'}`);
//       setPayment({ ...payment, status });
//     } catch (error) {
//       console.error(`Error updating payment status to ${status}:`, error);
//     }
//   };

//   if (!payment) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Payment Details</h2>
//       <p><strong>Recipient:</strong> {payment.recipientAccOwnerName}</p>
//       <p><strong>Account Number:</strong> {payment.recipientAccountNumber}</p>
//       <p><strong>Bank:</strong> {payment.bankName}</p>
//       <p><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
//       <p><strong>Status:</strong> {payment.status}</p>

//       {message && <p style={{ color: 'green' }}>{message}</p>}

//       {payment.status === 'pending' && (
//         <div>
//           <button onClick={() => updatePaymentStatus('approved')}>Approve</button>
//           <button onClick={() => updatePaymentStatus('declined')}>Decline</button>
//         </div>
//       )}
//       <button onClick={() => navigate('/admin/dashboard')}>Back to Dashboard</button>
//     </div>
//   );
// };

// export default PaymentDetails;


// src/PaymentDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentDetails.css'; // Assuming you create this CSS file for styling

const PaymentDetails = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`https://localhost:5000/admin/payment/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setPayment(response.data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPaymentDetails();
  }, [paymentId]);

  const updatePaymentStatus = async (status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(
        `https://localhost:5000/admin/payment/${paymentId}/status`,
        { status },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(
        `Payment successfully ${
          status === 'approved' ? 'submitted to SWIFT and approved' : 'declined'
        }`
      );
      setPayment({ ...payment, status });
    } catch (error) {
      console.error(`Error updating payment status to ${status}:`, error);
    }
  };

  if (!payment) return <div>Loading...</div>;

  return (
    <div className="payment-details-container">
      <h2>Payment Details</h2>

      <div className="payment-info">
        <p><strong>Recipient:</strong> {payment.recipientAccOwnerName}</p>
        <p><strong>Account Number:</strong> {payment.recipientAccountNumber}</p>
        <p><strong>Bank:</strong> {payment.bankName}</p>
        <p><strong>Amount:</strong> {payment.amount} {payment.currency}</p>
        <p><strong>Status:</strong> {payment.status}</p>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="button-group">
        {payment.status === 'pending' && (
          <>
            <button onClick={() => updatePaymentStatus('approved')} className="approve-button">
              Approve
            </button>
            <button onClick={() => updatePaymentStatus('declined')} className="decline-button">
              Decline
            </button>
          </>
        )}
        <button onClick={() => navigate('/admin/dashboard')} className="back-button">
          Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default PaymentDetails;
