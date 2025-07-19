import React, { useState } from 'react';
import { Shuffle, Download, Upload, FileText, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/DataMappingPage.css';

const DataMappingPage = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('schema-to-mapping');
  
  // Schema to Mapping states
  const [selectedSchema, setSelectedSchema] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Mapping to Schema states
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewSchema, setPreviewSchema] = useState('');
  const [errorSchema, setErrorSchema] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [showSchemaPreview, setShowSchemaPreview] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // State persistence
  React.useEffect(() => {
    const savedState = localStorage.getItem('dataMappingState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setActiveTab(state.activeTab || 'schema-to-mapping');
      setSelectedSchema(state.selectedSchema || '');
      setIsSubmitted(state.isSubmitted || false);
      setPreviewSchema(state.previewSchema || '');
      setErrorSchema(state.errorSchema || '');
      setSelectedSchemas(state.selectedSchemas || []);
      setShowSchemaPreview(state.showSchemaPreview || false);
      setShowErrors(state.showErrors || false);
    }
  }, []);

  React.useEffect(() => {
    const state = {
      activeTab,
      selectedSchema,
      isSubmitted,
      previewSchema,
      errorSchema,
      selectedSchemas,
      showSchemaPreview,
      showErrors
    };
    localStorage.setItem('dataMappingState', JSON.stringify(state));
  }, [activeTab, selectedSchema, isSubmitted, previewSchema, errorSchema, selectedSchemas, showSchemaPreview, showErrors]);

  // Mock data
  const schemas = [
    { id: 'customer', name: 'Customer Profile Schema' },
    { id: 'product', name: 'Product Catalog Schema' },
    { id: 'order', name: 'Order Transaction Schema' },
    { id: 'user', name: 'User Behavior Schema' },
    { id: 'inventory', name: 'Inventory Management Schema' },
    { id: 'payment', name: 'Payment Processing Schema' }
  ];

  const mockSchemaJson = {
    customer: {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "customer_id": { "type": "string", "description": "Unique customer identifier" },
        "first_name": { "type": "string", "description": "Customer first name" },
        "last_name": { "type": "string", "description": "Customer last name" },
        "email": { "type": "string", "format": "email", "description": "Customer email address" },
        "phone": { "type": "string", "description": "Customer phone number" },
        "address": {
          "type": "object",
          "properties": {
            "street": { "type": "string" },
            "city": { "type": "string" },
            "state": { "type": "string" },
            "zip_code": { "type": "string" }
          }
        }
      },
      "required": ["customer_id", "email"]
    },
    product: {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "product_id": { "type": "string", "description": "Unique product identifier" },
        "name": { "type": "string", "description": "Product name" },
        "category": { "type": "string", "description": "Product category" },
        "price": { "type": "number", "minimum": 0, "description": "Product price" },
        "description": { "type": "string", "description": "Product description" }
      },
      "required": ["product_id", "name", "price"]
    }
  };

  const mockErrors = {
    customer: [
      { field: "email", error: "Invalid email format in row 15", severity: "error" },
      { field: "phone", error: "Missing phone number in row 23", severity: "warning" },
      { field: "customer_id", error: "Duplicate customer ID found", severity: "error" }
    ],
    product: [
      { field: "price", error: "Negative price value in row 8", severity: "error" },
      { field: "category", error: "Unknown category 'electronics'", severity: "warning" }
    ]
  };

  const handleSchemaSubmit = () => {
    if (selectedSchema) {
      setIsSubmitted(true);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSchemaPreview = () => {
    if (previewSchema) {
      setShowSchemaPreview(true);
    }
  };

  const handleErrorPreview = () => {
    if (errorSchema) {
      setShowErrors(true);
    }
  };

  const handleSchemaToggle = (schemaId) => {
    setSelectedSchemas(prev => 
      prev.includes(schemaId) 
        ? prev.filter(id => id !== schemaId)
        : [...prev, schemaId]
    );
  };

  const downloadDataFile = () => {
    // Simulate file download
    const blob = new Blob(['Sample mapping data file content'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSchema}_mapping_data.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadSampleFile = () => {
    const sampleContent = `{
  "mappings": [
    {
      "source_field": "customer_name",
      "target_field": "first_name",
      "transformation": "split_first_name"
    },
    {
      "source_field": "customer_email",
      "target_field": "email",
      "transformation": "lowercase"
    }
  ]
}`;
    const blob = new Blob([sampleContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_mapping_file.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setActiveTab('schema-to-mapping');
    setSelectedSchema('');
    setIsSubmitted(false);
    setUploadedFile(null);
    setPreviewSchema('');
    setErrorSchema('');
    setSelectedSchemas([]);
    setShowSchemaPreview(false);
    setShowErrors(false);
    localStorage.removeItem('dataMappingState');
  };

  return (
    <div className={`mapping-container ${isDark ? 'dark' : 'light'}`}>
      {/* Background Effects */}
      <div className="background-effects">
        <div className={`bg-orb bg-orb-1 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #f97316, #ea580c)' }}></div>
        <div className={`bg-orb bg-orb-2 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #3b82f6, #1d4ed8)' }}></div>
        <div className={`bg-orb bg-orb-3 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #8b5cf6, #7c3aed)' }}></div>
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
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`page-title ${isDark ? 'dark' : 'light'}`}>
                Data Mapping
              </h1>
              <p className={`page-subtitle ${isDark ? 'dark' : 'light'}`}>
                Intelligent schema mapping with automated detection
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              onClick={() => setActiveTab('schema-to-mapping')}
              className={`tab-button ${
                activeTab === 'schema-to-mapping'
                  ? 'active'
                  : `inactive ${isDark ? 'dark' : 'light'}`
              }`}
            >
              Schema To Mapping
            </button>
            <button
              onClick={() => setActiveTab('mapping-to-schema')}
              className={`tab-button ${
                activeTab === 'mapping-to-schema'
                  ? 'active'
                  : `inactive ${isDark ? 'dark' : 'light'}`
              }`}
            >
              Mapping To Schema
            </button>
          </div>
        </div>

        {/* Schema To Mapping Tab */}
        {activeTab === 'schema-to-mapping' && (
          <div className="content-section">
            <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
              <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Schema Selection</h3>
              
              <div className="form-group">
                <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                  Select Schema
                </label>
                <select
                  value={selectedSchema}
                  onChange={(e) => setSelectedSchema(e.target.value)}
                  className={`form-select ${isDark ? 'dark' : 'light'}`}
                >
                  <option value="">Choose a schema...</option>
                  {schemas.map(schema => (
                    <option key={schema.id} value={schema.id}>{schema.name}</option>
                  ))}
                </select>
              </div>

              <div className="button-group">
                <button
                  onClick={handleSchemaSubmit}
                  disabled={!selectedSchema}
                  className="primary-button"
                >
                  Submit
                </button>
              </div>

              {isSubmitted && selectedSchema && (
                <div className={`download-section ${isDark ? 'dark' : 'light'}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className={`${isDark ? 'text-green-400' : 'text-green-600'} font-medium`}>
                      Schema processed successfully!
                    </span>
                  </div>
                  <button
                    onClick={downloadDataFile}
                    className="download-button"
                  >
                    <Download className="w-4 h-4" />
                    <span>DATA file Available, Download here</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mapping To Schema Tab */}
        {activeTab === 'mapping-to-schema' && (
          <div className="content-section">
            {/* File Upload Section */}
            <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
              <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>File Upload</h3>
              
              <div className="form-group">
                <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                  Choose Mapping File
                </label>
                <div className={`file-upload-area ${isDark ? 'dark' : 'light'}`}>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".json,.csv,.txt"
                    className="file-input"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className={`file-upload-label ${isDark ? 'dark' : 'light'}`}>
                    <Upload className="w-6 h-6 mb-2" />
                    <span>Click to upload or drag and drop</span>
                    <span className="text-sm opacity-75">JSON, CSV, TXT files supported</span>
                  </label>
                </div>
                
                {uploadedFile && (
                  <div className={`uploaded-file ${isDark ? 'dark' : 'light'}`}>
                    <FileText className="w-4 h-4" />
                    <span>{uploadedFile.name}</span>
                  </div>
                )}
              </div>

              <div className="button-group">
                <button
                  disabled={!uploadedFile}
                  className="validate-button"
                >
                  Validate
                </button>
                <button
                  onClick={downloadSampleFile}
                  className="sample-button"
                >
                  <Download className="w-4 h-4" />
                  <span>Sample Mapping File</span>
                </button>
              </div>
            </div>

            {/* Schema Preview Section */}
            <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
              <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Schema Preview</h3>
              
              <div className="form-group">
                <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                  Select Schema to Preview
                </label>
                <select
                  value={previewSchema}
                  onChange={(e) => setPreviewSchema(e.target.value)}
                  className={`form-select ${isDark ? 'dark' : 'light'}`}
                >
                  <option value="">Choose schema for preview...</option>
                  {schemas.map(schema => (
                    <option key={schema.id} value={schema.id}>{schema.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSchemaPreview}
                disabled={!previewSchema}
                className="preview-button"
              >
                Preview Schema
              </button>

              {showSchemaPreview && previewSchema && (
                <div className={`schema-preview ${isDark ? 'dark' : 'light'}`}>
                  <h4 className={`preview-title ${isDark ? 'dark' : 'light'}`}>
                    {schemas.find(s => s.id === previewSchema)?.name} JSON Schema
                  </h4>
                  <div className={`json-display ${isDark ? 'dark' : 'light'}`}>
                    <pre className={`json-text ${isDark ? 'dark' : 'light'}`}>
                      {JSON.stringify(mockSchemaJson[previewSchema] || {}, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Error Preview Section */}
            <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
              <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Error Preview</h3>
              
              <div className="form-group">
                <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                  Select Schema to Preview Errors
                </label>
                <select
                  value={errorSchema}
                  onChange={(e) => setErrorSchema(e.target.value)}
                  className={`form-select ${isDark ? 'dark' : 'light'}`}
                >
                  <option value="">Choose schema for error preview...</option>
                  {schemas.map(schema => (
                    <option key={schema.id} value={schema.id}>{schema.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleErrorPreview}
                disabled={!errorSchema}
                className="error-preview-button"
              >
                Preview Errors
              </button>

              {showErrors && errorSchema && (
                <div className={`error-preview ${isDark ? 'dark' : 'light'}`}>
                  <h4 className={`preview-title ${isDark ? 'dark' : 'light'}`}>
                    Validation Errors for {schemas.find(s => s.id === errorSchema)?.name}
                  </h4>
                  <div className="error-list">
                    {(mockErrors[errorSchema] || []).map((error, index) => (
                      <div key={index} className={`error-item ${error.severity} ${isDark ? 'dark' : 'light'}`}>
                        <AlertCircle className="w-4 h-4" />
                        <div>
                          <span className="error-field">{error.field}:</span>
                          <span className="error-message">{error.error}</span>
                        </div>
                        <span className={`error-severity ${error.severity}`}>{error.severity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Schema Generation Section */}
            <div className={`section-card ${isDark ? 'dark' : 'light'}`}>
              <h3 className={`section-title ${isDark ? 'dark' : 'light'}`}>Schema Generation</h3>
              
              <div className="form-group">
                <label className={`form-label ${isDark ? 'dark' : 'light'}`}>
                  Select Schemas to Generate
                </label>
                <div className={`multiselect-dropdown ${isDark ? 'dark' : 'light'}`}>
                  {schemas.map(schema => (
                    <div key={schema.id} className="multiselect-item">
                      <div
                        onClick={() => handleSchemaToggle(schema.id)}
                        className={`multiselect-checkbox ${
                          selectedSchemas.includes(schema.id)
                            ? 'checked'
                            : `unchecked ${isDark ? 'dark' : 'light'}`
                        }`}
                      >
                        {selectedSchemas.includes(schema.id) && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`multiselect-label ${isDark ? 'dark' : 'light'}`}>{schema.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                disabled={selectedSchemas.length === 0}
                className="generate-button"
              >
                Generate Selected Schemas
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataMappingPage;