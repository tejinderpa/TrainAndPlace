import React, { useState } from 'react';
import { Edit3, Trash2, Eye, BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react';
import '../../App.css';

const ManageJobsEvents = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample job/event data
  const jobsEvents = [
    {
      id: 1,
      title: "Software Engineering Intern",
      type: "Internship",
      status: "Active",
      postedDate: "2025-10-01",
      deadline: "2025-10-31",
      applications: 42,
      views: 128,
      category: "Technology"
    },
    {
      id: 2,
      title: "Campus Placement Drive",
      type: "Placement",
      status: "Active",
      postedDate: "2025-09-15",
      deadline: "2025-11-15",
      applications: 87,
      views: 342,
      category: "Recruitment"
    },
    {
      id: 3,
      title: "AI Workshop",
      type: "Workshop",
      status: "Closed",
      postedDate: "2025-08-20",
      deadline: "2025-09-30",
      applications: 0,
      views: 210,
      category: "Education"
    },
    {
      id: 4,
      title: "Hackathon 2025",
      type: "Hackathon",
      status: "Draft",
      postedDate: "2025-10-10",
      deadline: "2025-11-05",
      applications: 0,
      views: 0,
      category: "Competition"
    }
  ];

  const filteredJobsEvents = jobsEvents.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      job.status.toLowerCase() === activeTab ||
                      (activeTab === 'drafts' && job.status === 'Draft');
    
    return matchesSearch && matchesTab;
  });

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'closed': return 'status-closed';
      case 'draft': return 'status-draft';
      default: return '';
    }
  };

  const handleEdit = (id) => {
    console.log("Editing job/event:", id);
  };

  const handleDelete = (id) => {
    console.log("Deleting job/event:", id);
  };

  const handleViewApplications = (id) => {
    console.log("Viewing applications for:", id);
  };

  const handleViewAnalytics = (id) => {
    console.log("Viewing analytics for:", id);
  };

  const handleCloseJob = (id) => {
    console.log("Closing job:", id);
  };

  const handleReopenJob = (id) => {
    console.log("Reopening job:", id);
  };

  return (
    <div className="manage-jobs-events">
      <div className="page-header">
        <h1>Manage Jobs & Events</h1>
        <p>View and manage all your posted opportunities</p>
      </div>

      {/* Controls */}
      <div className="manage-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs/events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <button 
            className={`filter-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`filter-button ${activeTab === 'closed' ? 'active' : ''}`}
            onClick={() => setActiveTab('closed')}
          >
            Closed
          </button>
          <button 
            className={`filter-button ${activeTab === 'drafts' ? 'active' : ''}`}
            onClick={() => setActiveTab('drafts')}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Jobs/Events List */}
      <div className="jobs-events-list">
        {filteredJobsEvents.length > 0 ? (
          filteredJobsEvents.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-info">
                  <div className="job-type-badge">{job.type}</div>
                  <h3>{job.title}</h3>
                  <div className={`status-badge ${getStatusClass(job.status)}`}>
                    {job.status}
                  </div>
                </div>
                <div className="job-meta">
                  <p>Posted: {job.postedDate}</p>
                  <p>Deadline: {job.deadline}</p>
                </div>
              </div>
              
              <div className="job-stats">
                <div className="stat-item">
                  <Eye size={16} />
                  <span>{job.views} views</span>
                </div>
                <div className="stat-item">
                  <BarChart3 size={16} />
                  <span>{job.applications} applications</span>
                </div>
              </div>
              
              <div className="job-actions">
                <button 
                  className="action-button view-button"
                  onClick={() => handleViewApplications(job.id)}
                >
                  <Eye size={16} />
                  View Applications
                </button>
                <button 
                  className="action-button analytics-button"
                  onClick={() => handleViewAnalytics(job.id)}
                >
                  <BarChart3 size={16} />
                  Analytics
                </button>
                <button 
                  className="action-button edit-button"
                  onClick={() => handleEdit(job.id)}
                >
                  <Edit3 size={16} />
                  Edit
                </button>
                <button 
                  className="action-button delete-button"
                  onClick={() => handleDelete(job.id)}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
                
                {job.status === 'Active' ? (
                  <button 
                    className="action-button close-button"
                    onClick={() => handleCloseJob(job.id)}
                  >
                    <XCircle size={16} />
                    Close
                  </button>
                ) : job.status === 'Closed' ? (
                  <button 
                    className="action-button reopen-button"
                    onClick={() => handleReopenJob(job.id)}
                  >
                    <CheckCircle size={16} />
                    Reopen
                  </button>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No jobs or events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobsEvents;