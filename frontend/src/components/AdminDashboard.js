import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('https://localhost:5000/admin/payments', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleViewDetails = (id) => {
    navigate(`/admin/payment/${id}`);
  };

  const filteredPayments = payments.filter(
    (payment) => filter === 'all' || payment.status === filter
  );

  return (
    <div className="admin-form-container">
      <h2>Approve Transactions</h2>
      
      <label>Filter by Status: </label>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="declined">Declined</option>
      </select>

      <table id="transactionTable">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Account Number</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment._id}</td>
              <td>{payment.recipientAccountNumber}</td>
              <td>{payment.amount} {payment.currency}</td>
              <td>{payment.status}</td>
              <td>
                <button onClick={() => handleViewDetails(payment._id)} className="view-details-button">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout} className="admin-logout-button">Logout</button>
    </div>
  );
};

export default AdminDashboard;
