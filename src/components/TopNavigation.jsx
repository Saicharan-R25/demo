@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { ChevronDown, FileText, MessageSquare, User, Sun, Moon, LogOut } from 'lucide-react';
 import { useTheme } from '../contexts/ThemeContext';
 import { useAuth } from '../contexts/AuthContext';
+import '../styles/TopNavigation.css';
 
 const TopNavigation = () => {
   const [activeDropdown, setActiveDropdown] = useState(null);
@@ .. @@
   };

   return (
-    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
+    <nav className={`top-navigation ${
       isScrolled 
-        ? isDark 
-          ? 'bg-black/80 backdrop-blur-xl border-b border-blue-500/20 shadow-lg shadow-blue-500/10' 
-          : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-500/10'
-        : 'bg-transparent'
+        ? `scrolled ${isDark ? 'dark' : 'light'}`
+        : 'transparent'
     }`}>
-      <div className="flex items-center justify-between px-8 py-4">
+      <div className="nav-content">
         {/* Left section */}
-        <div className="flex items-center space-x-8">
-          <div className="flex items-center space-x-6">
-            <div className="relative">
+        <div className="nav-left">
+          <div className="nav-left-inner">
+            <div className="nav-dropdown-container">
               <button
                 onClick={() => toggleDropdown('org')}
-                className={`flex items-center space-x-2 transition-all duration-300 group ${
-                  isDark 
-                    ? 'text-gray-300 hover:text-blue-400' 
-                    : 'text-gray-700 hover:text-blue-600'
-                }`}
+                className={`nav-dropdown-button ${isDark ? 'dark' : 'light'}`}
               >
-                <span className="font-medium">Organization</span>
-                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
+                <span className="nav-dropdown-text">Organization</span>
+                <ChevronDown className="nav-dropdown-icon" />
               </button>
               {activeDropdown === 'org' && (
-                <div className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl py-2 animate-in slide-in-from-top-2 duration-200 ${
-                  isDark 
-                    ? 'bg-black/90 backdrop-blur-xl border border-blue-500/30' 
-                    : 'bg-white/90 backdrop-blur-xl border border-gray-200/50'
-                }`}>
-                  <a href="#" className={`block px-4 py-2 transition-all duration-200 ${
-                    isDark 
-                      ? 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400' 
-                      : 'text-gray-700 hover:bg-blue-500/10 hover:text-blue-600'
-                  }`}>Main Organization</a>
-                  <a href="#" className={`block px-4 py-2 transition-all duration-200 ${
-                    isDark 
-                      ? 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400' 
-                      : 'text-gray-700 hover:bg-blue-500/10 hover:text-blue-600'
-                  }`}>Development Team</a>
-                  <a href="#" className={`block px-4 py-2 transition-all duration-200 ${
-                    isDark 
-                      ? 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400' 
-                      : 'text-gray-700 hover:bg-blue-500/10 hover:text-blue-600'
-                  }`}>Analytics Team</a>
+                <div className={`nav-dropdown-menu ${isDark ? 'dark' : 'light'}`}>
+                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Main Organization</a>
+                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Development Team</a>
+                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Analytics Team</a>
                 </div>
               )}
             </div>
             
-            <div className="relative">
+            <div className="nav-dropdown-container">
               <button
                 onClick={() => toggleDropdown('sandbox')}
-                className={`flex items-center space-x-2 transition-all duration-300 group ${
-                  isDark 
-                    ? 'text-gray-300 hover:text-blue-400' 
-                    : 'text-gray-700 hover:text-blue-600'
-                }`}
+                className={`nav-dropdown-button ${isDark ? 'dark' : 'light'}`}
               >
-                <span className="font-medium">Sandbox</span>
-                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
+                <span className="nav-dropdown-text">Sandbox</span>
+                <ChevronDown className="nav-dropdown-icon" />
               </button>
               {activeDropdown === 'sandbox' && (
-                <div className={`absolute top-full left-0 mt-2 w-48 rounded-xl shadow-2xl py-2 animate-in slide-in-from-top-2 duration-200 ${
-                  isDark 
-                    ? 'bg-black/90 backdrop-blur-xl border border-blue-500/30' 
-                    : 'bg-white/90 backdrop-blur-xl border border-gray-200/50'
-                }`}>
-                  <a href="#" className={`block px-4 py-2 transition-all duration-200 ${
-                    isDark 
-                      ? 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400' 
-                      : 'text-gray-700 hover:bg-blue-500/10 hover:text-blue-600'
-                  }`}>Development</a>
-                  <a href="#" className={`block px-4 py-2 transition-all duration-200 ${
-                    isDark 
-                      ? 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400' 
-                      : 'text-gray-700 hover:bg-blue-500/10 hover:text-blue-600'
-                  }`}>Testing</a>
-                  <a href="#" className={`block px-4 py-2 transition-all duration-200 ${
-                    isDark 
-                      ? 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-400' 
-                      : 'text-gray-700 hover:bg-blue-500/10 hover:text-blue-600'
-                  }`}>Production</a>
+                <div className={`nav-dropdown-menu ${isDark ? 'dark' : 'light'}`}>
+                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Development</a>
+                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Testing</a>
+                  <a href="#" className={`nav-dropdown-item ${isDark ? 'dark' : 'light'}`}>Production</a>
                 </div>
               )}
             </div>
@@ -85,7 +71,7 @@ const TopNavigation = () => {
         </div>

         {/* Center - Product Name */}
-        <div className="absolute left-1/2 transform -translate-x-1/2">
-          <div className={`text-2xl font-bold ${
+        <div className="nav-center">
+          <div className={`nav-logo ${
             isDark ? 'text-white' : 'text-gray-900'
           }`}>
             OMNIS AI
@@ -93,7 +79,7 @@ const TopNavigation = () => {
         </div>

         {/* Right section */}
-        <div className="flex items-center space-x-3">
+        <div className="nav-right">
           <button 
             onClick={toggleTheme}
-            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
-              isDark 
-                ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10' 
-                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-500/10'
-            }`}
+            className={`nav-icon-button ${isDark ? 'dark' : 'light'}`}
           >
-            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
+            {isDark ? <Sun className="nav-icon" /> : <Moon className="nav-icon" />}
           </button>
           
-          <button className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
-            isDark 
-              ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10' 
-              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-500/10'
-          }`}>
-            <MessageSquare className="w-4 h-4" />
+          <button className={`nav-icon-button ${isDark ? 'dark' : 'light'}`}>
+            <MessageSquare className="nav-icon" />
           </button>
           
-          <button className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
-            isDark 
-              ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10' 
-              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-500/10'
-          }`}>
-            <FileText className="w-4 h-4" />
+          <button className={`nav-icon-button ${isDark ? 'dark' : 'light'}`}>
+            <FileText className="nav-icon" />
           </button>
           
-          <button className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
-            isDark 
-              ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10' 
-              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-500/10'
-          }`}>
-            <User className="w-4 h-4" />
+          <button className={`nav-icon-button ${isDark ? 'dark' : 'light'}`}>
+            <User className="nav-icon" />
           </button>
           
           <button 
             onClick={() => setShowLogoutDialog(true)}
-            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
-              isDark 
-                ? 'text-gray-300 hover:text-red-400 hover:bg-red-500/10' 
-                : 'text-gray-600 hover:text-red-600 hover:bg-red-500/10'
-            }`}
+            className={`nav-icon-button logout ${isDark ? 'dark' : 'light'}`}
           >
-            <LogOut className="w-4 h-4" />
+            <LogOut className="nav-icon" />
           </button>
         </div>
       </div>

       {/* Logout Confirmation Dialog */}
       {showLogoutDialog && (
-        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
-          <div className={`${isDark ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'} w-full max-w-md mx-4`}>
-            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
+        <div className="logout-dialog-overlay">
+          <div className={`logout-dialog ${isDark ? 'dark' : 'light'}`}>
+            <h3 className={`logout-dialog-title ${isDark ? 'dark' : 'light'}`}>
               Confirm Logout
             </h3>
-            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
+            <p className={`logout-dialog-text ${isDark ? 'dark' : 'light'}`}>
               Are you sure you want to logout from <span className="font-medium">{user?.email}</span>?
             </p>
-            <div className="flex gap-3">
+            <div className="logout-dialog-actions">
               <button
                 onClick={() => setShowLogoutDialog(false)}
-                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
-                  isDark 
-                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
-                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
-                }`}
+                className={`logout-dialog-cancel ${isDark ? 'dark' : 'light'}`}
               >
                 Cancel
               </button>
               <button
                 onClick={handleLogout}
-                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
+                className="logout-dialog-confirm"
               >
                 Logout
               </button>