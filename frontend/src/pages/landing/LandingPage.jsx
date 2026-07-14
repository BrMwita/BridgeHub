import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Build Your Career & Community with{' '}
              <span className="gradient-text">BridgeHub</span>
            </h1>
            <p className="hero-description">
              The all-in-one platform for jobs, freelancing, projects, events, 
              and community building. Connect with opportunities that matter.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary hero-btn">
                Get Started Free
              </Link>
              <Link to="/about" className="btn-secondary hero-btn">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Users</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Companies</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">1,000+</span>
                <span className="stat-label">Jobs Posted</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
