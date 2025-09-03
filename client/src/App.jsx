import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import InstructorDashboard from './components/InstructorDashboard';
import LearnerDashboard from './components/LearnerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/learner-dashboard" element={<LearnerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;