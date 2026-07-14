import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.profile?.firstName || 'User'}! 👋</h1>
        <p>Here's what's happening with your BridgeHub</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Job Applications</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📁</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Events</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Messages</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <p className="empty-state">No recent activity yet</p>
        </div>
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">📝 Post a Job</button>
            <button className="action-btn">🚀 Create Project</button>
            <button className="action-btn">📅 Create Event</button>
            <button className="action-btn">👤 Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
