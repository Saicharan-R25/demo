import React from 'react';
import { Shield, Database, Shuffle, BookOpen, ArrowRight, Sparkles, Zap, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
// import { useActions } from '../../contexts/ActionContext';

const HomePage = ({ onPageChange }) => {
  const { isDark } = useTheme();
  // const { actions } = useActions();

  const quickStartFeatures = [
    {
      title: 'Data Validation',
      description: 'Validate your data with AI-powered rules and ensure quality',
      icon: Shield,
      color: 'bg-blue-400/70',
      glowColor: 'shadow-blue-400/15',
      stats: '1.2K validations today',
      neonGlow: 'shadow-blue-400/20'
    },
    {
      title: 'Synthetic Data',
      description: 'Generate realistic datasets with advanced AI models',
      icon: Database,
      color: 'bg-red-400/70',
      glowColor: 'shadow-red-400/15',
      stats: '89K records generated',
      neonGlow: 'shadow-red-400/20'
    },
    {
      title: 'Data Mapping',
      description: 'Intelligent schema mapping with automated detection',
      icon: Shuffle,
      color: 'bg-orange-400/70',
      glowColor: 'shadow-orange-400/15',
      stats: '156 mappings created',
      neonGlow: 'shadow-orange-400/20'
    },
    {
      title: 'Runbook',
      description: 'Automated workflows and process documentation',
      icon: BookOpen,
      color: 'bg-purple-400/70',
      glowColor: 'shadow-purple-400/15',
      stats: '12 runbooks created',
      neonGlow: 'shadow-purple-400/20'
    }
  ];

  // const getTimeAgo = (timestamp) => {
  //   const now = new Date();
  //   const actionTime = new Date(timestamp);
  //   const diffInMinutes = Math.floor((now - actionTime) / (1000 * 60));
  //   
  //   if (diffInMinutes < 1) return 'Just now';
  //   if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  //   
  //   const diffInHours = Math.floor(diffInMinutes / 60);
  //   if (diffInHours < 24) return `${diffInHours} hours ago`;
  //   
  //   const diffInDays = Math.floor(diffInHours / 24);
  //   return `${diffInDays} days ago`;
  // };

  // const getActionIcon = (page) => {
  //   switch (page) {
  //     case 'validation': return Shield;
  //     case 'synthetic': return Database;
  //     case 'mapping': return Shuffle;
  //     case 'runbook': return BookOpen;
  //     default: return Activity;
  //   }
  // };

  // const getActionColor = (page) => {
  //   switch (page) {
  //     case 'validation': return 'bg-blue-500';
  //     case 'synthetic': return 'bg-red-500';
  //     case 'mapping': return 'bg-orange-500';
  //     case 'runbook': return 'bg-purple-500';
  //     default: return 'bg-gray-500';
  //   }
  // };

  // const getActionGlow = (page) => {
  //   switch (page) {
  //     case 'validation': return 'shadow-blue-400/30';
  //     case 'synthetic': return 'shadow-red-400/30';
  //     case 'mapping': return 'shadow-orange-400/30';
  //     case 'runbook': return 'shadow-purple-400/30';
  //     default: return 'shadow-gray-400/30';
  //   }
  // };

  // const handleRecentActionClick = (action) => {
  //   // Navigate to the page and restore the state
  //   onPageChange(action.page);
  //   
  //   // Store the action ID in sessionStorage so the target page can restore state
  //   sessionStorage.setItem('restoreActionId', action.id);
  // };

  const handleQuickStartClick = (featureId) => {
    const pageMap = {
      'Data Validation': 'validation',
      'Synthetic Data': 'synthetic',
      'Data Mapping': 'mapping',
      'Runbook': 'runbook'
    };
    
    const targetPage = pageMap[featureId];
    if (targetPage) {
      onPageChange(targetPage);
    }
  };

  const handleRefresh = () => {
    // Clear any stored state for home page
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('homeState_')) {
        localStorage.removeItem(key);
      }
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Neon background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/${isDark ? '20' : '10'} to-purple-600/${isDark ? '20' : '10'} rounded-full blur-3xl animate-float`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-red-500/${isDark ? '20' : '10'} to-pink-600/${isDark ? '20' : '10'} rounded-full blur-3xl animate-float`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/${isDark ? '15' : '8'} to-violet-600/${isDark ? '15' : '8'} rounded-full blur-3xl animate-float`} style={{ animationDelay: '4s' }}></div>
        <div className={`absolute top-20 right-20 w-60 h-60 bg-gradient-to-r from-orange-500/${isDark ? '15' : '8'} to-red-600/${isDark ? '15' : '8'} rounded-full blur-3xl animate-float`} style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 p-8 ml-20 pt-24">
        {/* Greet Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-400/70 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-400/15">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-4xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Welcome back, Sai!
              </h1>
              <p className={`text-lg font-normal ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Create, design, and innovate with powerful AI tools</p>
            </div>
          </div>
        </div>

        {/* Quick Start Section */}
        <section className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Zap className="w-5 h-5 text-blue-400/80" />
            <h2 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Start</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onClick={() => handleQuickStartClick(feature.title)}
                  className={`group relative ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50 hover:border-blue-500/50' : 'border-gray-200/50 hover:border-blue-400/60'} transition-all duration-500 hover:transform hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Neon glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.neonGlow} group-hover:shadow-2xl`}></div>
                  
                  {/* Icon */}
                  <div className={`w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.glowColor} group-hover:shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {feature.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 leading-relaxed font-normal`}>
                    {feature.description}
                  </p>
                  
                  {/* Stats and Action */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{feature.stats}</span>
                    <ArrowRight className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:text-blue-400/80 group-hover:translate-x-1 transition-all duration-300`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Actions Section - Commented Out */}
        {/* <section>
          <div className="flex items-center space-x-3 mb-8">
            <Activity className="w-5 h-5 text-red-400" />
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Actions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {actions.slice(0, 4).map((action, index) => {
              const Icon = getActionIcon(action.page);
              return (
                <div
                  key={index}
                  onClick={() => handleRecentActionClick(action)}
                  className={`group relative ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50 hover:border-red-500/50' : 'border-gray-200/50 hover:border-red-400/60'} transition-all duration-500 hover:transform hover:-translate-y-1 cursor-pointer`}
                >
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getActionGlow(action.page)} group-hover:shadow-2xl`}></div>
                  
                  <div className="absolute top-4 right-4">
                    {action.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-blue-400 drop-shadow-lg" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin drop-shadow-lg"></div>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 ${getActionColor(action.page)} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                        {action.title}
                      </h3>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-3`}>
                        {action.description}
                      </p>
                      
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
                          <Clock className="w-3 h-3" />
                          <span>{getTimeAgo(action.timestamp)}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          action.status === 'completed' 
                            ? `bg-blue-500/20 text-blue-400 border border-blue-500/30` 
                            : `bg-orange-500/20 text-orange-400 border border-orange-500/30`
                        }`}>
                          {action.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section> */}

        {/* Show message if no recent actions - Commented Out */}
        {/* {actions.length === 0 && (
          <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-8 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'} text-center`}>
            <Activity className={`w-12 h-12 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No recent actions yet. Start by exploring the features above!</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default HomePage;