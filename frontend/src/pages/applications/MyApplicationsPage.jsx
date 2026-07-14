import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './MyApplicationsPage.css';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5001/api/jobs/applications/me');
      console.log('Applications response:', response.data);
      
      // Ensure we always have an array
      const apps = response.data.data?.applications || [];
      setApplications(apps);
    } catch (error) {
      console.error('Error loading applications:', error);
      setError(error.response?.data?.message || 'Failed to load applications');
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'reviewed': return 'status-reviewed';
      case 'interview': return 'status-interview';
      case 'accepted': return 'status-accepted';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'reviewed': return '👀';
      case 'interview': return '📅';
      case 'accepted': return '🎉';
      case 'rejected': return '❌';
      default: return '⏳';
    }
  };

  if (loading) {
    return <div className="loading">Loading applications...</div>;
  }

  if (error) {
    return (
      <div className="applications-page">
        <div className="applications-header">
          <h1>My Applications</h1>
          <p>Track your job applications</p>
        </div>
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={loadApplications} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <div className="applications-header">
        <h1>My Applications</h1>
        <p>Track your job applications</p>
      </div>

      {applications.length === 0 ? (
        <div className="no-applications">
          <div className="empty-state">
            <span className="empty-icon">📋</span>
            <h3>No applications yet</h3>
            <p>Start applying for jobs to see your applications here</p>
            <Link to="/jobs" className="browse-jobs-btn">Browse Jobs</Link>
          </div>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="application-header">
                <div className="job-info">
                  <h3>{app.job?.title || 'Unknown Job'}</h3>
                  <p className="company-name">{app.job?.company || 'Unknown Company'}</p>
                </div>
                <div className={`status-badge ${getStatusColor(app.status)}`}>
                  {getStatusIcon(app.status)} {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </div>
              </div>

              <div className="application-details">
                <div className="detail-item">
                  <span className="detail-label">📍 Location</span>
                  <span className="detail-value">{app.job?.location || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">💼 Type</span>
                  <span className="detail-value">{app.job?.type || 'N/A'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📅 Applied</span>
                  <span className="detail-value">
                    {new Date(app.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {app.coverLetter && (
                <div className="cover-letter">
                  <h4>Cover Letter</h4>
                  <p>{app.coverLetter}</p>
                </div>
              )}

              <div className="application-actions">
                <Link to={`/jobs/${app.jobId}`} className="view-job-btn">
                  View Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
