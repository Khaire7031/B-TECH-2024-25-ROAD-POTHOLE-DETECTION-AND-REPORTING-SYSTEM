import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute';
import Login from './services/login';
import HomePage from './components/Home/HomePage';
import RegisterPage from './services/Register';
import Navbar from './components/Home/Navbar';
import Footer from './components/Home/Footer';
import PotholeReport from './components/common/PotholeReport';
import AdminHome from './components/admin/AdminHome';
import Dashboard from './components/admin/Dashboard';
import SearchCity from './components/Map/SearchCity';



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
        {/* <Route path="/map" element={<MapComponent />} /> */}
        <Route path="/map/search" element={<SearchCity />} />


        {/* Need to chnage to private */}
        <Route path="/report-pothole" element={<PotholeReport />} />

        {/* Protected Route */}
        {/* < Route path="/report-pothole" element={<ProtectedRoute> <PotholeReport /> </ProtectedRoute>} /> */}
        <Route path="/home" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

// https://ap-southeast-2.console.aws.amazon.com/amplify/apps  AWS