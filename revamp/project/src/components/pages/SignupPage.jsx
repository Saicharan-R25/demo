import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/AuthPages.css';

const SignupPage = ({ onSwitchToLogin }) => {
  const { isDark } = useTheme();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    clientId: '',
    clientSecret: '',
    orgId: '',
    organization: '',
    orgDomainInfo: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = signup(formData.email, formData.password, formData.clientId, formData.clientSecret, formData.orgId, formData.organization, formData.orgDomainInfo);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className={`auth-container ${isDark ? 'dark' : 'light'}`}>
      {/* Background Effects */}
      <div className="auth-background-effects">
        <div className={`auth-bg-orb auth-bg-orb-1 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}></div>
        <div className={`auth-bg-orb auth-bg-orb-2 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #ef4444, #ec4899)' }}></div>
        <div className={`auth-bg-orb auth-bg-orb-3 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}></div>
      </div>

      <div className={`auth-card ${isDark ? 'dark' : 'light'}`}>
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo-container">
            <img 
              src="https://experienceleague.adobe.com/icons/adobe-red-logo.svg" 
              alt="Adobe Logo" 
              className="auth-logo-image"
            />
          </div>
          <h1 className={`auth-title ${isDark ? 'dark' : 'light'}`}>
            Create Account
          </h1>
          <p className={`auth-subtitle ${isDark ? 'dark' : 'light'}`}>
            Join OMNIS AI and start your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-grid">
            <div className="form-group">
              <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`form-input ${isDark ? 'dark' : 'light'}`}
                required
              />
            </div>

            <div className="form-group">
              <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className={`form-input ${isDark ? 'dark' : 'light'}`}
                required
              />
            </div>

            <div className="form-group">
              <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                Client ID
              </label>
              <input
                type="text"
                name="clientId"
                value={formData.clientId}
                onChange={handleInputChange}
                placeholder="Enter your client ID"
                className={`form-input ${isDark ? 'dark' : 'light'}`}
                required
              />
            </div>

            <div className="form-group">
              <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                Client Secret
              </label>
              <input
                type="password"
                name="clientSecret"
                value={formData.clientSecret}
                onChange={handleInputChange}
                placeholder="Enter your client secret"
                className={`form-input ${isDark ? 'dark' : 'light'}`}
                required
              />
            </div>

            <div className="form-group">
              <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                Organization ID
              </label>
              <input
                type="text"
                name="orgId"
                value={formData.orgId}
                onChange={handleInputChange}
                placeholder="Enter your organization ID"
                className={`form-input ${isDark ? 'dark' : 'light'}`}
                required
              />
            </div>

            <div className="form-group">
              <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Enter your organization name"
                className={`form-input ${isDark ? 'dark' : 'light'}`}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
              Organization Domain Info
            </label>
            <input
              type="text"
              name="orgDomainInfo"
              value={formData.orgDomainInfo}
              onChange={handleInputChange}
              placeholder="Enter your organization domain info"
              className={`form-input ${isDark ? 'dark' : 'light'}`}
              required
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="auth-submit-button"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <div className={`auth-footer ${isDark ? 'dark' : 'light'}`}>
          <p className={`auth-footer-text ${isDark ? 'dark' : 'light'}`}>
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="auth-footer-link"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;