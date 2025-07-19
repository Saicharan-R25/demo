import React, { useState } from 'react';
import { Shield, Search, BarChart3, PieChart, Edit3, Play, Undo, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
// import { useActions } from '../../contexts/ActionContext';
import '../../styles/DataValidationPage.css';

const DataValidationPage = () => {
  const { isDark } = useTheme();
  // const { addAction, updateAction, getAction } = useActions();
  const [activeTab, setActiveTab] = useState('standard');
  // const [currentActionId, setCurrentActionId] = useState(null);
  
  // Standard validation states
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [validationType, setValidationType] = useState('profiling');
  const [showResults, setShowResults] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [qualityCategories, setQualityCategories] = useState([]);
  const [barChartAttribute, setBarChartAttribute] = useState('');
  const [pieChartAttribute, setPieChartAttribute] = useState('');
  
  // Custom validation states
  const [customDataset, setCustomDataset] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [editedSQL, setEditedSQL] = useState('');
  const [isEditingSQL, setIsEditingSQL] = useState(false);
  const [showCustomResults, setShowCustomResults] = useState(false);
  const [llmReport, setLlmReport] = useState('');

  // State persistence
  React.useEffect(() => {
    // Load saved state
    const savedState = localStorage.getItem('dataValidationState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setActiveTab(state.activeTab || 'standard');
      setSelectedDataset(state.selectedDataset || '');
      setSelectedBatches(state.selectedBatches || []);
      setValidationType(state.validationType || 'profiling');
      setSelectedAttributes(state.selectedAttributes || []);
      setQualityCategories(state.qualityCategories || []);
      setCustomDataset(state.customDataset || '');
      setCustomPrompt(state.customPrompt || '');
      setShowResults(state.showResults || false);
      setShowCustomResults(state.showCustomResults || false);
      setBarChartAttribute(state.barChartAttribute || '');
      setPieChartAttribute(state.pieChartAttribute || '');
      setGeneratedSQL(state.generatedSQL || '');
      setEditedSQL(state.editedSQL || '');
      setIsEditingSQL(state.isEditingSQL || false);
      setLlmReport(state.llmReport || '');
    }
  }, []);

  // Save state changes
  React.useEffect(() => {
    const state = {
      activeTab,
      selectedDataset,
      selectedBatches,
      validationType,
      selectedAttributes,
      qualityCategories,
      customDataset,
      customPrompt,
      showResults,
      showCustomResults,
      barChartAttribute,
      pieChartAttribute,
      generatedSQL,
      editedSQL,
      isEditingSQL,
      llmReport
    };
    localStorage.setItem('dataValidationState', JSON.stringify(state));
  }, [activeTab, selectedDataset, selectedBatches, validationType, selectedAttributes, 
      qualityCategories, customDataset, customPrompt, showResults, showCustomResults,
      barChartAttribute, pieChartAttribute, generatedSQL, editedSQL, isEditingSQL, llmReport]);

  // Restore state from recent action if available
  // React.useEffect(() => {
  //   const restoreActionId = sessionStorage.getItem('restoreActionId');
  //   if (restoreActionId) {
  //     const action = getAction(restoreActionId);
  //     if (action && action.page === 'validation') {
  //       // Restore state from action
  //       if (action.data) {
  //         setActiveTab(action.data.activeTab || 'standard');
  //         setSelectedDataset(action.data.selectedDataset || '');
  //         setSelectedBatches(action.data.selectedBatches || []);
  //         setValidationType(action.data.validationType || 'profiling');
  //         setSelectedAttributes(action.data.selectedAttributes || []);
  //         setQualityCategories(action.data.qualityCategories || []);
  //         setCustomDataset(action.data.customDataset || '');
  //         setCustomPrompt(action.data.customPrompt || '');
  //         setShowResults(action.data.showResults || false);
  //         setShowCustomResults(action.data.showCustomResults || false);
  //       }
  //       setCurrentActionId(restoreActionId);
  //     }
  //     // Clear the restore flag
  //     sessionStorage.removeItem('restoreActionId');
  //   }
  // }, [getAction]);

  // Track state changes and update action
  // React.useEffect(() => {
  //   if (selectedDataset || selectedBatches.length > 0 || customDataset || customPrompt) {
  //     const actionData = {
  //       type: 'validation_progress',
  //       page: 'validation',
  //       title: activeTab === 'standard' ? 'Data Validation Setup' : 'Custom Validation Setup',
  //       description: activeTab === 'standard' 
  //         ? `Configuring validation for ${selectedDataset || 'dataset'} with ${selectedBatches.length} batches`
  //         : `Setting up custom validation for ${customDataset || 'dataset'}`,
  //       status: (showResults || showCustomResults) ? 'completed' : 'in-progress',
  //       data: {
  //         activeTab,
  //         selectedDataset,
  //         selectedBatches,
  //         validationType,
  //         selectedAttributes,
  //         qualityCategories,
  //         customDataset,
  //         customPrompt,
  //         showResults,
  //         showCustomResults
  //       }
  //     };

  //     if (currentActionId) {
  //       updateAction(currentActionId, actionData);
  //     } else {
  //       const newActionId = addAction(actionData);
  //       setCurrentActionId(newActionId);
  //     }
  //   }
  // }, [selectedDataset, selectedBatches, validationType, selectedAttributes, qualityCategories, 
  //     customDataset, customPrompt, showResults, showCustomResults, activeTab, currentActionId, addAction, updateAction]);
  // Mock data
  const datasets = [
    { id: 'customer_data', name: 'Customer Data' },
    { id: 'product_catalog', name: 'Product Catalog' },
    { id: 'order_transactions', name: 'Order Transactions' },
    { id: 'user_behavior', name: 'User Behavior' }
  ];

  const batchIds = [
    { id: 'batch_001', name: 'Batch 001 - Jan 2024' },
    { id: 'batch_002', name: 'Batch 002 - Feb 2024' },
    { id: 'batch_003', name: 'Batch 003 - Mar 2024' },
    { id: 'batch_004', name: 'Batch 004 - Apr 2024' }
  ];

  const datasetMetadata = {
    customer_data: [
      { attribute_name: 'customer_id', display_name: 'Customer ID', description: 'Unique customer identifier', column_path: 'customer.id', data_type: 'string' },
      { attribute_name: 'first_name', display_name: 'First Name', description: 'Customer first name', column_path: 'customer.firstName', data_type: 'string' },
      { attribute_name: 'last_name', display_name: 'Last Name', description: 'Customer last name', column_path: 'customer.lastName', data_type: 'string' },
      { attribute_name: 'email', display_name: 'Email Address', description: 'Customer email address', column_path: 'customer.email', data_type: 'email' },
      { attribute_name: 'phone', display_name: 'Phone Number', description: 'Customer phone number', column_path: 'customer.phone', data_type: 'phone' },
      { attribute_name: 'age', display_name: 'Age', description: 'Customer age', column_path: 'customer.age', data_type: 'integer' },
      { attribute_name: 'registration_date', display_name: 'Registration Date', description: 'Account registration date', column_path: 'customer.registrationDate', data_type: 'datetime' },
      { attribute_name: 'address', display_name: 'Address', description: 'Customer street address', column_path: 'customer.address.street', data_type: 'string' },
      { attribute_name: 'city', display_name: 'City', description: 'Customer city', column_path: 'customer.address.city', data_type: 'string' },
      { attribute_name: 'state', display_name: 'State', description: 'Customer state/province', column_path: 'customer.address.state', data_type: 'string' },
      { attribute_name: 'postal_code', display_name: 'Postal Code', description: 'Customer postal/zip code', column_path: 'customer.address.postalCode', data_type: 'string' },
      { attribute_name: 'country', display_name: 'Country', description: 'Customer country', column_path: 'customer.address.country', data_type: 'string' },
      { attribute_name: 'date_of_birth', display_name: 'Date of Birth', description: 'Customer birth date', column_path: 'customer.dateOfBirth', data_type: 'date' },
      { attribute_name: 'gender', display_name: 'Gender', description: 'Customer gender', column_path: 'customer.gender', data_type: 'string' },
      { attribute_name: 'marital_status', display_name: 'Marital Status', description: 'Customer marital status', column_path: 'customer.maritalStatus', data_type: 'string' },
      { attribute_name: 'income', display_name: 'Annual Income', description: 'Customer annual income', column_path: 'customer.income', data_type: 'decimal' },
      { attribute_name: 'occupation', display_name: 'Occupation', description: 'Customer job title', column_path: 'customer.occupation', data_type: 'string' },
      { attribute_name: 'education_level', display_name: 'Education Level', description: 'Customer education level', column_path: 'customer.educationLevel', data_type: 'string' },
      { attribute_name: 'preferred_language', display_name: 'Preferred Language', description: 'Customer preferred language', column_path: 'customer.preferredLanguage', data_type: 'string' },
      { attribute_name: 'loyalty_tier', display_name: 'Loyalty Tier', description: 'Customer loyalty program tier', column_path: 'customer.loyaltyTier', data_type: 'string' }
    ],
    product_catalog: [
      { attribute_name: 'product_id', display_name: 'Product ID', description: 'Unique product identifier', column_path: 'product.id', data_type: 'string' },
      { attribute_name: 'product_name', display_name: 'Product Name', description: 'Product display name', column_path: 'product.name', data_type: 'string' },
      { attribute_name: 'category', display_name: 'Category', description: 'Product category', column_path: 'product.category', data_type: 'string' },
      { attribute_name: 'subcategory', display_name: 'Subcategory', description: 'Product subcategory', column_path: 'product.subcategory', data_type: 'string' },
      { attribute_name: 'brand', display_name: 'Brand', description: 'Product brand name', column_path: 'product.brand', data_type: 'string' },
      { attribute_name: 'price', display_name: 'Price', description: 'Product price', column_path: 'product.price', data_type: 'decimal' },
      { attribute_name: 'cost', display_name: 'Cost', description: 'Product cost', column_path: 'product.cost', data_type: 'decimal' },
      { attribute_name: 'description', display_name: 'Description', description: 'Product description', column_path: 'product.description', data_type: 'text' },
      { attribute_name: 'sku', display_name: 'SKU', description: 'Stock keeping unit', column_path: 'product.sku', data_type: 'string' },
      { attribute_name: 'weight', display_name: 'Weight', description: 'Product weight', column_path: 'product.weight', data_type: 'decimal' },
      { attribute_name: 'dimensions', display_name: 'Dimensions', description: 'Product dimensions', column_path: 'product.dimensions', data_type: 'string' },
      { attribute_name: 'color', display_name: 'Color', description: 'Product color', column_path: 'product.color', data_type: 'string' },
      { attribute_name: 'size', display_name: 'Size', description: 'Product size', column_path: 'product.size', data_type: 'string' },
      { attribute_name: 'material', display_name: 'Material', description: 'Product material', column_path: 'product.material', data_type: 'string' },
      { attribute_name: 'stock_quantity', display_name: 'Stock Quantity', description: 'Available stock quantity', column_path: 'product.stockQuantity', data_type: 'integer' },
      { attribute_name: 'reorder_level', display_name: 'Reorder Level', description: 'Minimum stock level', column_path: 'product.reorderLevel', data_type: 'integer' },
      { attribute_name: 'supplier_id', display_name: 'Supplier ID', description: 'Product supplier identifier', column_path: 'product.supplierId', data_type: 'string' },
      { attribute_name: 'created_date', display_name: 'Created Date', description: 'Product creation date', column_path: 'product.createdDate', data_type: 'datetime' },
      { attribute_name: 'last_updated', display_name: 'Last Updated', description: 'Last update timestamp', column_path: 'product.lastUpdated', data_type: 'datetime' },
      { attribute_name: 'status', display_name: 'Status', description: 'Product status', column_path: 'product.status', data_type: 'string' }
    ],
    order_transactions: [
      { attribute_name: 'order_id', display_name: 'Order ID', description: 'Unique order identifier', column_path: 'order.id', data_type: 'string' },
      { attribute_name: 'customer_id', display_name: 'Customer ID', description: 'Customer identifier', column_path: 'order.customerId', data_type: 'string' },
      { attribute_name: 'order_date', display_name: 'Order Date', description: 'Order placement date', column_path: 'order.orderDate', data_type: 'datetime' },
      { attribute_name: 'order_status', display_name: 'Order Status', description: 'Current order status', column_path: 'order.status', data_type: 'string' },
      { attribute_name: 'total_amount', display_name: 'Total Amount', description: 'Order total amount', column_path: 'order.totalAmount', data_type: 'decimal' },
      { attribute_name: 'subtotal', display_name: 'Subtotal', description: 'Order subtotal', column_path: 'order.subtotal', data_type: 'decimal' },
      { attribute_name: 'tax_amount', display_name: 'Tax Amount', description: 'Tax amount', column_path: 'order.taxAmount', data_type: 'decimal' },
      { attribute_name: 'shipping_cost', display_name: 'Shipping Cost', description: 'Shipping cost', column_path: 'order.shippingCost', data_type: 'decimal' },
      { attribute_name: 'discount_amount', display_name: 'Discount Amount', description: 'Applied discount amount', column_path: 'order.discountAmount', data_type: 'decimal' },
      { attribute_name: 'payment_method', display_name: 'Payment Method', description: 'Payment method used', column_path: 'order.paymentMethod', data_type: 'string' },
      { attribute_name: 'shipping_address', display_name: 'Shipping Address', description: 'Shipping address', column_path: 'order.shippingAddress', data_type: 'text' },
      { attribute_name: 'billing_address', display_name: 'Billing Address', description: 'Billing address', column_path: 'order.billingAddress', data_type: 'text' },
      { attribute_name: 'delivery_date', display_name: 'Delivery Date', description: 'Expected delivery date', column_path: 'order.deliveryDate', data_type: 'date' },
      { attribute_name: 'tracking_number', display_name: 'Tracking Number', description: 'Shipment tracking number', column_path: 'order.trackingNumber', data_type: 'string' },
      { attribute_name: 'currency', display_name: 'Currency', description: 'Order currency', column_path: 'order.currency', data_type: 'string' }
    ],
    user_behavior: [
      { attribute_name: 'session_id', display_name: 'Session ID', description: 'User session identifier', column_path: 'session.id', data_type: 'string' },
      { attribute_name: 'user_id', display_name: 'User ID', description: 'User identifier', column_path: 'session.userId', data_type: 'string' },
      { attribute_name: 'session_start', display_name: 'Session Start', description: 'Session start time', column_path: 'session.startTime', data_type: 'datetime' },
      { attribute_name: 'session_end', display_name: 'Session End', description: 'Session end time', column_path: 'session.endTime', data_type: 'datetime' },
      { attribute_name: 'page_views', display_name: 'Page Views', description: 'Number of page views', column_path: 'session.pageViews', data_type: 'integer' },
      { attribute_name: 'bounce_rate', display_name: 'Bounce Rate', description: 'Session bounce rate', column_path: 'session.bounceRate', data_type: 'decimal' },
      { attribute_name: 'device_type', display_name: 'Device Type', description: 'Device type used', column_path: 'session.deviceType', data_type: 'string' },
      { attribute_name: 'browser', display_name: 'Browser', description: 'Browser used', column_path: 'session.browser', data_type: 'string' },
      { attribute_name: 'operating_system', display_name: 'Operating System', description: 'Operating system', column_path: 'session.operatingSystem', data_type: 'string' },
      { attribute_name: 'referrer_url', display_name: 'Referrer URL', description: 'Referrer URL', column_path: 'session.referrerUrl', data_type: 'string' },
      { attribute_name: 'landing_page', display_name: 'Landing Page', description: 'Landing page URL', column_path: 'session.landingPage', data_type: 'string' },
      { attribute_name: 'exit_page', display_name: 'Exit Page', description: 'Exit page URL', column_path: 'session.exitPage', data_type: 'string' },
      { attribute_name: 'time_on_site', display_name: 'Time on Site', description: 'Total time spent on site', column_path: 'session.timeOnSite', data_type: 'integer' },
      { attribute_name: 'conversion_flag', display_name: 'Conversion Flag', description: 'Whether conversion occurred', column_path: 'session.conversionFlag', data_type: 'boolean' },
      { attribute_name: 'ip_address', display_name: 'IP Address', description: 'User IP address', column_path: 'session.ipAddress', data_type: 'string' },
      { attribute_name: 'geolocation', display_name: 'Geolocation', description: 'User geographic location', column_path: 'session.geolocation', data_type: 'string' }
    ]
  };

  const qualityParameters = [
    'Completeness', 'Accuracy', 'Consistency', 'Validity', 'Uniqueness', 'Timeliness'
  ];

  const handleBatchToggle = (batchId) => {
    setSelectedBatches(prev => 
      prev.includes(batchId) 
        ? prev.filter(id => id !== batchId)
        : [...prev, batchId]
    );
  };

  const handleAttributeToggle = (attribute) => {
    setSelectedAttributes(prev => 
      prev.includes(attribute) 
        ? prev.filter(attr => attr !== attribute)
        : [...prev, attribute]
    );
  };

  const handleQualityToggle = (category) => {
    setQualityCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const handleStandardSubmit = () => {
    setShowResults(true);
    // // Update action status to completed
    // if (currentActionId) {
    //   updateAction(currentActionId, {
    //     status: 'completed',
    //     title: 'Data Validation Completed',
    //     description: `Validated ${selectedDataset} dataset with ${validationType} analysis`
    //   });
    // }
  };

  const handleCustomSubmit = () => {
    // Generate mock SQL
    const mockSQL = `SELECT 
  customer_id,
  first_name,
  last_name,
  email,
  CASE 
    WHEN email IS NULL OR email = '' THEN 'Invalid'
    WHEN email NOT LIKE '%@%' THEN 'Invalid'
    ELSE 'Valid'
  END as email_validation
FROM customer_data
WHERE registration_date >= '2024-01-01'
  AND (email IS NULL OR email = '' OR email NOT LIKE '%@%')
ORDER BY registration_date DESC;`;

    setGeneratedSQL(mockSQL);
    setEditedSQL(mockSQL);
    setShowCustomResults(true);
    
    // Mock LLM report
    setLlmReport(`Data Validation Report:

Found 156 records with invalid email addresses out of 10,000 total records (1.56% error rate).

Issues identified:
- 89 records with null email values
- 45 records with empty string emails  
- 22 records with malformed email addresses (missing @ symbol)

Recommendations:
1. Implement email validation at data entry point
2. Set up automated data quality checks
3. Consider data cleansing for existing invalid records`);

    // // Update action status to completed
    // if (currentActionId) {
    //   updateAction(currentActionId, {
    //     status: 'completed',
    //     title: 'Custom Validation Completed',
    //     description: `Generated custom validation SQL for ${customDataset}`
    //   });
    // }
  };

  const handleSQLEdit = () => {
    setIsEditingSQL(true);
  };

  const handleSQLSubmit = () => {
    setGeneratedSQL(editedSQL);
    setIsEditingSQL(false);
    // Update LLM report based on edited SQL
    setLlmReport(`Updated Data Validation Report:

Analysis completed based on your custom SQL query.

Results show improved data quality metrics after applying your custom validation rules.`);
  };

  const handleSQLUndo = () => {
    setEditedSQL(generatedSQL);
    setIsEditingSQL(false);
  };

  const handleRefresh = () => {
    // Reset all state
    setActiveTab('standard');
    setSelectedDataset('');
    setSelectedBatches([]);
    setValidationType('profiling');
    setShowResults(false);
    setSelectedAttributes([]);
    setQualityCategories([]);
    setBarChartAttribute('');
    setPieChartAttribute('');
    setCustomDataset('');
    setCustomPrompt('');
    setGeneratedSQL('');
    setEditedSQL('');
    setIsEditingSQL(false);
    setShowCustomResults(false);
    setLlmReport('');
    
    // Clear saved state
    localStorage.removeItem('dataValidationState');
  };

  return (
    <div className={`validation-container ${isDark ? 'dark' : 'light'}`}>
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
        <div className="absolute top-20 right-8 z-20">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`page-title ${isDark ? 'dark' : 'light'}`}>
                Data Validation
              </h1>
              <p className={`page-subtitle ${isDark ? 'dark' : 'light'}`}>
                Validate your data with AI-powered rules and ensure quality
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              onClick={() => setActiveTab('standard')}
              className={`tab-button ${
                activeTab === 'standard'
                  ? 'active'
                  : `inactive ${isDark ? 'dark' : 'light'}`
              }`}
            >
              Standard Data Validation
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`tab-button ${
                activeTab === 'custom'
                  ? 'active'
                  : `inactive ${isDark ? 'dark' : 'light'}`
              }`}
            >
              Custom Validation
            </button>
          </div>
        </div>

        {/* Standard Data Validation Tab */}
        {activeTab === 'standard' && (
          <div className="space-y-8">
            {/* Configuration */}
            <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Validation Configuration</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Dataset Selection */}
                <div>
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Select Dataset
                  </label>
                  <select
                    value={selectedDataset}
                    onChange={(e) => setSelectedDataset(e.target.value)}
                    className={`w-full p-3 rounded-xl border ${
                      isDark 
                        ? 'bg-black/40 border-gray-700 text-white' 
                        : 'bg-white/40 border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300`}
                  >
                    <option value="">Select dataset...</option>
                    {datasets.map(dataset => (
                      <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
                    ))}
                  </select>
                </div>

                {/* Batch IDs */}
                {selectedDataset && (
                  <div className="lg:col-span-1">
                  <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Select Batch IDs
                  </label>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-black/40 border-gray-700' : 'bg-white/40 border-gray-300'} max-h-32 overflow-y-auto`}>
                    {batchIds.map(batch => (
                      <label key={batch.id} className="flex items-center space-x-3 py-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBatches.includes(batch.id)}
                          onChange={() => handleBatchToggle(batch.id)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedBatches.includes(batch.id)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500'
                            : isDark
                              ? 'border-gray-600 hover:border-blue-400'
                              : 'border-gray-400 hover:border-blue-500'
                        }`}>
                          {selectedBatches.includes(batch.id) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{batch.name}</span>
                      </label>
                    ))}
                  </div>
                  </div>
                )}
              </div>

              {/* Validation Type */}
              <div className="mb-6">
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                  Validation Type
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="validationType"
                      value="profiling"
                      checked={validationType === 'profiling'}
                      onChange={(e) => setValidationType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      validationType === 'profiling'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500'
                        : isDark
                          ? 'border-gray-600 hover:border-blue-400'
                          : 'border-gray-400 hover:border-blue-500'
                    }`}>
                      {validationType === 'profiling' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Data Profiling</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="validationType"
                      value="quality"
                      checked={validationType === 'quality'}
                      onChange={(e) => setValidationType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      validationType === 'quality'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500'
                        : isDark
                          ? 'border-gray-600 hover:border-blue-400'
                          : 'border-gray-400 hover:border-blue-500'
                    }`}>
                      {validationType === 'quality' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Data Quality</span>
                  </label>
                </div>
              </div>

              {/* Data Quality Options */}
              {validationType === 'quality' && (
                <div className="mb-6">
                  <h4 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Quality Parameters</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {selectedDataset && datasetMetadata[selectedDataset]?.map(attr => (
                      <label key={attr.name} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAttributes.includes(attr.name)}
                          onChange={() => handleAttributeToggle(attr.name)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedAttributes.includes(attr.name)
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500'
                            : isDark
                              ? 'border-gray-600 hover:border-blue-400'
                              : 'border-gray-400 hover:border-blue-500'
                        }`}>
                          {selectedAttributes.includes(attr.name) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{attr.name}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {qualityParameters.map(param => (
                      <label key={param} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={qualityCategories.includes(param)}
                          onChange={() => handleQualityToggle(param)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          qualityCategories.includes(param)
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 border-red-500'
                            : isDark
                              ? 'border-gray-600 hover:border-red-400'
                              : 'border-gray-400 hover:border-red-500'
                        }`}>
                          {qualityCategories.includes(param) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{param}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleStandardSubmit}
                disabled={!selectedDataset || selectedBatches.length === 0}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Validation
              </button>
            </div>

            {/* Results */}
            {showResults && (
              <div className="space-y-6">
                {validationType === 'profiling' ? (
                  <>
                    {/* Dataset Metadata */}
                    <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Dataset Metadata</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                              <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Attribute</th>
                              <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Type</th>
                              <th className={`text-left py-3 px-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedDataset && datasetMetadata[selectedDataset]?.map((attr, index) => (
                              <tr key={attr.name} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                                <td className={`py-3 px-4 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{attr.name}</td>
                                <td className={`py-3 px-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                                  }`}>
                                    {attr.type}
                                  </span>
                                </td>
                                <td className={`py-3 px-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{attr.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Data Profiling Report */}
                    <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Data Profiling Report</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200'}`}>
                          <h4 className={`font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>Total Records</h4>
                          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>10,000</p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                          <h4 className={`font-medium ${isDark ? 'text-green-400' : 'text-green-600'} mb-2`}>Valid Records</h4>
                          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>9,844</p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
                          <h4 className={`font-medium ${isDark ? 'text-red-400' : 'text-red-600'} mb-2`}>Invalid Records</h4>
                          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>156</p>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard */}
                    <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Analytics Dashboard</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Bar Chart */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Bar Chart</h4>
                            <select
                              value={barChartAttribute}
                              onChange={(e) => setBarChartAttribute(e.target.value)}
                              className={`p-2 rounded-lg border ${
                                isDark 
                                  ? 'bg-black/40 border-gray-700 text-white' 
                                  : 'bg-white/40 border-gray-300 text-gray-900'
                              } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                            >
                              <option value="">Select attribute...</option>
                              {selectedDataset && datasetMetadata[selectedDataset]?.map(attr => (
                                <option key={attr.name} value={attr.name}>{attr.name}</option>
                              ))}
                            </select>
                          </div>
                          {barChartAttribute ? (
                            <div className={`h-64 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} p-4 flex flex-col justify-end`}>
                              <div className="flex items-end justify-around h-full space-x-2">
                                <div className="flex flex-col items-center">
                                  <div className="bg-blue-500 w-8 rounded-t" style={{height: '60%'}}></div>
                                  <span className={`text-xs mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Valid</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="bg-red-500 w-8 rounded-t" style={{height: '15%'}}></div>
                                  <span className={`text-xs mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Invalid</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="bg-yellow-500 w-8 rounded-t" style={{height: '25%'}}></div>
                                  <span className={`text-xs mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Missing</span>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="bg-green-500 w-8 rounded-t" style={{height: '80%'}}></div>
                                  <span className={`text-xs mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Complete</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={`h-64 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                              <div className="text-center">
                                <BarChart3 className={`w-16 h-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-2`} />
                                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Select an attribute to view chart</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Pie Chart */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Pie Chart</h4>
                            <select
                              value={pieChartAttribute}
                              onChange={(e) => setPieChartAttribute(e.target.value)}
                              className={`p-2 rounded-lg border ${
                                isDark 
                                  ? 'bg-black/40 border-gray-700 text-white' 
                                  : 'bg-white/40 border-gray-300 text-gray-900'
                              } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                            >
                              <option value="">Select attribute...</option>
                              {selectedDataset && datasetMetadata[selectedDataset]?.map(attr => (
                                <option key={attr.name} value={attr.name}>{attr.name}</option>
                              ))}
                            </select>
                          </div>
                          {pieChartAttribute ? (
                            <div className={`h-64 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center relative`}>
                              <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="40" strokeDasharray="251.2 251.2" strokeDashoffset="62.8" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#ef4444" strokeWidth="40" strokeDasharray="62.8 251.2" strokeDashoffset="0" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#f59e0b" strokeWidth="40" strokeDasharray="37.68 251.2" strokeDashoffset="-62.8" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="40" strokeDasharray="87.92 251.2" strokeDashoffset="-100.48" />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>9,844</div>
                                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Valid</div>
                                </div>
                              </div>
                              <div className="absolute bottom-4 left-4 space-y-1">
                                <div className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Valid (75%)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Invalid (15%)</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Missing (10%)</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={`h-64 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                              <div className="text-center">
                                <PieChart className={`w-16 h-16 ${isDark ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-2`} />
                                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Select an attribute to view chart</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Data Quality Results */
                  <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Data Quality Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={`h-64 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                        <BarChart3 className={`w-16 h-16 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                      </div>
                      <div className={`h-64 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} flex items-center justify-center`}>
                        <PieChart className={`w-16 h-16 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Custom Validation Tab */}
        {activeTab === 'custom' && (
          <div className="space-y-8">
            {/* Dataset Selection and Metadata */}
            <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Dataset Selection</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Dataset Dropdown */}
                <div>
                  <select
                    value={customDataset}
                    onChange={(e) => setCustomDataset(e.target.value)}
                    className={`w-full p-3 rounded-xl border ${
                      isDark 
                        ? 'bg-black/40 border-gray-700 text-white' 
                        : 'bg-white/40 border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300`}
                  >
                    <option value="">Select dataset...</option>
                    {datasets.map(dataset => (
                      <option key={dataset.id} value={dataset.id}>{dataset.name}</option>
                    ))}
                  </select>
                </div>

                {/* Dataset Metadata - Side Panel */}
                {customDataset && (
                  <div className="lg:col-span-2">
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      Dataset Metadata
                    </label>
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-black/40 border-gray-700' : 'bg-white/40 border-gray-300'} max-h-64 overflow-y-auto`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                              <th className={`text-left py-2 px-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Attribute Name</th>
                              <th className={`text-left py-2 px-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Display Name</th>
                              <th className={`text-left py-2 px-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description</th>
                              <th className={`text-left py-2 px-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Column Path</th>
                              <th className={`text-left py-2 px-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Data Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datasetMetadata[customDataset]?.map((attr, index) => (
                              <tr key={attr.attribute_name} className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                                <td className={`py-2 px-2 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{attr.attribute_name}</td>
                                <td className={`py-2 px-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{attr.display_name}</td>
                                <td className={`py-2 px-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{attr.description}</td>
                                <td className={`py-2 px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'} font-mono text-xs`}>{attr.column_path}</td>
                                <td className={`py-2 px-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                                  }`}>
                                    {attr.data_type}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Validation Prompt */}
            {customDataset && (
              <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Custom Validation Rule</h3>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe your custom validation rule... (e.g., 'Find all customers with invalid email addresses')"
                  rows={4}
                  className={`w-full p-4 rounded-xl border ${
                    isDark 
                      ? 'bg-black/40 border-gray-700 text-white placeholder-gray-400' 
                      : 'bg-white/40 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none`}
                />
                <button
                  onClick={handleCustomSubmit}
                  disabled={!customPrompt.trim()}
                  className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Validation
                </button>
              </div>
            )}

            {/* SQL Command */}
            {showCustomResults && (
              <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Generated SQL Command</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSQLEdit}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    {isEditingSQL && (
                      <>
                        <button
                          onClick={handleSQLSubmit}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>Submit</span>
                        </button>
                        <button
                          onClick={handleSQLUndo}
                          className="px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                        >
                          <Undo className="w-4 h-4" />
                          <span>Undo</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                {isEditingSQL ? (
                  <textarea
                    value={editedSQL}
                    onChange={(e) => setEditedSQL(e.target.value)}
                    rows={12}
                    className={`w-full p-4 rounded-xl border ${
                      isDark 
                        ? 'bg-black/40 border-gray-700 text-white' 
                        : 'bg-white/40 border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none font-mono text-sm`}
                  />
                ) : (
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'} overflow-x-auto`}>
                    <pre className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} font-mono whitespace-pre-wrap`}>
                      {generatedSQL}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* LLM Report */}
            {showCustomResults && llmReport && (
              <div className={`${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-xl rounded-2xl p-6 border ${isDark ? 'border-gray-800/50' : 'border-gray-200/50'}`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Validation Report</h3>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'}`}>
                  <pre className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
                    {llmReport}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataValidationPage;