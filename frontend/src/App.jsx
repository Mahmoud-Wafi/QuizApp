import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import QuizDetail from './pages/QuizDetail';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import SolveQuiz from './pages/SolveQuiz';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz/:id/solve" element={<SolveQuiz />} />

      </Routes>
    </Router>
  );
}

export default App;
