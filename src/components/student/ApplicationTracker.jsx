import React, { useState } from 'react';
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import '../../App.css';

const ApplicationTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // table or timeline

  // Sample application data
  const applications = [
    {
      id: 1,
      company: "Microsoft",
      role: "Software Engineering Intern",
      appliedDate: "2025-10-01",
      status: "Selected",
      statusDate: "2025-10-10",
      notes: "Technical interview went well. Received offer letter."
    },
    {
      id: 2,
      company: "Google",
      role: "Product Manager",
      appliedDate: "2025-09-25",
      status: "Shortlisted",
      statusDate: "2025-10-05",
      notes: "Cleared initial screening. Awaiting technical interview."
    },
    {
      id: 3,
      company: "Amazon",
      role: "Data Scientist",
      appliedDate: "2025-09-20",
      status: "Rejected",
      statusDate: "2025-10-01",
      notes: "Not selected for the position. Feedback requested."
    },
    {
      id: 4,
      company: "Meta",
      role: "Frontend Developer Intern",
      appliedDate: "2025-10-05",
      status: "Applied",
      statusDate: "2025-10-05",
      notes: "Application submitted. Awaiting response."
    },
    {
      id: 5,
      company: "Apple",
      role: "iOS Developer",
      appliedDate: "2025-09-15",
      status: "Shortlisted",
      statusDate: "2025-09-30",
      notes: "Cleared resume screening. Technical round scheduled."
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'status-applied';
      case 'Shortlisted': return 'status-shortlisted';
      case 'Rejected': return 'status-rejected';
      case 'Selected': return 'status-selected';
      default: return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Applied': return <Clock size={16} />;
      case 'Shortlisted': return <Eye size={16} />;
      case 'Rejected': return <XCircle size={16} />;
      case 'Selected': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="application-tracker">
      <div className="page-header">
        <h1>Application Tracker</h1>
        <p>Track the status of all your job applications</p>
      </div>

      {/* Controls */}
      <div className="tracker-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
          </div>
          
          <div className="view-toggle">
            <button 
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
            <button 
              className={viewMode === 'timeline' ? 'active' : ''}
              onClick={() => setViewMode('timeline')}
            >
              Timeline View
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="stats-summary">
        <div className="stat-card">
          <h3>{applications.length}</h3>
          <p>Total Applications</p>
        </div>
        <div className="stat-card">
          <h3>{applications.filter(app => app.status === 'Selected').length}</h3>
          <p>Offers Received</p>
        </div>
        <div className="stat-card">
          <h3>{applications.filter(app => app.status === 'Shortlisted').length}</h3>
          <p>Shortlisted</p>
        </div>
        <div className="stat-card">
          <h3>{applications.filter(app => app.status === 'Rejected').length}</h3>
          <p>Rejected</p>
        </div>
      </div>

      {/* Applications View */}
      {viewMode === 'table' ? (
        <div className="applications-table">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Status Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(app => (
                <tr key={app.id}>
                  <td>
                    <div className="company-cell">
                      <div className="company-logo">
                        {app.company.charAt(0)}
                      </div>
                      <span>{app.company}</span>
                    </div>
                  </td>
                  <td>{app.role}</td>
                  <td>{formatDate(app.appliedDate)}</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </span>
                  </td>
                  <td>{formatDate(app.statusDate)}</td>
                  <td>
                    <div className="notes-cell">
                      {app.notes}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredApplications.length === 0 && (
            <div className="no-applications">
              <p>No applications found matching your criteria.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="applications-timeline">
          {filteredApplications
            .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
            .map(app => (
              <div key={app.id} className="timeline-item">
                <div className="timeline-marker">
                  <div className={`marker-icon ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                  </div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{app.role} at {app.company}</h3>
                    <span className={`status-badge ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="timeline-details">
                    <p><strong>Applied:</strong> {formatDate(app.appliedDate)}</p>
                    <p><strong>Status Updated:</strong> {formatDate(app.statusDate)}</p>
                    <p className="notes">{app.notes}</p>
                  </div>
                </div>
              </div>
            ))
          }
          
          {filteredApplications.length === 0 && (
            <div className="no-applications">
              <p>No applications found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;