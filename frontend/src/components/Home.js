// src/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles/Home.css'; // Assuming you create a CSS file to style this page

const Home = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('User is not authenticated. Please log in.');
          navigate('/login');
          return;
        }
  
        const response = await fetch('https://localhost:5000/api/getpayments', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to load payments.');
          console.error('Error fetching payments:', errorData.message);
          return;
        }
  
        const data = await response.json();
        setPayments(data); // Assuming the response contains a list of payments
        console.log('Fetched payments:', data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('An error occurred while fetching payments.');
      }
    };
  
    fetchPayments();
  }, [navigate]);
  

  const handleNewPayment = () => {
    navigate('/payment');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const pendingPayments = payments.filter(payment => payment.status.toLowerCase() === 'pending');
const approvedPayments = payments.filter(payment => payment.status.toLowerCase() === 'approved');
const declinedPayments = payments.filter(payment => payment.status.toLowerCase() === 'declined');


  return (
    <div className="home-container">

      <div className="home-button-group">
        <button onClick={handleNewPayment} className="home-button">Make a New Payment</button>
        <button onClick={handleLogout} className="home-button">Logout</button>
      </div>
      <h2>Transaction History</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Buttons outside the transaction history section */}
    

      <div className="home-form-container">
        {/* Pending Transactions Section */}
        <section>
          <h3>Pending Transactions</h3>
          <ul>
            {pendingPayments.length > 0 ? (
              pendingPayments.map(payment => (
                <li key={payment.id}>
                  {/* <strong>Date:</strong> {payment.date}<br /> */}
                  <strong>Amount:</strong> {payment.amount} {payment.currency}<br />
                  <strong>Account Name:</strong> {payment.recipientAccOwnerName}<br />
                  <strong>Account Number:</strong> {payment.recipientAccountNumber}<br />
                  <strong>SWIFT Code:</strong> {payment.swiftCode}<br />
                  <strong>Status:</strong> {payment.status}
                </li>
              ))
            ) : (
              <p>No pending transactions.</p>
            )}
          </ul>
        </section>

        {/* Approved Transactions Section */}
        <section>
          <h3>Approved Transactions</h3>
          <ul>
            {approvedPayments.length > 0 ? (
              approvedPayments.map(payment => (
                <li key={payment.id}>
                  {/* <strong>Date:</strong> {payment.date}<br /> */}
                  <strong>Amount:</strong> {payment.amount} {payment.currency}<br />
                  <strong>Account Name:</strong> {payment.recipientAccOwnerName}<br />
                  <strong>Account Number:</strong> {payment.recipientAccountNumber}<br />
                  <strong>SWIFT Code:</strong> {payment.swiftCode}<br />
                  <strong>Status:</strong> {payment.status}
                </li>
              ))
            ) : (
              <p>No approved transactions.</p>
            )}
          </ul>
        </section>

         {/* Declined Transactions Section */}
        <section>
          <h3>Declined Transactions</h3>
          <ul>
            {declinedPayments.length > 0 ? (
              declinedPayments.map(payment => (
                <li key={payment.id}>
                  {/* <strong>Date:</strong> {payment.date}<br /> */}
                  <strong>Amount:</strong> {payment.amount} {payment.currency}<br />
                  <strong>Account Name:</strong> {payment.recipientAccOwnerName}<br />
                  <strong>Account Number:</strong> {payment.recipientAccountNumber}<br />
                  <strong>SWIFT Code:</strong> {payment.swiftCode}<br />
                  <strong>Status:</strong> {payment.status}
                </li>
              ))
            ) : (
              <p>No declined transactions.</p>
            )}
          </ul>
        </section>
      </div>

      
    </div>
  );
};

export default Home;
