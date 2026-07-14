import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './JobDetailPage.css';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      setLoading(true);
      const response = await jobService.getJob(id);
      setJob(response.data.job);
    } catch (error) {
      console.error('Error loading job:', error);
      toast.error('Job not found');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await jobService.applyForJob(id, { coverLetter });
      toast.success('Application submitted successfully! 🎉');
      setShowApplyForm(false);
      setCoverLetter('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading job details...</div>;
  }

  if (!job) {
    return <div className="loading">Job not found</div>;
  }

  return (
    <div className="job-detail-page">
      <div className="job-detail-header">
        <div className="job-title-section">
          <h1>{job.title}</h1>
          <p className="company-name">{job.company}</p>
          <div className="job-meta">
            <span className="meta-tag">📍 {job.location}</span>
            <span className="meta-tag">💼 {job.type}</span>
            {job.salary && <span className="meta-tag">💰 {job.salary}</span>}
            <span className="meta-tag">📅 Posted {new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="job-actions">
          {!showApplyForm ? (
            <button 
              className="apply-btn"
              onClick={() => setShowApplyForm(true)}
            >
              Apply Now
            </button>
          ) : (
            <button 
              className="cancel-btn"
              onClick={() => setShowApplyForm(false)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {showApplyForm && (
        <div className="apply-form-container">
          <form onSubmit={handleApply} className="apply-form">
            <h3>Submit Application</h3>
            <div className="form-group">
              <label>Cover Letter</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="6"
                placeholder="Why are you the right candidate for this role?"
                required
              />
            </div>
            <button type="submit" className="submit-apply-btn" disabled={applying}>
              {applying ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      )}

      <div className="job-detail-body">
        <div className="job-description">
          <h2>Job Description</h2>
          <div className="description-content">
            {job.description}
          </div>
        </div>

        <div className="job-requirements">
          <h2>Requirements</h2>
          <div className="requirements-content">
            {job.requirements}
          </div>
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="job-skills">
            <h2>Skills</h2>
            <div className="skills-list">
              {job.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;
