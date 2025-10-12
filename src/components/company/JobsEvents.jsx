import React, { useState } from 'react';
import { Search, Filter, Briefcase, Calendar, MapPin, Users, Eye, Edit, Trash2 } from 'lucide-react';
import '../../App.css';

const JobsEvents = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      type: "Full-time",
      location: "Bangalore, India",
      posted: "2025-10-10",
      applications: 45,
      status: "Active",
      deadline: "2025-10-25"
    },
    {
      id: 2,
      title: "Data Analyst",
      type: "Internship",
      location: "Hyderabad, India",
      posted: "2025-10-05",
      applications: 32,
      status: "Active",
      deadline: "2025-10-30"
    },
    {
      id: 3,
      title: "Product Manager",
      type: "Full-time",
      location: "Mumbai, India",
      posted: "2025-09-28",
      applications: 67,
      status: "Closed",
      deadline: "2025-10-15"
    }
  ];

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Google Tech Talk & Recruitment Drive",
      date: "2025-10-20",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium, College Campus",
      type: "Placement Drive",
      attendees: 150,
      status: "Scheduled"
    },
    {
      id: 2,
      title: "Microsoft Coding Workshop",
      date: "2025-10-25",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Science Department",
      type: "Workshop",
      attendees: 80,
      status: "Scheduled"
    }
  ];

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || event.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Get unique statuses for filter
  const statuses = ['All', ...new Set([...jobs, ...events].map(item => item.status))];

  return (
    <div className="jobs-events">
      <div className="page-header">
        <h1>Jobs & Events</h1>
        <p>Manage your job postings and company events</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={activeTab === 'jobs' ? 'active' : ''}
          onClick={() => setActiveTab('jobs')}
        >
          <Briefcase size={16} />
          Job Postings
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} />
          Events
        </button>
      </div>

      {/* Search and Filters */}
      <div className="jobs-events-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search jobs or events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <button className="primary-button">
            <Briefcase size={16} />
            Post New
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="jobs-tab">
            <div className="jobs-list">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <div className="job-info">
                        <h3>{job.title}</h3>
                        <p>{job.type} • {job.location}</p>
                      </div>
                      <div className={`job-status ${job.status.toLowerCase()}`}>
                        {job.status}
                      </div>
                    </div>
                    
                    <div className="job-details">
                      <div className="info-item">
                        <Calendar size={16} />
                        <span>Posted: {job.posted}</span>
                      </div>
                      <div className="info-item">
                        <Calendar size={16} />
                        <span>Deadline: {job.deadline}</span>
                      </div>
                      <div className="info-item">
                        <Users size={16} />
                        <span>{job.applications} applications</span>
                      </div>
                    </div>
                    
                    <div className="job-actions">
                      <button className="icon-button">
                        <Eye size={16} />
                      </button>
                      <button className="icon-button">
                        <Edit size={16} />
                      </button>
                      <button className="icon-button">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-jobs">
                  <p>No jobs found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="events-tab">
            <div className="events-list">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-header">
                      <div className="event-info">
                        <h3>{event.title}</h3>
                        <p>{event.type} • {event.location}</p>
                      </div>
                      <div className={`event-status ${event.status.toLowerCase()}`}>
                        {event.status}
                      </div>
                    </div>
                    
                    <div className="event-details">
                      <div className="info-item">
                        <Calendar size={16} />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="info-item">
                        <Users size={16} />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                    
                    <div className="event-actions">
                      <button className="icon-button">
                        <Eye size={16} />
                      </button>
                      <button className="icon-button">
                        <Edit size={16} />
                      </button>
                      <button className="icon-button">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">
                  <p>No events found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsEvents;