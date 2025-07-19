import React, { useState } from 'react';
import { Home, Shield, Database, Shuffle, BookOpen } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = ({ currentPage, onPageChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'randomizer', label: 'Randomizer', icon: Shuffle },
    { id: 'documentation', label: 'Documentation', icon: BookOpen }
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="sidebar-container">
          {/* Menu Items */}
          <div className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <div
                  key={item.id}
                  className="sidebar-item-container"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={`sidebar-item ${
                      isActive
                        ? 'active'
                        : 'inactive'
                    } ${isExpanded ? 'expanded' : 'collapsed'}`}
                  >
                    <Icon className="sidebar-icon" />
                    {isExpanded && (
                      <span className="sidebar-label">{item.label}</span>
                    )}
                    {isActive && (
                      <div className="sidebar-item-glow"></div>
                    )}
                  </button>
                  
                  {!isExpanded && hoveredItem === item.id && (
                    <div className="sidebar-tooltip">
                      {item.label}
                      <div className="sidebar-tooltip-arrow"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;