import React, { useState, useEffect } from 'react';
import { ChevronDown, FileText, MessageSquare, User, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/TopNavigation.css';

const TopNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogoutDialog(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`top-navigation ${
      isScrolled 
        ? `scrolled ${isDark ? 'dark' : 'light'}`
        : 'transparent'
    }`}>
      <div className="nav-content">
        {/* Left section */}
        <div className="nav-left">
          <div className="nav-left-inner">
            <div className="nav-dropdown-container">
              <button
                onClick={() => toggleDropdown('org')}
                className={`nav-dropdown-button ${isDark ? 'dark' : 'light'}`}
              >
                <span className="nav-dropdown-text">Organization</span>
                <ChevronDown className="nav-dropdown-icon" />
              </button>
              {activeDropdown === 'org' && (
                <div className={`nav-dropdown-menu ${isDark ? 'dark' : 'light'}`}>
                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Main Organization</a>
                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Development Team</a>
                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Analytics Team</a>
                </div>
              )}
            </div>
            
            <div className="nav-dropdown-container">
              <button
                onClick={() => toggleDropdown('sandbox')}
                className={`nav-dropdown-button ${isDark ? 'dark' : 'light'}`}
              >
                <span className="nav-dropdown-text">Sandbox</span>
                <ChevronDown className="nav-dropdown-icon" />
              </button>
              {activeDropdown === 'sandbox' && (
                <div className={`nav-dropdown-menu ${isDark ? 'dark' : 'light'}`}>
                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Development</a>
                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Testing</a>
                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Production</a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center - Product Name */}
        <div className="nav-center">
          <div className={`nav-logo ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            OMNIS AI
          </div>
        </div>

        {/* Right section */}
        <div className="nav-right">
          <button 
            onClick={toggleTheme}
            className={`nav-icon-button ${isDark ? 'dark' : 'light'}`}
          >
            {isDark ? <Sun className="nav-icon" /> : <Moon className="nav-icon" />}
          </button>
          
          <button className={`nav-icon-button ${isDark ? 'dark' : 'light'}`}>
            <MessageSquare className="nav-icon" />
          </button>
          
          <button className={`nav-icon-button ${isDark ? 'dark' : 'light'}`}>
            <FileText className="nav-icon" />
          </button>
          
          <button className={`nav-icon-button ${isDark ? 'dark' : 'light'}`}>
            <User className="nav-icon" />
          </button>
          
          <button 
            onClick={() => setShowLogoutDialog(true)}
            className={`nav-icon-button logout ${isDark ? 'dark' : 'light'}`}
          >
            <LogOut className="nav-icon" />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="logout-dialog-overlay">
          <div className={`logout-dialog ${isDark ? 'dark' : 'light'}`}>
            <h3 className={`logout-dialog-title ${isDark ? 'dark' : 'light'}`}>
              Confirm Logout
            </h3>
            <p className={`logout-dialog-text ${isDark ? 'dark' : 'light'}`}>
              Are you sure you want to logout from <span className="font-medium">{user?.email}</span>?
            </p>
            <div className="logout-dialog-actions">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className={`logout-dialog-cancel ${isDark ? 'dark' : 'light'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="logout-dialog-confirm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNavigation;