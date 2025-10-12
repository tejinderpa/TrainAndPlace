import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Bell, Edit3, Trash2 } from 'lucide-react';
import '../../App.css';

const TpoAnnouncements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: "New Internship Opportunities",
      content: "We have partnered with 15 new companies for summer internship opportunities. Registration starts from Oct 15th.",
      date: "2025-10-12",
      priority: "high",
      author: "Dr. Rajesh Kumar",
      expires: "2025-11-15"
    },
    {
      id: 2,
      title: "Placement Drive Schedule Updated",
      content: "The schedule for the upcoming placement drive has been updated. Please check the calendar for detailed timings.",
      date: "2025-10-10",
      priority: "medium",
      author: "Dr. Priya Sharma",
      expires: "2025-12-31"
    },
    {
      id: 3,
      title: "Resume Building Workshop",
      content: "A workshop on building effective resumes will be conducted on Oct 20th. Mandatory for all final year students.",
      date: "2025-10-08",
      priority: "high",
      author: "Dr. Rajesh Kumar",
      expires: "2025-10-25"
    },
    {
      id: 4,
      title: "Campus Recruitment Guidelines",
      content: "New guidelines for campus recruitment have been issued. All students must follow the updated procedures.",
      date: "2025-10-05",
      priority: "medium",
      author: "Dr. Amit Patel",
      expires: "2025-12-31"
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === 'all' || announcement.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className="tpo-announcements">
      <div className="page-header">
        <h1>Announcements</h1>
        <p>Manage and view all placement-related announcements</p>
      </div>

      {/* Controls */}
      <div className="reviews-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          
          <button 
            className="add-review-button"
            onClick={() => setIsCreating(true)}
          >
            <Plus size={20} />
            Create Announcement
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="companies-list">
        {filteredAnnouncements.map(announcement => (
          <div key={announcement.id} className="company-card">
            <div className="company-header">
              <div className="company-info">
                <div className="company-logo">
                  <Bell size={24} />
                </div>
                <div>
                  <h3>{announcement.title}</h3>
                  <div className="company-rating">
                    <span className={`priority-badge ${getPriorityClass(announcement.priority)}`}>
                      {announcement.priority} priority
                    </span>
                    <span>By {announcement.author}</span>
                  </div>
                </div>
              </div>
              <div className="announcement-actions">
                <button className="edit-button">
                  <Edit3 size={16} />
                </button>
                <button className="delete-button">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="reviews-list">
              <div className="review-card">
                <div className="review-content">
                  <p>{announcement.content}</p>
                </div>
                
                <div className="review-footer">
                  <div className="announcement-meta">
                    <span>Posted: {formatDate(announcement.date)}</span>
                    <span>Expires: {formatDate(announcement.expires)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredAnnouncements.length === 0 && (
          <div className="no-reviews">
            <p>No announcements found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Create Announcement Modal */}
      {isCreating && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create New Announcement</h2>
              <button 
                className="close-button"
                onClick={() => setIsCreating(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Enter announcement title" />
              </div>
              
              <div className="form-group">
                <label>Content</label>
                <textarea 
                  rows="4" 
                  placeholder="Enter announcement content"
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Expires On</label>
                  <input type="date" />
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="cancel-button"
                  onClick={() => setIsCreating(false)}
                >
                  Cancel
                </button>
                <button className="submit-button">
                  Create Announcement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TpoAnnouncements;