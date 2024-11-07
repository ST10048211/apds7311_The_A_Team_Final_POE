import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Payment from './components/AccountAndPayment';
import PrivateRoute from './components/PrivateRoute';
// import './styles.css'; 
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import PaymentDetails from './components/PaymentDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/payment/:paymentId" element={<PaymentDetails />} />


                

                {/* Protect the home route */}
                <Route
                    path="/getpayments"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <PrivateRoute>
                            <Payment />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
