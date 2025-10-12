import React, { useState } from 'react';
import { Send, FileText, TrendingUp, Users, Calendar, Search, Filter, Download } from 'lucide-react';
import '../../App.css';

const CompanyOutreach = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);

  // Sample outreach data
  const outreachData = [
    {
      id: 1,
      company: "TechCorp Solutions",
      contactPerson: "Rajesh Kumar",
      email: "rajesh.kumar@techcorpsolutions.com",
      sentDate: "2025-10-01",
      status: "Sent",
      response: "Positive",
      scheduledDrive: "2025-11-15"
    },
    {
      id: 2,
      company: "InnovateX",
      contactPerson: "Priya Sharma",
      email: "priya.sharma@innovatex.com",
      sentDate: "2025-09-25",
      status: "Responded",
      response: "Interested",
      scheduledDrive: "2025-11-05"
    },
    {
      id: 3,
      company: "CreativeWorks",
      contactPerson: "Amit Patel",
      email: "amit.patel@creativeworks.com",
      sentDate: "2025-09-20",
      status: "Confirmed",
      response: "Confirmed",
      scheduledDrive: "2025-10-30"
    },
    {
      id: 4,
      company: "DataSystems",
      contactPerson: "Sneha Gupta",
      email: "sneha.gupta@datasystems.com",
      sentDate: "2025-09-15",
      status: "Sent",
      response: "No Response",
      scheduledDrive: null
    }
  ];

  const filteredOutreach = outreachData.filter(outreach => {
    const matchesSearch = outreach.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      outreach.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || outreach.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreateInvitation = () => {
    setIsCreating(true);
  };

  const handleSendInvitation = (outreachId) => {
    console.log("Sending invitation:", outreachId);
  };

  const handleViewDetails = (outreachId) => {
    console.log("Viewing details:", outreachId);
  };

  const handleScheduleDrive = (outreachId) => {
    console.log("Scheduling drive:", outreachId);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'sent': return 'status-sent';
      case 'responded': return 'status-responded';
      case 'confirmed': return 'status-confirmed';
      default: return '';
    }
  };

  const getResponseClass = (response) => {
    switch (response.toLowerCase()) {
      case 'positive':
      case 'interested':
      case 'confirmed':
        return 'response-positive';
      case 'no response':
        return 'response-neutral';
      default:
        return '';
    }
  };

  return (
    <div className="company-outreach">
      <div className="page-header">
        <h1>Company Outreach Tool</h1>
        <p>Draft invitations and track company engagement</p>
      </div>

      {/* Controls */}
      <div className="outreach-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search companies or contacts..."
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
              <option value="sent">Sent</option>
              <option value="responded">Responded</option>
              <option value="confirmed">Confirmed</option>
            </select>
          </div>
        </div>
        
        <div className="actions">
          <button 
            className="primary-button"
            onClick={handleCreateInvitation}
          >
            <Send size={16} />
            Create Invitation
          </button>
        </div>
      </div>

      {/* Outreach List */}
      <div className="outreach-table-container">
        <table className="outreach-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact Person</th>
              <th>Email</th>
              <th>Sent Date</th>
              <th>Status</th>
              <th>Response</th>
              <th>Scheduled Drive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOutreach.map(outreach => (
              <tr key={outreach.id}>
                <td>{outreach.company}</td>
                <td>{outreach.contactPerson}</td>
                <td><a href={`mailto:${outreach.email}`}>{outreach.email}</a></td>
                <td>{outreach.sentDate}</td>
                <td>
                  <div className={`status-badge ${getStatusClass(outreach.status)}`}>
                    {outreach.status}
                  </div>
                </td>
                <td>
                  <div className={`response-badge ${getResponseClass(outreach.response)}`}>
                    {outreach.response}
                  </div>
                </td>
                <td>{outreach.scheduledDrive || "-"}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-button view-button"
                      onClick={() => handleViewDetails(outreach.id)}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="action-button send-button"
                      onClick={() => handleSendInvitation(outreach.id)}
                    >
                      <Send size={16} />
                    </button>
                    {!outreach.scheduledDrive && (
                      <button 
                        className="action-button schedule-button"
                        onClick={() => handleScheduleDrive(outreach.id)}
                      >
                        <Calendar size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOutreach.length === 0 && (
        <div className="no-results">
          <p>No outreach records found matching your criteria.</p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Send size={24} /></div>
          <div className="stat-info">
            <h3>{outreachData.length}</h3>
            <p>Total Invitations</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><TrendingUp size={24} /></div>
          <div className="stat-info">
            <h3>{outreachData.filter(o => o.response === 'Positive' || o.response === 'Interested' || o.response === 'Confirmed').length}</h3>
            <p>Positive Responses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Calendar size={24} /></div>
          <div className="stat-info">
            <h3>{outreachData.filter(o => o.scheduledDrive).length}</h3>
            <p>Drives Scheduled</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-info">
            <h3>{outreachData.filter(o => o.status === 'Confirmed').length}</h3>
            <p>Confirmed Companies</p>
          </div>
        </div>
      </div>

      {/* Create Invitation Modal */}
      {isCreating && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create Company Invitation</h2>
              <button 
                className="close-button"
                onClick={() => setIsCreating(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Select Company *</label>
                <select>
                  <option value="">Select a company</option>
                  <option value="1">Microsoft</option>
                  <option value="2">Google</option>
                  <option value="3">Amazon</option>
                  <option value="4">Meta</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Invitation Template</label>
                <select>
                  <option value="standard">Standard Invitation</option>
                  <option value="placement">Placement Drive Invitation</option>
                  <option value="internship">Internship Program Invitation</option>
                  <option value="custom">Custom Template</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Custom Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Add a personalized message to the company..."
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Attachments</label>
                <div className="attachments">
                  <div className="attachment-item">
                    <FileText size={16} />
                    <span>College Brochure</span>
                    <button className="remove-button">×</button>
                  </div>
                  <div className="attachment-item">
                    <TrendingUp size={16} />
                    <span>Placement Statistics</span>
                    <button className="remove-button">×</button>
                  </div>
                  <div className="attachment-item">
                    <Users size={16} />
                    <span>Top Students List</span>
                    <button className="remove-button">×</button>
                  </div>
                </div>
                <button className="secondary-button">
                  <FileText size={16} />
                  Add Attachment
                </button>
              </div>
              
              <div className="form-group">
                <label>Schedule Drive Date (Optional)</label>
                <input type="date" />
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
                <button className="submit-button">
                  <Send size={16} />
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyOutreach;