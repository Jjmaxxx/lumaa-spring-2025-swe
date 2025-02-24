import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './components/auth-context';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import TasksPage from './components/TasksPage';

const App: React.FC = () => {
  const { isAuthenticated, logout, userEmail } = useContext(AuthContext)!;
  return (
    <Router>
      <nav>
        {isAuthenticated ? (
          <>
            <div>Hello, <b>{userEmail}</b>.</div>
            <Link to="/tasks">Tasks</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{marginRight:"10px"}}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<TasksPage authenticated= {isAuthenticated}/>} />
      </Routes>
    </Router>
  );
};

export default App;
