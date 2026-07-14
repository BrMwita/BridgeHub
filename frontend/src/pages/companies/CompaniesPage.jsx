import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { companyService } from '../../services/companyService';
import './CompaniesPage.css';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const response = await companyService.getCompanies();
      setCompanies(response.data.companies);
    } catch (error) {
      console.error('Error loading companies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="companies-page">
      <div className="companies-header">
        <h1>Companies</h1>
        <Link to="/companies/create" className="create-company-btn">
          Register Company
        </Link>
      </div>

      {loading ? (
        <div className="loading">Loading companies...</div>
      ) : companies.length === 0 ? (
        <div className="no-companies">
          <p>No companies registered yet</p>
          <Link to="/companies/create" className="create-btn">
            Register your company
          </Link>
        </div>
      ) : (
        <div className="companies-grid">
          {companies.map((company) => (
            <Link to={`/companies/${company.id}`} key={company.id} className="company-card">
              <div className="company-logo">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} />
                ) : (
                  <div className="logo-placeholder">
                    {company.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3>{company.name}</h3>
              <p className="industry">{company.industry || 'Technology'}</p>
              <p className="location">📍 {company.location || 'Remote'}</p>
              <div className="company-meta">
                <span className="size">{company.size || 'Unknown'}</span>
                {company.isVerified && (
                  <span className="verified">✅ Verified</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
