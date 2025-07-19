import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/AuthPages.css';

const LoginPage = ({ onSwitchToSignup }) => {
  const { isDark } = useTheme();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    const result = login(formData.email, formData.password);
    
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
          <div className="flex flex-col items-center mb-6">
            <img 
              src="https://experienceleague.adobe.com/icons/adobe-red-logo.svg" 
              alt="Adobe Logo" 
              className="w-16 h-16 mb-4"
            />
          </div>
          <h1 className={`auth-title ${isDark ? 'dark' : 'light'}`}>
            Welcome Back
          </h1>
          <p className={`auth-subtitle ${isDark ? 'dark' : 'light'}`}>
            Sign in to your OMNIS AI account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
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
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className={`auth-footer ${isDark ? 'dark' : 'light'}`}>
          <p className={`auth-footer-text ${isDark ? 'dark' : 'light'}`}>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="auth-footer-link"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;