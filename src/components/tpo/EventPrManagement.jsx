import React, { useState } from 'react';
import { Plus, Upload, Calendar, Users, Award, Search, Filter, Download, Edit3, Eye } from 'lucide-react';
import '../../App.css';

const EventPrManagement = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Annual Tech Fest",
      date: "2025-11-15",
      time: "10:00 AM - 6:00 PM",
      location: "Main Campus",
      type: "Fest",
      attendees: 1500,
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Career Guidance Workshop",
      date: "2025-10-25",
      time: "2:00 PM - 5:00 PM",
      location: "Seminar Hall A",
      type: "Workshop",
      attendees: 200,
      status: "Completed"
    },
    {
      id: 3,
      title: "Alumni Meet",
      date: "2025-12-05",
      time: "4:00 PM - 8:00 PM",
      location: "Auditorium",
      type: "Networking",
      attendees: 300,
      status: "Upcoming"
    }
  ];

  // Sample promotional materials
  const promoMaterials = [
    {
      id: 1,
      title: "College Brochure 2025",
      type: "Brochure",
      size: "2.4 MB",
      uploaded: "2025-10-01",
      downloads: 1250
    },
    {
      id: 2,
      title: "Placement Statistics Report",
      type: "Report",
      size: "1.8 MB",
      uploaded: "2025-09-15",
      downloads: 890
    },
    {
      id: 3,
      title: "Campus Life Video",
      type: "Video",
      size: "45.2 MB",
      uploaded: "2025-08-20",
      downloads: 2100
    }
  ];

  // Sample alumni coordination data
  const alumniCoordination = [
    {
      id: 1,
      name: "Rahul Sharma",
      company: "Google",
      role: "Senior Software Engineer",
      email: "rahul.sharma@google.com",
      phone: "+91 98765 43210",
      event: "Annual Tech Fest",
      status: "Confirmed"
    },
    {
      id: 2,
      name: "Priya Patel",
      company: "Microsoft",
      role: "Product Manager",
      email: "priya.patel@microsoft.com",
      phone: "+91 87654 32109",
      event: "Career Guidance Workshop",
      status: "Invited"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = eventTypeFilter === 'all' || event.type.toLowerCase() === eventTypeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleCreateEvent = () => {
    setIsCreating(true);
  };

  const handleUploadMaterial = () => {
    console.log("Uploading promotional material");
  };

  const handleInviteCompanies = (eventId) => {
    console.log("Inviting companies to event:", eventId);
  };

  const handleViewEvent = (eventId) => {
    console.log("Viewing event:", eventId);
  };

  const handleEditEvent = (eventId) => {
    console.log("Editing event:", eventId);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming': return 'status-upcoming';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      case 'confirmed': return 'status-confirmed';
      case 'invited': return 'status-invited';
      default: return '';
    }
  };

  return (
    <div className="event-pr-management">
      <div className="page-header">
        <h1>Event & PR Management</h1>
        <p>Manage college events and promotional activities</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          <Calendar size={16} />
          Events
        </button>
        <button 
          className={`tab ${activeTab === 'promo' ? 'active' : ''}`}
          onClick={() => setActiveTab('promo')}
        >
          <Upload size={16} />
          Promotional Materials
        </button>
        <button 
          className={`tab ${activeTab === 'alumni' ? 'active' : ''}`}
          onClick={() => setActiveTab('alumni')}
        >
          <Users size={16} />
          Alumni Coordination
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'events' && (
          <div className="events-tab">
            {/* Controls */}
            <div className="events-controls">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filters">
                <div className="filter-group">
                  <Filter size={20} />
                  <select 
                    value={eventTypeFilter} 
                    onChange={(e) => setEventTypeFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="fest">Fests</option>
                    <option value="workshop">Workshops</option>
                    <option value="networking">Networking</option>
                    <option value="seminar">Seminars</option>
                  </select>
                </div>
              </div>
              
              <div className="actions">
                <button 
                  className="primary-button"
                  onClick={handleCreateEvent}
                >
                  <Plus size={16} />
                  Create Event
                </button>
              </div>
            </div>

            {/* Events List */}
            <div className="events-list">
              {filteredEvents.map(event => (
                <div key={event.id} className="event-card">
                  <div className="event-header">
                    <div className="event-info">
                      <h3>{event.title}</h3>
                      <p>{event.location}</p>
                      <div className="event-meta">
                        <span><Calendar size={16} /> {event.date}</span>
                        <span><Clock size={16} /> {event.time}</span>
                      </div>
                    </div>
                    <div className="event-status">
                      <div className={`status-badge ${getStatusClass(event.status)}`}>
                        {event.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="event-details">
                    <div className="detail-item">
                      <span className="label">Type:</span>
                      <span className="value">{event.type}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Attendees:</span>
                      <span className="value">{event.attendees}</span>
                    </div>
                  </div>
                  
                  <div className="event-actions">
                    <button 
                      className="action-button view-button"
                      onClick={() => handleViewEvent(event.id)}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    <button 
                      className="action-button edit-button"
                      onClick={() => handleEditEvent(event.id)}
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button 
                      className="secondary-button"
                      onClick={() => handleInviteCompanies(event.id)}
                    >
                      <Users size={16} />
                      Invite Companies
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredEvents.length === 0 && (
                <div className="no-results">
                  <p>No events found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'promo' && (
          <div className="promo-tab">
            <div className="promo-controls">
              <div className="actions">
                <button 
                  className="primary-button"
                  onClick={handleUploadMaterial}
                >
                  <Upload size={16} />
                  Upload Material
                </button>
              </div>
            </div>

            <div className="promo-materials">
              <h3>Promotional Materials</h3>
              <div className="materials-list">
                {promoMaterials.map(material => (
                  <div key={material.id} className="material-card">
                    <div className="material-header">
                      <div className="material-icon">
                        {material.type === 'Brochure' && <FileText size={24} />}
                        {material.type === 'Report' && <BarChart3 size={24} />}
                        {material.type === 'Video' && <Video size={24} />}
                      </div>
                      <div className="material-info">
                        <h4>{material.title}</h4>
                        <p>{material.type} • {material.size}</p>
                      </div>
                    </div>
                    
                    <div className="material-details">
                      <div className="detail-item">
                        <span className="label">Uploaded:</span>
                        <span className="value">{material.uploaded}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Downloads:</span>
                        <span className="value">{material.downloads}</span>
                      </div>
                    </div>
                    
                    <div className="material-actions">
                      <button className="secondary-button">
                        <Download size={16} />
                        Download
                      </button>
                      <button className="action-button">
                        <Edit3 size={16} />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alumni' && (
          <div className="alumni-tab">
            <div className="alumni-coordination">
              <h3>Alumni Coordination</h3>
              <div className="alumni-table-container">
                <table className="alumni-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Event</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumniCoordination.map(alumni => (
                      <tr key={alumni.id}>
                        <td>{alumni.name}</td>
                        <td>{alumni.company}</td>
                        <td>{alumni.role}</td>
                        <td>{alumni.event}</td>
                        <td>
                          <div className={`status-badge ${getStatusClass(alumni.status)}`}>
                            {alumni.status}
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="action-button">
                              <Mail size={16} />
                            </button>
                            <button className="action-button">
                              <Phone size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="alumni-actions">
                <button className="primary-button">
                  <Plus size={16} />
                  Invite Alumni
                </button>
                <button className="secondary-button">
                  <Award size={16} />
                  Request Mentorship
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {isCreating && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Event</h2>
              <button 
                className="close-button"
                onClick={() => setIsCreating(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Event Title *</label>
                <input type="text" placeholder="Enter event title" />
              </div>
              
              <div className="form-group">
                <label>Event Type *</label>
                <select>
                  <option value="">Select event type</option>
                  <option value="fest">Fest</option>
                  <option value="workshop">Workshop</option>
                  <option value="networking">Networking</option>
                  <option value="seminar">Seminar</option>
                  <option value="placement">Placement Drive</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input type="date" />
                </div>
                
                <div className="form-group">
                  <label>Time *</label>
                  <input type="time" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Location *</label>
                <input type="text" placeholder="Enter event location" />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="4" 
                  placeholder="Enter event description..."
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>Expected Attendees</label>
                <input type="number" placeholder="Enter expected number of attendees" />
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
                <button className="submit-button">
                  <Calendar size={16} />
                  Create Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPrManagement;