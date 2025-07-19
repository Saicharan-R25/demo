import React, { useState } from 'react';
import { BookOpen, ChevronRight, Check, FileText, Download, Copy, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
// import { useActions } from '../../contexts/ActionContext';
import '../../styles/RunbookPage.css';

const RunbookPage = () => {
  const { isDark } = useTheme();
  // const { addAction, updateAction } = useActions();
  // const [currentActionId, setCurrentActionId] = useState(null);
  const [selectedSections, setSelectedSections] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  const [sectionPrompts, setSectionPrompts] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // State persistence
  React.useEffect(() => {
    // Load saved state
    const savedState = localStorage.getItem('runbookState');
    if (savedState) {
      const state = JSON.parse(savedState);
      setSelectedSections(state.selectedSections || []);
      setExpandedSections(state.expandedSections || []);
      setSectionPrompts(state.sectionPrompts || {});
      setSelectAll(state.selectAll || false);
      setGeneratedDocument(state.generatedDocument || '');
    }
  }, []);

  // Save state changes
  React.useEffect(() => {
    const state = {
      selectedSections,
      expandedSections,
      sectionPrompts,
      selectAll,
      generatedDocument
    };
    localStorage.setItem('runbookState', JSON.stringify(state));
  }, [selectedSections, expandedSections, sectionPrompts, selectAll, generatedDocument]);

  // Document sections based on the reference image
  const documentSections = [
    { id: 'overview', name: 'Overview' },
    { id: 'aep-quick-start', name: 'AEP Quick Start Guide' },
    { id: 'technical-solution', name: 'Technical Solution Details' },
    { id: 'data-model', name: 'Data Model and Schemas' },
    { id: 'main-schemas', name: 'Main Schemas' },
    { id: 'schema-setup', name: 'Schema Setup in AEP' },
    { id: 'main-datasets', name: 'Main Datasets' },
    { id: 'union-schema', name: 'Union Schema' },
    { id: 'data-ingestion', name: 'Data Ingestion into AEP' },
    { id: 'data-sync-frequency', name: 'Frequency of data sync using scheduler' },
    { id: 'troubleshooting', name: 'Troubleshooting and Validation' },
    { id: 'data-monitoring', name: 'Data Monitoring and Failure Tracking' },
    { id: 'unified-profile', name: 'Unified Profile & Segmentation' },
    { id: 'segmentation-service', name: 'Segmentation Service' },
    { id: 'query-services', name: 'Query Services' },
    { id: 'rtcdp', name: 'REAL-TIME Customer Data Platform (RTCDP)' },
    { id: 'appendix', name: 'Appendix' },
    { id: 'glossary', name: 'Glossary' }
  ];

  // Track state changes and update action
  // React.useEffect(() => {
  //   if (selectedSections.length > 0 || Object.keys(sectionPrompts).length > 0) {
  //     const actionData = {
  //       type: 'runbook_progress',
  //       page: 'runbook',
  //       title: 'Runbook Document Generation',
  //       description: `Configuring runbook with ${selectedSections.length} sections selected`,
  //       status: generatedDocument ? 'completed' : 'in-progress',
  //       data: {
  //         selectedSections,
  //         sectionPrompts,
  //         generatedDocument: !!generatedDocument
  //       }
  //     };

  //     if (currentActionId) {
  //       updateAction(currentActionId, actionData);
  //     } else {
  //       const newActionId = addAction(actionData);
  //       setCurrentActionId(newActionId);
  //     }
  //   }
  // }, [selectedSections, sectionPrompts, generatedDocument, currentActionId, addAction, updateAction]);

  const handleSectionToggle = (sectionId) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSectionExpand = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSections([]);
    } else {
      setSelectedSections(documentSections.map(section => section.id));
    }
    setSelectAll(!selectAll);
  };

  const handlePromptChange = (sectionId, prompt) => {
    setSectionPrompts(prev => ({
      ...prev,
      [sectionId]: prompt
    }));
  };

  const generateDocument = async () => {
    setIsGenerating(true);
    
    // Simulate document generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockDocument = `# Runbook Document Generator

## Generated Sections: ${selectedSections.length}

${selectedSections.map(sectionId => {
  const section = documentSections.find(s => s.id === sectionId);
  const prompt = sectionPrompts[sectionId];
  
  return `### ${section.name}

${prompt ? `Custom Requirements: ${prompt}` : 'Standard documentation for this section will be generated based on best practices.'}

This section covers the essential aspects of ${section.name.toLowerCase()} including:
- Implementation guidelines
- Best practices and recommendations  
- Step-by-step procedures
- Troubleshooting tips
- Configuration examples

---`;
}).join('\n\n')}

## Document Summary

This runbook has been generated with ${selectedSections.length} sections based on your specifications. Each section includes detailed implementation guidance, best practices, and practical examples to ensure successful deployment and maintenance.

Generated on: ${new Date().toLocaleDateString()}
Total Sections: ${selectedSections.length}
Custom Prompts: ${Object.keys(sectionPrompts).length}`;

    setGeneratedDocument(mockDocument);
    setIsGenerating(false);

    // // Update action status
    // if (currentActionId) {
    //   updateAction(currentActionId, {
    //     status: 'completed',
    //     title: 'Runbook Document Generated',
    //     description: `Generated runbook with ${selectedSections.length} sections`
    //   });
    // }
  };

  const downloadDocument = () => {
    const blob = new Blob([generatedDocument], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'runbook-document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyDocument = () => {
    navigator.clipboard.writeText(generatedDocument);
    // You could add a toast notification here
  };

  const handleRefresh = () => {
    // Reset all state
    setSelectedSections([]);
    setExpandedSections([]);
    setSectionPrompts({});
    setSelectAll(false);
    setGeneratedDocument('');
    setIsGenerating(false);
    
    // Clear saved state
    localStorage.removeItem('runbookState');
  };

  return (
    <div className={`runbook-container ${isDark ? 'dark' : 'light'}`}>
      {/* Background Effects */}
      <div className="background-effects">
        <div className={`bg-orb bg-orb-1 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #8b5cf6, #a855f7)' }}></div>
        <div className={`bg-orb bg-orb-2 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}></div>
        <div className={`bg-orb bg-orb-3 ${isDark ? 'dark' : 'light'}`} 
             style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)' }}></div>
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
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`page-title ${isDark ? 'dark' : 'light'}`}>
                Runbook Document Generator
              </h1>
              <p className={`page-subtitle ${isDark ? 'dark' : 'light'}`}>
                Generate comprehensive documentation and process runbooks
              </p>
            </div>
          </div>
        </div>

        {/* Document Sections */}
        <div className={`document-sections ${isDark ? 'dark' : 'light'}`}>
          <div className="sections-header">
            <div>
              <h3 className={`sections-title ${isDark ? 'dark' : 'light'}`}>Document Sections</h3>
              <p className={`sections-subtitle ${isDark ? 'dark' : 'light'}`}>
                Select the sections you want to include in the document:
              </p>
            </div>
          </div>

          <div className="select-all-container">
            <div className="select-all-checkbox" onClick={handleSelectAll}>
              <div className={`section-checkbox ${
                selectAll ? 'checked' : `unchecked ${isDark ? 'dark' : 'light'}`
              }`}>
                {selectAll && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
              <span className={`select-all-text ${isDark ? 'dark' : 'light'}`}>Select All</span>
            </div>
          </div>

          {documentSections.map((section) => {
            const isSelected = selectedSections.includes(section.id);
            const isExpanded = expandedSections.includes(section.id);
            
            return (
              <div 
                key={section.id} 
                className={`section-item ${isExpanded ? `expanded ${isDark ? 'dark' : 'light'}` : ''}`}
              >
                <div className="section-header">
                  <div
                    onClick={() => handleSectionToggle(section.id)}
                    className={`section-checkbox ${
                      isSelected ? 'checked' : `unchecked ${isDark ? 'dark' : 'light'}`
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  
                  <ChevronRight 
                    className={`section-expand-icon ${isExpanded ? 'expanded' : ''} ${isDark ? 'dark' : 'light'}`}
                    onClick={() => handleSectionExpand(section.id)}
                  />
                  
                  <span 
                    className={`section-name ${isDark ? 'dark' : 'light'}`}
                    onClick={() => handleSectionExpand(section.id)}
                  >
                    {section.name}
                  </span>
                </div>

                {isExpanded && (
                  <div className={`prompt-section ${isDark ? 'dark' : 'light'}`}>
                    <label className={`prompt-label ${isDark ? 'dark' : 'light'}`}>
                      Prompt for this section
                    </label>
                    <textarea
                      value={sectionPrompts[section.id] || ''}
                      onChange={(e) => handlePromptChange(section.id, e.target.value)}
                      placeholder={`Describe specific requirements for ${section.name}...`}
                      className={`prompt-textarea ${isDark ? 'dark' : 'light'}`}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div className="generate-button-container">
            <button
              onClick={generateDocument}
              disabled={selectedSections.length === 0 || isGenerating}
              className="generate-button"
            >
              <FileText className="w-4 h-4" />
              <span>{isGenerating ? 'Generating Document...' : 'Generate Document'}</span>
            </button>
          </div>
        </div>

        {/* Generated Document */}
        {generatedDocument && (
          <div className={`generated-document ${isDark ? 'dark' : 'light'}`}>
            <div className="document-header">
              <h3 className={`document-title ${isDark ? 'dark' : 'light'}`}>Generated Runbook</h3>
              <div className="document-actions">
                <button onClick={downloadDocument} className="action-button download-button">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button onClick={copyDocument} className="action-button copy-button">
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
              </div>
            </div>
            
            <div className={`document-content ${isDark ? 'dark' : 'light'}`}>
              <pre className={`document-text ${isDark ? 'dark' : 'light'}`}>
                {generatedDocument}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunbookPage;