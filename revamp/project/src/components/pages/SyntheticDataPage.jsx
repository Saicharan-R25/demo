import React, { useState } from 'react';
import { Database, Search, Download, Upload, RefreshCw, FileText, Code, Table, Settings, ChevronDown, Check, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
// import { useActions } from '../../contexts/ActionContext';
import '../../styles/SyntheticDataPage.css';

const SyntheticDataPage = () => {
  const { isDark } = useTheme();
  // const { addAction, updateAction, getAction } = useActions();
  const [activeTab, setActiveTab] = useState('general');
  // const [currentActionId, setCurrentActionId] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [comment, setComment] = useState('');
  const [recordCount, setRecordCount] = useState('1000');
  const [showPreview, setShowPreview] = useState(false);
  const [attributeComments, setAttributeComments] = useState({});
  const [primaryKeys, setPrimaryKeys] = useState([]);
  const [exampleValues, setExampleValues] = useState({});
  
  // Web Data states
  const [webSchema, setWebSchema] = useState('');
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [userCount, setUserCount] = useState('100');
  const [eventCount, setEventCount] = useState('500');
  const [dateRange, setDateRange] = useState('');
  const [outputFormat, setOutputFormat] = useState('json');
  const [showWebPreview, setShowWebPreview] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [loadDialogTab, setLoadDialogTab] = useState('select');
  const [selectedLoadDataset, setSelectedLoadDataset] = useState('');
  const [newDatasetName, setNewDatasetName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadSuccess, setLoadSuccess] = useState(false);

  // State persistence
  React.useEffect(() => {
    // Load saved state
    const savedState = localStorage.getItem('syntheticDataState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setActiveTab(state.activeTab || 'general');
      setSelectedSchema(state.selectedSchema || '');
      setSelectedAttributes(state.selectedAttributes || []);
      setRecordCount(state.recordCount || '1000');
      setComment(state.comment || '');
      setWebSchema(state.webSchema || '');
      setSelectedEvents(state.selectedEvents || []);
      setUserCount(state.userCount || '100');
      setEventCount(state.eventCount || '500');
      setOutputFormat(state.outputFormat || 'json');
      setShowPreview(state.showPreview || false);
      setShowWebPreview(state.showWebPreview || false);
      setSelectedLoadDataset(state.selectedLoadDataset || '');
      setNewDatasetName(state.newDatasetName || '');
      setAttributeComments(state.attributeComments || {});
      setPrimaryKeys(state.primaryKeys || []);
      setExampleValues(state.exampleValues || {});
    }
  }, []);

  // Save state changes
  React.useEffect(() => {
    const state = {
      activeTab,
      selectedSchema,
      selectedAttributes,
      recordCount,
      comment,
      webSchema,
      selectedEvents,
      userCount,
      eventCount,
      outputFormat,
      showPreview,
      showWebPreview,
      attributeComments,
      primaryKeys,
      exampleValues,
      selectedLoadDataset,
      newDatasetName
    };
    localStorage.setItem('syntheticDataState', JSON.stringify(state));
  }, [activeTab, selectedSchema, selectedAttributes, recordCount, comment, webSchema, 
      selectedEvents, userCount, eventCount, outputFormat, showPreview, showWebPreview,
      attributeComments, primaryKeys, exampleValues, selectedLoadDataset, newDatasetName]);

  // Restore state from recent action if available
  // React.useEffect(() => {
  //   const restoreActionId = sessionStorage.getItem('restoreActionId');
  //   if (restoreActionId) {
  //     const action = getAction(restoreActionId);
  //     if (action && action.page === 'synthetic') {
  //       // Restore state from action
  //       if (action.data) {
  //         setActiveTab(action.data.activeTab || 'general');
  //         setSelectedSchema(action.data.selectedSchema || '');
  //         setSelectedAttributes(action.data.selectedAttributes || []);
  //         setRecordCount(action.data.recordCount || '1000');
  //         setComment(action.data.comment || '');
  //         setWebSchema(action.data.webSchema || '');
  //         setSelectedEvents(action.data.selectedEvents || []);
  //         setUserCount(action.data.userCount || '100');
  //         setEventCount(action.data.eventCount || '500');
  //         setOutputFormat(action.data.outputFormat || 'json');
  //         setShowPreview(action.data.showPreview || false);
  //         setShowWebPreview(action.data.showWebPreview || false);
  //       }
  //       setCurrentActionId(restoreActionId);
  //     }
  //     // Clear the restore flag
  //     sessionStorage.removeItem('restoreActionId');
  //   }
  // }, [getAction]);

  // Track state changes and update action
  // React.useEffect(() => {
  //   if (selectedSchema || webSchema || selectedAttributes.length > 0 || selectedEvents.length > 0) {
  //     const actionData = {
  //       type: 'synthetic_progress',
  //       page: 'synthetic',
  //       title: activeTab === 'general' ? 'Synthetic Data Generation' : 'Web Data Generation',
  //       description: activeTab === 'general'
  //         ? `Generating ${recordCount} records for ${selectedSchema || 'schema'} with ${selectedAttributes.length} attributes`
  //         : `Creating web data for ${selectedEvents.length} event types with ${userCount} users`,
  //       status: (showPreview || showWebPreview) ? 'completed' : 'in-progress',
  //       data: {
  //         activeTab,
  //         selectedSchema,
  //         selectedAttributes,
  //         recordCount,
  //         comment,
  //         webSchema,
  //         selectedEvents,
  //         userCount,
  //         eventCount,
  //         outputFormat,
  //         showPreview,
  //         showWebPreview
  //       }
  //     };

  //     if (currentActionId) {
  //       updateAction(currentActionId, actionData);
  //     } else {
  //       const newActionId = addAction(actionData);
  //       setCurrentActionId(newActionId);
  //     }
  //   }
  // }, [selectedSchema, selectedAttributes, recordCount, comment, webSchema, selectedEvents, 
  //     userCount, eventCount, outputFormat, showPreview, showWebPreview, activeTab, 
  //     currentActionId, addAction, updateAction]);

  // Mock data
  const schemas = [
    { id: 'customer', name: 'Customer Profile Schema' },
    { id: 'product', name: 'Product Catalog Schema' },
    { id: 'order', name: 'Order Transaction Schema' },
    { id: 'user', name: 'User Behavior Schema' }
  ];

  const schemaAttributes = {
    customer: [
      { name: 'customer_id', description: 'Unique customer identifier', type: 'string', isPrimaryKey: true },
      { name: 'first_name', description: 'Customer first name', type: 'string', isPrimaryKey: false },
      { name: 'last_name', description: 'Customer last name', type: 'string', isPrimaryKey: false },
      { name: 'email', description: 'Customer email address', type: 'email', isPrimaryKey: false },
      { name: 'phone', description: 'Customer phone number', type: 'phone', isPrimaryKey: false },
      { name: 'birth_date', description: 'Customer birth date', type: 'date', isPrimaryKey: false },
      { name: 'address', description: 'Customer address', type: 'address', isPrimaryKey: false },
      { name: 'city', description: 'Customer city', type: 'string', isPrimaryKey: false },
      { name: 'country', description: 'Customer country', type: 'string', isPrimaryKey: false },
      { name: 'registration_date', description: 'Account registration date', type: 'datetime', isPrimaryKey: false }
    ],
    product: [
      { name: 'product_id', description: 'Unique product identifier', type: 'string', isPrimaryKey: true },
      { name: 'product_name', description: 'Product name', type: 'string', isPrimaryKey: false },
      { name: 'category', description: 'Product category', type: 'string', isPrimaryKey: false },
      { name: 'price', description: 'Product price', type: 'decimal', isPrimaryKey: false },
      { name: 'description', description: 'Product description', type: 'text', isPrimaryKey: false },
      { name: 'brand', description: 'Product brand', type: 'string', isPrimaryKey: false },
      { name: 'stock_quantity', description: 'Available stock quantity', type: 'integer', isPrimaryKey: false }
    ]
  };

  const eventTypes = [
    { id: 'page_view', name: 'Page View' },
    { id: 'click', name: 'Click Event' },
    { id: 'purchase', name: 'Purchase Event' },
    { id: 'add_to_cart', name: 'Add to Cart' },
    { id: 'form_submit', name: 'Form Submit' },
    { id: 'video_play', name: 'Video Play' },
    { id: 'download', name: 'Download Event' }
  ];

  const handleSchemaChange = (schemaId) => {
    setSelectedSchema(schemaId);
    setSelectedAttributes([]);
    setAttributeComments({});
    setPrimaryKeys([]);
    setSelectAll(false);
    setShowPreview(false);
  };

  const handleAttributeToggle = (attributeName) => {
    setSelectedAttributes(prev => 
      prev.includes(attributeName) 
        ? prev.filter(attr => attr !== attributeName)
        : [...prev, attributeName]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAttributes([]);
      setPrimaryKeys([]);
    } else {
      setSelectedAttributes(schemaAttributes[selectedSchema]?.map(attr => attr.name) || []);
      setPrimaryKeys(schemaAttributes[selectedSchema]?.filter(attr => attr.isPrimaryKey).map(attr => attr.name) || []);
    }
    setSelectAll(!selectAll);
  };

  const handleEventToggle = (eventId) => {
    setSelectedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handlePrimaryKeyToggle = (attributeName) => {
    setPrimaryKeys(prev => 
      prev.includes(attributeName) 
        ? prev.filter(attr => attr !== attributeName)
        : [...prev, attributeName]
    );
  };

  const handleCommentChange = (attributeName, comment) => {
    setAttributeComments(prev => ({
      ...prev,
      [attributeName]: comment
    }));
  };

  const generateExampleValues = () => {
    const newExampleValues = {};
    
    // Generate example values only for attributes that have comments
    filteredAttributes.filter(attr => attributeComments[attr.name]?.trim()).forEach(attr => {
      const comment = attributeComments[attr.name] || '';
      let exampleValue = '';
      
      switch (attr.type) {
        case 'string':
          if (attr.name.includes('name')) {
            exampleValue = comment.includes('first') ? 'John' : comment.includes('last') ? 'Doe' : 'Sample Name';
          } else if (attr.name.includes('city')) {
            exampleValue = 'New York';
          } else if (attr.name.includes('country')) {
            exampleValue = 'United States';
          } else {
            exampleValue = comment ? `${comment.substring(0, 20)}...` : 'Sample Text';
          }
          break;
        case 'email':
          exampleValue = 'user@example.com';
          break;
        case 'phone':
          exampleValue = '+1-555-0123';
          break;
        case 'date':
          exampleValue = '1990-01-15';
          break;
        case 'datetime':
          exampleValue = '2024-01-15T10:30:00Z';
          break;
        case 'integer':
          if (attr.name.includes('quantity')) {
            exampleValue = '100';
          } else if (attr.name.includes('age')) {
            exampleValue = '28';
          } else {
            exampleValue = '12345';
          }
          break;
        case 'decimal':
          exampleValue = attr.name.includes('price') ? '29.99' : '123.45';
          break;
        case 'text':
          exampleValue = comment ? `${comment} - detailed description here...` : 'Long text content example...';
          break;
        case 'address':
          exampleValue = '123 Main St, Suite 100';
          break;
        default:
          exampleValue = comment ? `Based on: ${comment}` : 'Generated value';
      }
      
      newExampleValues[attr.name] = exampleValue;
    });
    
    setExampleValues(newExampleValues);
  };

  const handleLoadToAEP = () => {
    setShowLoadDialog(true);
  };

  const handleLoadDialogClose = () => {
    setShowLoadDialog(false);
    setLoadDialogTab('select');
    setLoadSuccess(false);
  };

  const handleLoadSubmit = async () => {
    setIsLoading(true);
    
    // Simulate loading process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setLoadSuccess(true);
    
    // Auto close after success
    setTimeout(() => {
      handleLoadDialogClose();
    }, 1500);
  };

  const filteredAttributes = schemaAttributes[selectedSchema]?.filter(attr =>
    attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attr.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const generatePreview = () => {
    setShowPreview(true);
    // // Update action status
    // if (currentActionId) {
    //   updateAction(currentActionId, {
    //     status: 'completed',
    //     title: 'Synthetic Data Preview Generated',
    //     description: `Generated preview for ${selectedSchema} with ${selectedAttributes.length} attributes`
    //   });
    // }
  };

  const generateWebPreview = () => {
    setShowWebPreview(true);
    // // Update action status
    // if (currentActionId) {
    //   updateAction(currentActionId, {
    //     status: 'completed',
    //     title: 'Web Data Preview Generated',
    //     description: `Generated web data preview with ${selectedEvents.length} event types`
    //   });
    // }
  };

  const handleRefresh = () => {
    // Reset all state
    setActiveTab('general');
    setSelectedSchema('');
    setSelectedAttributes([]);
    setSelectAll(false);
    setSearchTerm('');
    setComment('');
    setRecordCount('1000');
    setShowPreview(false);
    setAttributeComments({});
    setPrimaryKeys([]);
    setExampleValues({});
    setWebSchema('');
    setSelectedEvents([]);
    setUserCount('100');
    setEventCount('500');
    setDateRange('');
    setOutputFormat('json');
    setShowWebPreview(false);
    
    // Clear saved state
    localStorage.removeItem('syntheticDataState');
  };

  const mockPreviewData = [
    { customer_id: 'CUST001', first_name: 'John', last_name: 'Doe', email: 'john.doe@email.com', phone: '+1-555-0123' },
    { customer_id: 'CUST002', first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@email.com', phone: '+1-555-0124' },
    { customer_id: 'CUST003', first_name: 'Mike', last_name: 'Johnson', email: 'mike.j@email.com', phone: '+1-555-0125' },
    { customer_id: 'CUST004', first_name: 'Sarah', last_name: 'Wilson', email: 'sarah.w@email.com', phone: '+1-555-0126' },
    { customer_id: 'CUST005', first_name: 'David', last_name: 'Brown', email: 'david.b@email.com', phone: '+1-555-0127' }
  ];

  const mockWebPreview = {
    "users": [
      {
        "user_id": "user_001",
        "events": [
          {
            "event_type": "page_view",
            "timestamp": "2024-01-15T10:30:00Z",
            "page_url": "/products/laptop",
            "session_id": "sess_abc123"
          },
          {
            "event_type": "click",
            "timestamp": "2024-01-15T10:31:15Z",
            "element": "add_to_cart_button",
            "product_id": "prod_456"
          }
        ]
      }
    ]
  };

  return (
    <div className={`synthetic-container ${isDark ? 'dark' : 'light'}`}>
      {/* Background Effects */}
      <div className="background-effects">
        <div className={`bg-orb bg-orb-1 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}></div>
        <div className={`bg-orb bg-orb-2 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #ef4444, #ec4899)' }}></div>
        <div className={`bg-orb bg-orb-3 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}></div>
      </div>

      <div className="main-content">
        {/* Refresh Button */}
        <div className="refresh-button-container">
          <button
            onClick={handleRefresh}
            className={`refresh-button ${isDark ? 'dark' : 'light'}`}
          >
            <RefreshCw className="refresh-icon" />
          </button>
        </div>

        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">
              <Database className="header-icon-svg" />
            </div>
            <div>
              <h1 className={`page-title ${isDark ? 'dark' : 'light'}`}>
                Synthetic Data Generation
              </h1>
              <p className={`page-subtitle ${isDark ? 'dark' : 'light'}`}>
                Generate realistic datasets with advanced AI models
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              onClick={() => setActiveTab('general')}
              className={`tab-button ${
                activeTab === 'general'
                  ? 'active'
                  : `inactive ${isDark ? 'dark' : 'light'}`
              }`}
            >
              General Data
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`tab-button ${
                activeTab === 'web'
                  ? 'active'
                  : `inactive ${isDark ? 'dark' : 'light'}`
              }`}
            >
              Web Data
            </button>
          </div>
        </div>

        {/* General Data Tab */}
        {activeTab === 'general' && (
          <div className="content-section">
            {/* Schema Selection */}
            <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
              <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Schema Selection</h3>
              <div className="form-group">
                <select
                  value={selectedSchema}
                  onChange={(e) => handleSchemaChange(e.target.value)}
                  className={`form-select ${isDark ? 'dark' : 'light'}`}
                >
                  <option value="">Select a schema...</option>
                  {schemas.map(schema => (
                    <option key={schema.id} value={schema.id}>{schema.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Attributes Table */}
            {selectedSchema && (
              <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
                <div className="attributes-header">
                  <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Schema Attributes</h3>
                  
                  <div className="attributes-controls">
                    {/* Generate Example Button */}
                    <button
                      onClick={generateExampleValues}
                      disabled={selectedAttributes.length === 0}
                      className="generate-example-button"
                    >
                      Generate Example
                    </button>
                    
                    {/* Search Box */}
                    <div className="search-container">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search attributes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`search-input ${isDark ? 'dark' : 'light'}`}
                    />
                    </div>
                  </div>
                </div>

                {/* Select All */}
                <div className="select-all-container">
                  <div
                    onClick={handleSelectAll}
                    className={`checkbox-button ${
                      selectAll
                        ? 'checked'
                        : `unchecked ${isDark ? 'dark' : 'light'}`
                    }`}
                  >
                    {selectAll && <Check className="checkbox-icon" />}
                  </div>
                  <span className={`select-all-label ${isDark ? 'dark' : 'light'}`}>Select All Attributes</span>
                </div>

                {/* Attributes Table */}
                <div className="table-container">
                  <table className="data-table">
                    <thead className={`table-header ${isDark ? 'dark' : 'light'}`}>
                      <tr>
                        <th className={`table-header-cell ${isDark ? 'dark' : 'light'}`}>Select</th>
                        <th className={`table-header-cell ${isDark ? 'dark' : 'light'}`}>Attribute</th>
                        <th className={`table-header-cell ${isDark ? 'dark' : 'light'}`}>Description</th>
                        <th className={`table-header-cell ${isDark ? 'dark' : 'light'}`}>Type</th>
                        <th className={`table-header-cell ${isDark ? 'dark' : 'light'}`}>Primary Key</th>
                        <th className={`table-header-cell ${isDark ? 'dark' : 'light'}`}>Comments</th>
                        <th className={`table-header-cell ${isDark ? 'dark' : 'light'}`}>Example Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttributes.map((attr, index) => (
                        <tr key={attr.name} className={`table-row ${isDark ? 'dark' : 'light'}`}>
                          <td className="table-cell">
                            <div
                              onClick={() => handleAttributeToggle(attr.name)}
                              className={`checkbox-button ${
                                selectedAttributes.includes(attr.name)
                                  ? 'checked'
                                  : `unchecked ${isDark ? 'dark' : 'light'}`
                              }`}
                            >
                              {selectedAttributes.includes(attr.name) && <Check className="checkbox-icon" />}
                            </div>
                          </td>
                          <td className={`table-cell table-cell-primary ${isDark ? 'dark' : 'light'}`}>{attr.name}</td>
                          <td className={`table-cell ${isDark ? 'dark' : 'light'}`}>{attr.description}</td>
                          <td className={`table-cell ${isDark ? 'dark' : 'light'}`}>
                            <span className={`type-badge ${isDark ? 'dark' : 'light'}`}>
                              {attr.type}
                            </span>
                          </td>
                          <td className="table-cell">
                            <div
                              onClick={() => handlePrimaryKeyToggle(attr.name)}
                              className={`checkbox-button ${
                                primaryKeys.includes(attr.name)
                                  ? 'checked'
                                  : `unchecked ${isDark ? 'dark' : 'light'}`
                              }`}
                            >
                              {primaryKeys.includes(attr.name) && <Check className="checkbox-icon" />}
                            </div>
                          </td>
                          <td className="table-cell">
                            <input
                              type="text"
                              value={attributeComments[attr.name] || ''}
                              onChange={(e) => handleCommentChange(attr.name, e.target.value)}
                              placeholder="Add comment..."
                              className={`comment-input ${isDark ? 'dark' : 'light'}`}
                            />
                          </td>
                          <td className={`table-cell ${isDark ? 'dark' : 'light'}`}>
                            <div className={`example-value ${
                              exampleValues[attr.name] 
                                ? `has-value ${isDark ? 'dark' : 'light'}`
                                : `no-value ${isDark ? 'dark' : 'light'}`
                            }`}>
                              {exampleValues[attr.name] || 'Click Generate Example'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* Generate Preview */}
            {selectedSchema && selectedAttributes.length > 0 && (
              <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
                <div className="preview-header">
                  <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Preview Generation</h3>
                  <button
                    onClick={generatePreview}
                    className="primary-button"
                  >
                    Generate Preview
                  </button>
                </div>

                {showPreview && (
                  <div className="preview-section">
                    <h4 className={`preview-title ${isDark ? 'dark' : 'light'}`}>Sample Data (5 rows)</h4>
                    <div className="preview-table-container">
                      <table className={`preview-table ${isDark ? 'dark' : 'light'}`}>
                        <thead className={`preview-table-header ${isDark ? 'dark' : 'light'}`}>
                          <tr>
                            {selectedAttributes.map(attr => (
                              <th key={attr} className={`preview-table-cell ${isDark ? 'dark' : 'light'}`}>
                                {attr}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {mockPreviewData.map((row, index) => (
                            <tr key={index}>
                              {selectedAttributes.map(attr => (
                                <td key={attr} className={`preview-table-cell ${isDark ? 'dark' : 'light'}`}>
                                  {row[attr] || 'N/A'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Generate Data */}
            {showPreview && (
              <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
                <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Generate Dataset</h3>
                
                <div className="form-group">
                  <div>
                    <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                      Number of Records
                    </label>
                    <input
                      type="number"
                      value={recordCount}
                      onChange={(e) => setRecordCount(e.target.value)}
                      className={`form-input ${isDark ? 'dark' : 'light'}`}
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div className="button-group full-width">
                  <button className="secondary-button">
                    <Download className="button-icon" />
                    <span>Download Data</span>
                  </button>
                  <button 
                    onClick={handleLoadToAEP}
                    className="load-aep-button"
                  >
                    <Upload className="button-icon" />
                    <span>Load to AEP</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Load to AEP Dialog */}
        {showLoadDialog && (
          <div className="dialog-overlay">
            <div className={`dialog-container ${isDark ? 'dark' : 'light'}`}>
              {!loadSuccess ? (
                <>
                  <h3 className={`dialog-title ${isDark ? 'dark' : 'light'}`}>Load to AEP</h3>
                  
                  {/* Tab Navigation */}
                  <div className="dialog-tabs">
                    <button
                      onClick={() => setLoadDialogTab('select')}
                      className={`dialog-tab ${
                        loadDialogTab === 'select'
                          ? 'active'
                          : `inactive ${isDark ? 'dark' : 'light'}`
                      }`}
                    >
                      Select Dataset
                    </button>
                    <button
                      onClick={() => setLoadDialogTab('create')}
                      className={`dialog-tab ${
                        loadDialogTab === 'create'
                          ? 'active'
                          : `inactive ${isDark ? 'dark' : 'light'}`
                      }`}
                    >
                      Create Dataset
                    </button>
                  </div>

                  {/* Tab Content */}
                  {loadDialogTab === 'select' ? (
                    <div className="dialog-content">
                      <label className={`dialog-label ${isDark ? 'dark' : 'light'}`}>
                        Select Existing Dataset
                      </label>
                      <select
                        value={selectedLoadDataset}
                        onChange={(e) => setSelectedLoadDataset(e.target.value)}
                        className={`dialog-select ${isDark ? 'dark' : 'light'}`}
                      >
                        <option value="">Choose dataset...</option>
                        <option value="customer_dataset">Customer Dataset</option>
                        <option value="product_dataset">Product Dataset</option>
                        <option value="order_dataset">Order Dataset</option>
                        <option value="user_dataset">User Dataset</option>
                      </select>
                    </div>
                  ) : (
                    <div className="dialog-content">
                      <label className={`dialog-label ${isDark ? 'dark' : 'light'}`}>
                        New Dataset Name
                      </label>
                      <input
                        type="text"
                        value={newDatasetName}
                        onChange={(e) => setNewDatasetName(e.target.value)}
                        placeholder="Enter dataset name..."
                        className={`dialog-input ${isDark ? 'dark' : 'light'}`}
                      />
                    </div>
                  )}

                  {/* Dialog Actions */}
                  <div className="dialog-actions">
                    <button
                      onClick={handleLoadDialogClose}
                      className={`dialog-cancel ${isDark ? 'dark' : 'light'}`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLoadSubmit}
                      disabled={isLoading || (loadDialogTab === 'select' && !selectedLoadDataset) || (loadDialogTab === 'create' && !newDatasetName.trim())}
                      className="dialog-confirm"
                    >
                      {isLoading ? 'Loading...' : 'Load'}
                    </button>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="success-state">
                  <div className="success-icon">
                    <Check className="success-check" />
                  </div>
                  <h3 className={`success-title ${isDark ? 'dark' : 'light'}`}>
                    Successfully Loaded!
                  </h3>
                  <p className={`success-text ${isDark ? 'dark' : 'light'}`}>
                    Data has been loaded to AEP successfully.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Web Data Tab */}
        {activeTab === 'web' && (
          <div className="content-section">
            {/* Configuration */}
            <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
              <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Web Data Configuration</h3>
              
              <div className="web-config-grid">
                {/* Schema Selection */}
                <div>
                  <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                    Schema
                  </label>
                  <select
                    value={webSchema}
                    onChange={(e) => setWebSchema(e.target.value)}
                    className={`form-select ${isDark ? 'dark' : 'light'}`}
                  >
                    <option value="">Select schema...</option>
                    {schemas.map(schema => (
                      <option key={schema.id} value={schema.id}>{schema.name}</option>
                    ))}
                  </select>
                </div>

                {/* Event Types */}
                <div>
                  <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                    Event Types
                  </label>
                  <div className={`checkbox-list ${isDark ? 'dark' : 'light'}`}>
                    {eventTypes.map(event => (
                      <div key={event.id} className="checkbox-item">
                        <div
                          onClick={() => handleEventToggle(event.id)}
                          className={`checkbox-button ${
                            selectedEvents.includes(event.id)
                              ? 'checked'
                              : `unchecked ${isDark ? 'dark' : 'light'}`
                          }`}
                        >
                          {selectedEvents.includes(event.id) && <Check className="checkbox-icon" />}
                        </div>
                        <span className={`checkbox-label ${isDark ? 'dark' : 'light'}`}>{event.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Number of Users */}
                <div>
                  <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                    Number of Users
                  </label>
                  <input
                    type="number"
                    value={userCount}
                    onChange={(e) => setUserCount(e.target.value)}
                    className={`form-input ${isDark ? 'dark' : 'light'}`}
                    placeholder="100"
                  />
                </div>

                {/* Number of Events */}
                <div>
                  <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                    Number of Events
                  </label>
                  <input
                    type="number"
                    value={eventCount}
                    onChange={(e) => setEventCount(e.target.value)}
                    className={`form-input ${isDark ? 'dark' : 'light'}`}
                    placeholder="500"
                  />
                </div>

                {/* Date Range */}
                <div>
                  <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                    Date Range
                  </label>
                  <input
                    type="date"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className={`form-input ${isDark ? 'dark' : 'light'}`}
                  />
                </div>

                {/* Output Format */}
                <div>
                  <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                    Output Format
                  </label>
                  <div className="radio-group">
                    <div className="radio-item" onClick={() => setOutputFormat('json')}>
                      <div className={`radio-button ${
                        outputFormat === 'json'
                          ? 'checked'
                          : `unchecked ${isDark ? 'dark' : 'light'}`
                      }`}>
                        {outputFormat === 'json' && <div className="radio-dot"></div>}
                      </div>
                      <span className={`radio-label ${isDark ? 'dark' : 'light'}`}>JSON</span>
                    </div>
                    <div className="radio-item" onClick={() => setOutputFormat('parquet')}>
                      <div className={`radio-button ${
                        outputFormat === 'parquet'
                          ? 'checked'
                          : `unchecked ${isDark ? 'dark' : 'light'}`
                      }`}>
                        {outputFormat === 'parquet' && <div className="radio-dot"></div>}
                      </div>
                      <span className={`radio-label ${isDark ? 'dark' : 'light'}`}>Parquet</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Preview */}
            {webSchema && selectedEvents.length > 0 && (
              <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
                <div className="preview-header">
                  <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Preview Generation</h3>
                  <button
                    onClick={generateWebPreview}
                    className="primary-button"
                  >
                    Generate Preview
                  </button>
                </div>

                {showWebPreview && (
                  <div className="preview-section">
                    <h4 className={`preview-title ${isDark ? 'dark' : 'light'}`}>Sample Web Data Structure</h4>
                    <div className={`code-block ${isDark ? 'dark' : 'light'}`}>
                      <pre className={`code-text ${isDark ? 'dark' : 'light'}`}>
                        {JSON.stringify(mockWebPreview, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Generate Schema */}
            {showWebPreview && (
              <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
                <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Generate Schema</h3>
                
                <button className="generate-schema-button">
                  <FileText className="button-icon" />
                  <span>Generate Schema</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyntheticDataPage;