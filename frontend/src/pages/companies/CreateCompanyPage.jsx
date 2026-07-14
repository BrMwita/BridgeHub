import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companyService } from '../../services/companyService';
import toast from 'react-hot-toast';
import './CreateCompanyPage.css';

const CreateCompanyPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    industry: '',
    size: '11-50',
    founded: '',
    location: '',
    email: '',
    phone: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await companyService.createCompany(formData);
      toast.success('Company registered successfully! 🎉');
      navigate('/companies');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-company-page">
      <div className="create-company-header">
        <h1>Register Your Company</h1>
        <p>Create a company profile to start hiring</p>
      </div>

      <form onSubmit={handleSubmit} className="create-company-form">
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Company Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your company..."
            />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label>Industry</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Technology, Healthcare, etc."
            />
          </div>

          <div className="form-group">
            <label>Company Size</label>
            <select name="size" value={formData.size} onChange={handleChange}>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
          </div>

          <div className="form-group">
            <label>Founded Year</label>
            <input
              type="text"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              placeholder="2015"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Nairobi, Kenya"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="company@example.com"
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 700 000 000"
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              name="socialMedia.linkedin"
              value={formData.socialMedia.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/..."
            />
          </div>

          <div className="form-group">
            <label>Twitter</label>
            <input
              type="url"
              name="socialMedia.twitter"
              value={formData.socialMedia.twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/..."
            />
          </div>

          <div className="form-group">
            <label>Facebook</label>
            <input
              type="url"
              name="socialMedia.facebook"
              value={formData.socialMedia.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/companies')}>
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register Company'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompanyPage;
