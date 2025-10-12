import React, { useState } from 'react';
import { Filter, Download, Check, X, Eye, Send, FileText } from 'lucide-react';
import '../../App.css';

const ApplicationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [jobFilter, setJobFilter] = useState('all');

  // Sample job data for filter
  const jobs = [
    { id: 1, title: "Software Engineering Intern" },
    { id: 2, title: "Campus Placement Drive" },
    { id: 3, title: "AI Workshop" }
  ];

  // Sample application data
  const applications = [
    {
      id: 1,
      studentName: "Alex Johnson",
      college: "NIT Trichy",
      branch: "Computer Science",
      batch: "2026",
      cgpa: 8.7,
      skillsMatch: 85,
      resumeLink: "#",
      status: "Pending",
      appliedDate: "2025-10-12"
    },
    {
      id: 2,
      studentName: "Sarah Williams",
      college: "IIT Delhi",
      branch: "Electronics",
      batch: "2025",
      cgpa: 9.2,
      skillsMatch: 92,
      resumeLink: "#",
      status: "Shortlisted",
      appliedDate: "2025-10-11"
    },
    {
      id: 3,
      studentName: "Michael Chen",
      college: "IIIT Hyderabad",
      branch: "Data Science",
      batch: "2026",
      cgpa: 8.9,
      skillsMatch: 45,
      resumeLink: "#",
      status: "Rejected",
      appliedDate: "2025-10-10"
    },
    {
      id: 4,
      studentName: "Priya Sharma",
      college: "NID Ahmedabad",
      branch: "Design",
      batch: "2025",
      cgpa: 8.5,
      skillsMatch: 78,
      resumeLink: "#",
      status: "Pending",
      appliedDate: "2025-10-09"
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.college.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter;
    const matchesJob = jobFilter === 'all'; // In real app, this would filter by job
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleSelectApplication = (id) => {
    if (selectedApplications.includes(id)) {
      setSelectedApplications(selectedApplications.filter(appId => appId !== id));
    } else {
      setSelectedApplications([...selectedApplications, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map(app => app.id));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on applications:`, selectedApplications);
    // In real app, this would perform the action and clear selection
    setSelectedApplications([]);
  };

  const handleIndividualAction = (id, action) => {
    console.log(`Performing ${action} on application:`, id);
  };

  const exportSelected = () => {
    console.log("Exporting selected applications:", selectedApplications);
  };

  return (
    <div className="applications-management">
      <div className="page-header">
        <h1>Applications Management</h1>
        <p>Review and manage student applications</p>
      </div>

      {/* Controls */}
      <div className="applications-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by student name or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={jobFilter} 
              onChange={(e) => setJobFilter(e.target.value)}
            >
              <option value="all">All Jobs/Events</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <button className="export-button" onClick={exportSelected}>
            <Download size={20} />
            Export Selected
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedApplications.length > 0 && (
        <div className="bulk-actions">
          <p>{selectedApplications.length} application(s) selected</p>
          <div className="bulk-action-buttons">
            <button className="bulk-action-button accept-button" onClick={() => handleBulkAction('accept')}>
              <Check size={16} />
              Accept
            </button>
            <button className="bulk-action-button reject-button" onClick={() => handleBulkAction('reject')}>
              <X size={16} />
              Reject
            </button>
            <button className="bulk-action-button shortlist-button" onClick={() => handleBulkAction('shortlist')}>
              <Send size={16} />
              Shortlist
            </button>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="applications-table-container">
        <table className="applications-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedApplications.length === filteredApplications.length && filteredApplications.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Student Name</th>
              <th>College</th>
              <th>Branch</th>
              <th>CGPA</th>
              <th>Skills Match</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => (
              <tr key={app.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedApplications.includes(app.id)}
                    onChange={() => handleSelectApplication(app.id)}
                  />
                </td>
                <td>{app.studentName}</td>
                <td>{app.college}</td>
                <td>{app.branch}</td>
                <td>{app.cgpa}</td>
                <td>
                  <div className="skills-match">
                    <div className="match-bar">
                      <div 
                        className={`match-fill ${app.skillsMatch < 50 ? 'low-match' : ''}`} 
                        style={{ width: `${app.skillsMatch}%` }}
                      ></div>
                    </div>
                    <span>{app.skillsMatch}%</span>
                  </div>
                  {app.skillsMatch < 50 && (
                    <div className="auto-rejected">Auto-rejected</div>
                  )}
                </td>
                <td>
                  <a href={app.resumeLink} className="resume-link">
                    <FileText size={16} />
                  </a>
                </td>
                <td>
                  <div className={`status-badge ${app.status.toLowerCase()}`}>
                    {app.status}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-button view-button"
                      onClick={() => handleIndividualAction(app.id, 'view')}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="action-button accept-button"
                      onClick={() => handleIndividualAction(app.id, 'accept')}
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      className="action-button reject-button"
                      onClick={() => handleIndividualAction(app.id, 'reject')}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredApplications.length === 0 && (
        <div className="no-results">
          <p>No applications found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsManagement;