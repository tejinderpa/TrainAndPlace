import React, { useState } from 'react';
import { Check, X, Eye, Search, Filter, Users, Calendar, Bell } from 'lucide-react';
import '../../App.css';

const JobEventCoordination = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Sample job/event data
  const jobEvents = {
    pending: [
      {
        id: 1,
        title: "Software Engineering Intern",
        company: "TechCorp Solutions",
        type: "Internship",
        postedDate: "2025-10-10",
        deadline: "2025-10-25",
        applicants: 24,
        status: "Pending Approval"
      },
      {
        id: 2,
        title: "Campus Placement Drive",
        company: "InnovateX",
        type: "Placement",
        postedDate: "2025-10-05",
        deadline: "2025-11-15",
        applicants: 0,
        status: "Pending Approval"
      }
    ],
    approved: [
      {
        id: 3,
        title: "Data Scientist Position",
        company: "DataSystems",
        type: "Placement",
        postedDate: "2025-09-20",
        deadline: "2025-10-31",
        applicants: 42,
        status: "Approved"
      },
      {
        id: 4,
        title: "AI Workshop",
        company: "Google",
        type: "Workshop",
        postedDate: "2025-09-15",
        deadline: "2025-10-20",
        applicants: 85,
        status: "Approved"
      }
    ],
    rejected: [
      {
        id: 5,
        title: "Marketing Intern",
        company: "CreativeWorks",
        type: "Internship",
        postedDate: "2025-09-10",
        deadline: "2025-10-15",
        applicants: 0,
        status: "Rejected"
      }
    ]
  };

  const filteredJobs = jobEvents[activeTab].filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || job.type.toLowerCase() === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleApprove = (jobId) => {
    console.log("Approving job:", jobId);
  };

  const handleReject = (jobId) => {
    console.log("Rejecting job:", jobId);
  };

  const handleViewDetails = (jobId) => {
    console.log("Viewing job details:", jobId);
  };

  const handleNotifyStudents = (jobId) => {
    console.log("Notifying students about job:", jobId);
  };

  const getTypeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'internship': return 'type-internship';
      case 'placement': return 'type-placement';
      case 'workshop': return 'type-workshop';
      case 'webinar': return 'type-webinar';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending approval': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <div className="job-event-coordination">
      <div className="page-header">
        <h1>Job/Event Coordination</h1>
        <p>Manage company job postings and placement drives</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending ({jobEvents.pending.length})
        </button>
        <button 
          className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved ({jobEvents.approved.length})
        </button>
        <button 
          className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Rejected ({jobEvents.rejected.length})
        </button>
      </div>

      {/* Controls */}
      <div className="coordination-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search jobs/events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="internship">Internships</option>
              <option value="placement">Placements</option>
              <option value="workshop">Workshops</option>
              <option value="webinar">Webinars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs/Events List */}
      <div className="jobs-events-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-info">
                  <div className="job-type-badge">
                    <span className={getTypeClass(job.type)}>{job.type}</span>
                  </div>
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                </div>
                <div className="job-meta">
                  <p>Posted: {job.postedDate}</p>
                  <p>Deadline: {job.deadline}</p>
                </div>
              </div>
              
              <div className="job-stats">
                <div className="stat-item">
                  <Users size={16} />
                  <span>{job.applicants} applicants</span>
                </div>
                <div className={`status-badge ${getStatusClass(job.status)}`}>
                  {job.status}
                </div>
              </div>
              
              <div className="job-actions">
                {activeTab === 'pending' && (
                  <>
                    <button 
                      className="primary-button"
                      onClick={() => handleApprove(job.id)}
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button 
                      className="secondary-button"
                      onClick={() => handleReject(job.id)}
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </>
                )}
                
                <button 
                  className="action-button view-button"
                  onClick={() => handleViewDetails(job.id)}
                >
                  <Eye size={16} />
                  View Details
                </button>
                
                {activeTab === 'approved' && (
                  <button 
                    className="action-button notify-button"
                    onClick={() => handleNotifyStudents(job.id)}
                  >
                    <Bell size={16} />
                    Notify Students
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No jobs/events found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Eligibility Criteria Section */}
      <div className="eligibility-section">
        <h2>Set Eligibility Criteria</h2>
        <div className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label>Minimum CGPA</label>
              <input type="number" step="0.1" min="0" max="10" placeholder="e.g., 7.5" />
            </div>
            
            <div className="form-group">
              <label>Branches Allowed</label>
              <select multiple>
                <option value="cs">Computer Science</option>
                <option value="ec">Electronics</option>
                <option value="me">Mechanical</option>
                <option value="ce">Civil</option>
                <option value="ds">Data Science</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Required Skills</label>
            <input type="text" placeholder="Enter skills separated by commas" />
          </div>
          
          <div className="form-actions">
            <button className="primary-button">
              <Check size={16} />
              Apply Criteria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobEventCoordination;