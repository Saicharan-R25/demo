@@ .. @@
 import React, { useState } from 'react';
 import { Home, Shield, Database, Shuffle, BookOpen } from 'lucide-react';
+import '../styles/Sidebar.css';

 const Sidebar = ({ currentPage, onPageChange }) => {
@@ .. @@
   return (
     <>
       {/* Sidebar */}
-      <div 
-        className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${
-          isExpanded ? 'w-48' : 'w-auto'
-        }`}
+      <div
+        className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
         onMouseEnter={() => setIsExpanded(true)}
         onMouseLeave={() => setIsExpanded(false)}
       >
-        <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
+        <div className="sidebar-container">
           {/* Menu Items */}
-          <div className={`${isExpanded ? 'p-2' : 'p-2'} flex flex-col space-y-2`}>
+          <div className="sidebar-menu">
             {menuItems.map((item) => {
               const Icon = item.icon;
               const isActive = currentPage === item.id;
               
               return (
                 <div
                   key={item.id}
-                  className={`relative group ${isExpanded ? '' : ''}`}
+                  className="sidebar-item-container"
                   onMouseEnter={() => setHoveredItem(item.id)}
                   onMouseLeave={() => setHoveredItem(null)}
                 >
                   <button
                     onClick={() => onPageChange(item.id)}
-                    className={`relative ${isExpanded ? 'w-full flex items-center space-x-3 px-3 py-2.5' : 'p-2.5'} rounded-xl transition-all duration-300 transform hover:scale-105 ${
+                    className={`sidebar-item ${
                       isActive
-                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
-                        : 'text-gray-400 hover:text-white hover:bg-white/10'
+                        ? 'active'
+                        : 'inactive'
+                    } ${isExpanded ? 'expanded' : 'collapsed'}`}
                     }`}
                   >
-                    <Icon className={`${isExpanded ? 'w-5 h-5' : 'w-5 h-5'}`} />
+                    <Icon className="sidebar-icon" />
                     {isExpanded && (
-                      <span className="font-medium">{item.label}</span>
+                      <span className="sidebar-label">{item.label}</span>
                     )}
                     {isActive && (
-                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
+                      <div className="sidebar-item-glow"></div>
                     )}
                   </button>
                   
                   {!isExpanded && hoveredItem === item.id && (
-                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 px-3 py-2 bg-black/80 backdrop-blur-xl text-white text-sm rounded-lg whitespace-nowrap shadow-2xl border border-white/10 animate-in slide-in-from-left-2 duration-200">
+                    <div className="sidebar-tooltip">
                       {item.label}
-                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-black/80 rotate-45 border-l border-b border-white/10"></div>
+                      <div className="sidebar-tooltip-arrow"></div>
                     </div>
                   )}
                 </div>