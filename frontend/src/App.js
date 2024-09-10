import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext.jsx';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import ComplaintForm from './components/ComplaintForm.js';
import AdminPanel from './components/AdminPanel.js';


function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complaints" element={<ComplaintForm />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
