import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute';
import Dashboard from './components/admin/Dashboard';
import Login from './services/login';
import HomePage from './components/Home/HomePage';
import RegisterPage from './services/Register';
import Navbar from './components/Home/Navbar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        {/* Public Route */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={< RegisterPage />} />


        {/* Protected Route */}

        <Route path="/home" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
