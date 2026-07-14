import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './MyJobsPage.css';

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMyJobs();
  }, []);

  const loadMyJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5001/api/jobs/my-jobs');
      console.log('My Jobs response:', response.data);
      
      // Ensure we always have an array
      const jobsData = response.data.data?.jobs || [];
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setError(error.response?.data?.message || 'Failed to load your jobs');
      toast.error('Failed to load your jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await axios.delete(`http://localhost:5001/api/jobs/${jobId}`);
      toast.success('Job deleted successfully');
      setJobs(jobs.filter(job => job.id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete job');
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await axios.put(`http://localhost:5001/api/jobs/${jobId}`, { status: newStatus });
      toast.success('Job status updated');
      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, status: newStatus } : job
      ));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'closed': return 'status-closed';
      case 'draft': return 'status-draft';
      default: return 'status-active';
    }
  };

  if (loading) {
    return <div className="loading">Loading your jobs...</div>;
  }

  if (error) {
    return (
      <div className="my-jobs-page">
        <div className="my-jobs-header">
          <div>
            <h1>My Jobs</h1>
            <p>Manage your posted job listings</p>
          </div>
          <Link to="/jobs/post" className="post-job-btn">
            📝 Post New Job
          </Link>
        </div>
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={loadMyJobs} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-jobs-page">
      <div className="my-jobs-header">
        <div>
          <h1>My Jobs</h1>
          <p>Manage your posted job listings</p>
        </div>
        <Link to="/jobs/post" className="post-job-btn">
          📝 Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="no-jobs">
          <div className="empty-state">
            <span className="empty-icon">💼</span>
            <h3>No jobs posted yet</h3>
            <p>Post your first job to start hiring</p>
            <Link to="/jobs/post" className="post-first-job-btn">
              Post Your First Job
            </Link>
          </div>
        </div>
      ) : (
        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-management-card">
              <div className="job-header">
                <div className="job-title-section">
                  <h3>{job.title}</h3>
                  <p className="company-name">{job.company}</p>
                </div>
                <div className="job-stats">
                  <span className="stat">
                    <span className="stat-label">Applications</span>
                    <span className="stat-value">{job.applications || 0}</span>
                  </span>
                  <span className="stat">
                    <span className="stat-label">Views</span>
                    <span className="stat-value">{job.views || 0}</span>
                  </span>
                </div>
              </div>

              <div className="job-details">
                <div className="detail-item">
                  <span className="detail-label">📍 Location</span>
                  <span className="detail-value">{job.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">💼 Type</span>
                  <span className="detail-value">{job.type}</span>
                </div>
                {job.salary && (
                  <div className="detail-item">
                    <span className="detail-label">💰 Salary</span>
                    <span className="detail-value">{job.salary}</span>
                  </div>
                )}
                <div className="detail-item">
                  <span className="detail-label">📅 Posted</span>
                  <span className="detail-value">
                    {new Date(job.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <div className="job-status-section">
                <div className="status-control">
                  <span className="status-label">Status:</span>
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                    className={`status-select ${getStatusColor(job.status)}`}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="job-actions">
                  <Link to={`/jobs/${job.id}`} className="action-btn view-btn">👁️ View</Link>
                  <button onClick={() => handleDelete(job.id)} className="action-btn delete-btn">🗑️ Delete</button>
                </div>
              </div>

              {job.skills && job.skills.length > 0 && (
                <div className="job-skills">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
