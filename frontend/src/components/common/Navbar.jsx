import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🚀 BridgeHub
        </Link>

        <div className="nav-links">
          <Link to="/jobs" className="nav-link">Jobs</Link>
          <Link to="/companies" className="nav-link">Companies</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/my-applications" className="nav-link">My Apps</Link>
              <Link to="/my-jobs" className="nav-link">My Jobs</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <button onClick={toggleTheme} className="theme-toggle">
                {darkMode ? '☀️' : '🌙'}
              </button>
              <div className="user-menu">
                <span className="user-name">{user?.profile?.firstName || 'User'}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <>
              <button onClick={toggleTheme} className="theme-toggle">
                {darkMode ? '☀️' : '🌙'}
              </button>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
