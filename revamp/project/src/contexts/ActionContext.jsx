import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ActionContext = createContext(undefined);

export const ActionProvider = ({ children }) => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    // Load actions from localStorage on mount
    const savedActions = localStorage.getItem('recentActions');
    if (savedActions) {
      setActions(JSON.parse(savedActions));
    }
  }, []);

  useEffect(() => {
    // Save actions to localStorage whenever actions change
    localStorage.setItem('recentActions', JSON.stringify(actions));
  }, [actions]);

  const addAction = (actionData) => {
    const newAction = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...actionData
    };

    setActions(prev => {
      // Remove any existing action with the same type and page to avoid duplicates
      const filtered = prev.filter(action => 
        !(action.type === actionData.type && action.page === actionData.page)
      );
      // Add new action at the beginning and keep only last 10 actions
      return [newAction, ...filtered].slice(0, 10);
    });

    return newAction.id;
  };

  const updateAction = (actionId, updates) => {
    setActions(prev => 
      prev.map(action => 
        action.id === actionId 
          ? { ...action, ...updates, timestamp: new Date().toISOString() }
          : action
      )
    );
  };

  const getAction = (actionId) => {
    return actions.find(action => action.id === actionId);
  };

  const clearActions = () => {
    setActions([]);
    localStorage.removeItem('recentActions');
  };

  return (
    <ActionContext.Provider value={{ 
      actions, 
      addAction, 
      updateAction, 
      getAction, 
      clearActions 
    }}>
      {children}
    </ActionContext.Provider>
  );
};

export const useActions = () => {
  const context = useContext(ActionContext);
  if (context === undefined) {
    throw new Error('useActions must be used within an ActionProvider');
  }
  return context;
};