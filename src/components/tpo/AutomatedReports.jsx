import React, { useState } from 'react';
import { Download, FileText, TrendingUp, Users, Calendar, Send, Filter, Search, Edit3, Eye, Trash2 } from 'lucide-react';
import '../../App.css';

const AutomatedReports = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [searchTerm, setSearchTerm] = useState('');
  const [reportType, setReportType] = useState('placement');
  const [timeRange, setTimeRange] = useState('monthly');

  // Sample report templates
  const reportTemplates = [
    {
      id: 1,
      name: "Monthly Placement Report",
      description: "Comprehensive placement statistics for the month",
      frequency: "Monthly",
      lastGenerated: "2025-10-01",
      nextGeneration: "2025-11-01"
    },
    {
      id: 2,
      name: "Student Performance Report",
      description: "Detailed analysis of student performance metrics",
      frequency: "Quarterly",
      lastGenerated: "2025-09-15",
      nextGeneration: "2025-12-15"
    },
    {
      id: 3,
      name: "Company Engagement Report",
      description: "Analysis of company interactions and hiring patterns",
      frequency: "Monthly",
      lastGenerated: "2025-10-05",
      nextGeneration: "2025-11-05"
    }
  ];

  // Sample generated reports
  const generatedReports = [
    {
      id: 1,
      name: "October 2025 Placement Report",
      type: "Placement",
      generatedDate: "2025-10-01",
      format: "PDF",
      size: "2.4 MB",
      downloads: 125
    },
    {
      id: 2,
      name: "September 2025 Student Performance",
      type: "Performance",
      generatedDate: "2025-09-15",
      format: "Excel",
      size: "1.8 MB",
      downloads: 89
    },
    {
      id: 3,
      name: "Q3 2025 Company Engagement",
      type: "Engagement",
      generatedDate: "2025-09-30",
      format: "PDF",
      size: "3.2 MB",
      downloads: 67
    }
  ];

  // Sample scheduled reports
  const scheduledReports = [
    {
      id: 1,
      name: "November 2025 Placement Report",
      type: "Placement",
      scheduleDate: "2025-11-01",
      frequency: "Monthly",
      recipients: ["tpo@college.edu", "director@college.edu"]
    },
    {
      id: 2,
      name: "Q4 2025 Student Performance",
      type: "Performance",
      scheduleDate: "2025-12-15",
      frequency: "Quarterly",
      recipients: ["tpo@college.edu", "dean@college.edu"]
    }
  ];

  const handleGenerateReport = () => {
    console.log("Generating report:", reportType, timeRange);
  };

  const handleExportReport = (reportId, format) => {
    console.log("Exporting report:", reportId, "in", format, "format");
  };

  const handleScheduleReport = () => {
    console.log("Scheduling report generation");
  };

  const handleViewReport = (reportId) => {
    console.log("Viewing report:", reportId);
  };

  const getTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'placement': return 'type-placement';
      case 'performance': return 'type-performance';
      case 'engagement': return 'type-engagement';
      default: return '';
    }
  };

  return (
    <div className="automated-reports">
      <div className="page-header">
        <h1>Automated Reports Center</h1>
        <p>Generate, schedule, and manage automated reports</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          <FileText size={16} />
          Generate Reports
        </button>
        <button 
          className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <TrendingUp size={16} />
          Report Templates
        </button>
        <button 
          className={`tab ${activeTab === 'generated' ? 'active' : ''}`}
          onClick={() => setActiveTab('generated')}
        >
          <Download size={16} />
          Generated Reports
        </button>
        <button 
          className={`tab ${activeTab === 'scheduled' ? 'active' : ''}`}
          onClick={() => setActiveTab('scheduled')}
        >
          <Calendar size={16} />
          Scheduled Reports
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'generate' && (
          <div className="generate-tab">
            <div className="report-generator">
              <h2>Generate New Report</h2>
              <div className="form-container">
                <div className="form-group">
                  <label>Report Type</label>
                  <select 
                    value={reportType} 
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="placement">Placement Report</option>
                    <option value="performance">Student Performance Report</option>
                    <option value="engagement">Company Engagement Report</option>
                    <option value="annual">Annual Summary Report</option>
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Time Range</label>
                    <select 
                      value={timeRange} 
                      onChange={(e) => setTimeRange(e.target.value)}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Format</label>
                    <select>
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="word">Word</option>
                      <option value="html">HTML</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Date Range</label>
                  <div className="date-range">
                    <input type="date" />
                    <span>to</span>
                    <input type="date" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Recipients (Email)</label>
                  <input 
                    type="email" 
                    placeholder="Enter email addresses separated by commas" 
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    className="primary-button"
                    onClick={handleGenerateReport}
                  >
                    <FileText size={16} />
                    Generate Report
                  </button>
                  <button 
                    className="secondary-button"
                    onClick={handleScheduleReport}
                  >
                    <Calendar size={16} />
                    Schedule Report
                  </button>
                </div>
              </div>
            </div>
            
            <div className="quick-reports">
              <h3>Quick Reports</h3>
              <div className="quick-report-buttons">
                <button className="quick-report-button">
                  <FileText size={24} />
                  <span>Today's Summary</span>
                </button>
                <button className="quick-report-button">
                  <TrendingUp size={24} />
                  <span>Weekly Trends</span>
                </button>
                <button className="quick-report-button">
                  <Users size={24} />
                  <span>Monthly Placement</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="templates-tab">
            <div className="templates-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search report templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="templates-list">
              <h3>Report Templates</h3>
              {reportTemplates.map(template => (
                <div key={template.id} className="template-card">
                  <div className="template-header">
                    <div className="template-info">
                      <h4>{template.name}</h4>
                      <p>{template.description}</p>
                    </div>
                    <div className="template-meta">
                      <span className="frequency">{template.frequency}</span>
                    </div>
                  </div>
                  
                  <div className="template-details">
                    <div className="detail-item">
                      <span className="label">Last Generated:</span>
                      <span className="value">{template.lastGenerated}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Next Generation:</span>
                      <span className="value">{template.nextGeneration}</span>
                    </div>
                  </div>
                  
                  <div className="template-actions">
                    <button className="primary-button">
                      <FileText size={16} />
                      Generate Now
                    </button>
                    <button className="secondary-button">
                      <Calendar size={16} />
                      Schedule
                    </button>
                    <button className="action-button">
                      <Edit3 size={16} />
                      Edit Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'generated' && (
          <div className="generated-tab">
            <div className="reports-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search generated reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters">
                <div className="filter-group">
                  <Filter size={20} />
                  <select>
                    <option value="all">All Types</option>
                    <option value="placement">Placement</option>
                    <option value="performance">Performance</option>
                    <option value="engagement">Engagement</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="reports-table-container">
              <table className="reports-table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Type</th>
                    <th>Generated Date</th>
                    <th>Format</th>
                    <th>Size</th>
                    <th>Downloads</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedReports.map(report => (
                    <tr key={report.id}>
                      <td>{report.name}</td>
                      <td>
                        <span className={`report-type ${getTypeClass(report.type)}`}>
                          {report.type}
                        </span>
                      </td>
                      <td>{report.generatedDate}</td>
                      <td>{report.format}</td>
                      <td>{report.size}</td>
                      <td>{report.downloads}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-button download-button"
                            onClick={() => handleExportReport(report.id, report.format)}
                          >
                            <Download size={16} />
                          </button>
                          <button 
                            className="action-button view-button"
                            onClick={() => handleViewReport(report.id)}
                          >
                            <Eye size={16} />
                          </button>
                          <button className="action-button send-button">
                            <Send size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'scheduled' && (
          <div className="scheduled-tab">
            <div className="scheduled-controls">
              <button className="primary-button" onClick={handleScheduleReport}>
                <Calendar size={16} />
                Schedule New Report
              </button>
            </div>

            <div className="scheduled-reports">
              <h3>Scheduled Reports</h3>
              {scheduledReports.map(report => (
                <div key={report.id} className="scheduled-card">
                  <div className="scheduled-header">
                    <div className="scheduled-info">
                      <h4>{report.name}</h4>
                      <p>{report.type} Report</p>
                    </div>
                    <div className="scheduled-meta">
                      <span className="schedule-date">{report.scheduleDate}</span>
                      <span className="frequency">{report.frequency}</span>
                    </div>
                  </div>
                  
                  <div className="scheduled-details">
                    <div className="detail-item">
                      <span className="label">Recipients:</span>
                      <span className="value">{report.recipients.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="scheduled-actions">
                    <button className="secondary-button">
                      <Edit3 size={16} />
                      Edit Schedule
                    </button>
                    <button className="action-button">
                      <Trash2 size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutomatedReports;