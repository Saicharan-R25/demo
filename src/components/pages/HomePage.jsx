@@ .. @@
 import React from 'react';
 import { Shield, Database, Shuffle, BookOpen, ArrowRight, Sparkles, Zap, RefreshCw } from 'lucide-react';
 import { useTheme } from '../../contexts/ThemeContext';
+import '../../styles/HomePage.css';
 // import { useActions } from '../../contexts/ActionContext';

@@ .. @@
   };

   return (
-    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
+    <div className={`home-page ${isDark ? 'dark' : 'light'}`}>
       {/* Neon background elements */}
-      <div className="fixed inset-0 overflow-hidden pointer-events-none">
-        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/${isDark ? '20' : '10'} to-purple-600/${isDark ? '20' : '10'} rounded-full blur-3xl animate-float`}></div>
-        <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-red-500/${isDark ? '20' : '10'} to-pink-600/${isDark ? '20' : '10'} rounded-full blur-3xl animate-float`} style={{ animationDelay: '2s' }}></div>
-        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/${isDark ? '15' : '8'} to-violet-600/${isDark ? '15' : '8'} rounded-full blur-3xl animate-float`} style={{ animationDelay: '4s' }}></div>
-        <div className={`absolute top-20 right-20 w-60 h-60 bg-gradient-to-r from-orange-500/${isDark ? '15' : '8'} to-red-600/${isDark ? '15' : '8'} rounded-full blur-3xl animate-float`} style={{ animationDelay: '1s' }}></div>
+      <div className="home-background">
+        <div className={`home-orb home-orb-1 ${isDark ? 'dark' : 'light'}`}></div>
+        <div className={`home-orb home-orb-2 ${isDark ? 'dark' : 'light'}`}></div>
+        <div className={`home-orb home-orb-3 ${isDark ? 'dark' : 'light'}`}></div>
+        <div className={`home-orb home-orb-4 ${isDark ? 'dark' : 'light'}`}></div>
       </div>

-      <div className="relative z-10 p-8 ml-20 pt-24">
+      <div className="home-content">
         {/* Greet Section */}
-        <div className="mb-16">
-          <div className="flex items-center space-x-4 mb-6">
-            <div className="w-12 h-12 bg-blue-400/70 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-400/15">
-              <Sparkles className="w-6 h-6 text-white" />
+        <div className="home-welcome">
+          <div className="welcome-header">
+            <div className="welcome-icon">
+              <Sparkles className="welcome-icon-svg" />
             </div>
             <div>
-              <h1 className={`text-4xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
+              <h1 className={`welcome-title ${isDark ? 'dark' : 'light'}`}>
                 Welcome back, Sai!
               </h1>
-              <p className={`text-lg font-normal ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Create, design, and innovate with powerful AI tools</p>
+              <p className={`welcome-subtitle ${isDark ? 'dark' : 'light'}`}>Create, design, and innovate with powerful AI tools</p>
             </div>
           </div>
         </div>

         {/* Quick Start Section */}
-        <section className="mb-16">
-          <div className="flex items-center space-x-3 mb-8">
-            <Zap className="w-5 h-5 text-blue-400/80" />
-            <h2 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Start</h2>
+        <section className="home-section">
+          <div className="section-header">
+            <Zap className="section-icon" />
+            <h2 className={`section-title ${isDark ? 'dark' : 'light'}`}>Quick Start</h2>
           </div>
           
-          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
+          <div className="quick-start-grid">
             {quickStartFeatures.map((feature, index) => {
               const Icon = feature.icon;
               return (
                 <div
                   key={index}
                   onClick={() => handleQuickStartClick(feature.title)}
-                  className={`group relative ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50 hover:border-blue-500/50' : 'border-gray-200/50 hover:border-blue-400/60'} transition-all duration-500 hover:transform hover:-translate-y-2 cursor-pointer`}
+                  className={`feature-card ${isDark ? 'dark' : 'light'}`}
                 >
                   {/* Neon glow effect on hover */}
-                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
-                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.neonGlow} group-hover:shadow-2xl`}></div>
+                  <div className="feature-card-glow"></div>
+                  <div className={`feature-card-shadow ${feature.color}`}></div>
                   
                   {/* Icon */}
-                  <div className={`w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.glowColor} group-hover:shadow-lg`}>
-                    <Icon className="w-5 h-5 text-white" />
+                  <div className={`feature-icon ${feature.color}`}>
+                    <Icon className="feature-icon-svg" />
                   </div>
                   
                   {/* Content */}
-                  <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
+                  <h3 className={`feature-title ${isDark ? 'dark' : 'light'}`}>
                     {feature.title}
                   </h3>
-                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 leading-relaxed font-normal`}>
+                  <p className={`feature-description ${isDark ? 'dark' : 'light'}`}>
                     {feature.description}
                   </p>
                   
                   {/* Stats and Action */}
-                  <div className="flex items-center justify-between">
-                    <span className={`text-xs font-normal ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{feature.stats}</span>
-                    <ArrowRight className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:text-blue-400/80 group-hover:translate-x-1 transition-all duration-300`} />
+                  <div className="feature-footer">
+                    <span className={`feature-stats ${isDark ? 'dark' : 'light'}`}>{feature.stats}</span>
+                    <ArrowRight className={`feature-arrow ${isDark ? 'dark' : 'light'}`} />
                   </div>
                 </div>
               );