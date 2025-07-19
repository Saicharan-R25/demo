import React from 'react';
import { Shield, Database, Shuffle, BookOpen, ArrowRight, Sparkles, Zap, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/HomePage.css';
// import { useActions } from '../../contexts/ActionContext';

const HomePage = () => {
  const { isDark } = useTheme();

  const quickStartFeatures = [
    {
      icon: Shield,
      title: 'Security Tools',
      description: 'Advanced encryption and security analysis tools for protecting your data',
      stats: '12 tools available',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      neonGlow: 'shadow-blue-500/20',
      glowColor: 'shadow-blue-500/30'
    },
    {
      icon: Database,
      title: 'Data Processing',
      description: 'Powerful data manipulation and analysis capabilities',
      stats: '8 processors',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-purple-600',
      neonGlow: 'shadow-purple-500/20',
      glowColor: 'shadow-purple-500/30'
    },
    {
      icon: Shuffle,
      title: 'AI Models',
      description: 'Access to cutting-edge AI models for various tasks',
      stats: '15 models',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      neonGlow: 'shadow-green-500/20',
      glowColor: 'shadow-green-500/30'
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation',
      stats: '50+ guides',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      neonGlow: 'shadow-orange-500/20',
      glowColor: 'shadow-orange-500/30'
    }
  ];

  const handleQuickStartClick = (featureTitle) => {
    console.log(`Clicked on ${featureTitle}`);
    // Add navigation logic here
  };

  return (
    <div className={`home-page ${isDark ? 'dark' : 'light'}`}>
      {/* Neon background elements */}
      <div className="home-background">
        <div className={`home-orb home-orb-1 ${isDark ? 'dark' : 'light'}`}></div>
        <div className={`home-orb home-orb-2 ${isDark ? 'dark' : 'light'}`}></div>
        <div className={`home-orb home-orb-3 ${isDark ? 'dark' : 'light'}`}></div>
        <div className={`home-orb home-orb-4 ${isDark ? 'dark' : 'light'}`}></div>
      </div>

      <div className="home-content">
        {/* Greet Section */}
        <div className="home-welcome">
          <div className="welcome-header">
            <div className="welcome-icon">
              <Sparkles className="welcome-icon-svg" />
            </div>
            <div>
              <h1 className={`welcome-title ${isDark ? 'dark' : 'light'}`}>
                Welcome back, Sai!
              </h1>
              <p className={`welcome-subtitle ${isDark ? 'dark' : 'light'}`}>Create, design, and innovate with powerful AI tools</p>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <section className="home-section">
          <div className="section-header">
            <Zap className="section-icon" />
            <h2 className={`section-title ${isDark ? 'dark' : 'light'}`}>Quick Start</h2>
          </div>
          
          <div className="quick-start-grid">
            {quickStartFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleQuickStartClick(feature.title)}
                  className={`feature-card ${isDark ? 'dark' : 'light'}`}
                >
                  {/* Neon glow effect on hover */}
                  <div className="feature-card-glow"></div>
                  <div className={`feature-card-shadow ${feature.color}`}></div>
                  
                  {/* Icon */}
                  <div className={`feature-icon ${feature.color}`}>
                    <Icon className="feature-icon-svg" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`feature-title ${isDark ? 'dark' : 'light'}`}>
                    {feature.title}
                  </h3>
                  <p className={`feature-description ${isDark ? 'dark' : 'light'}`}>
                    {feature.description}
                  </p>
                  
                  {/* Stats and Action */}
                  <div className="feature-footer">
                    <span className={`feature-stats ${isDark ? 'dark' : 'light'}`}>{feature.stats}</span>
                    <ArrowRight className={`feature-arrow ${isDark ? 'dark' : 'light'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;