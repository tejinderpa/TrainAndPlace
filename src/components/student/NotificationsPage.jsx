import React, { useState } from 'react';
import { Bell, Search, Filter, Check, X, Trash2, Settings } from 'lucide-react';
import '../../App.css';

const NotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "job",
      title: "New Job Opening",
      message: "Microsoft is hiring for Software Engineer Intern position. Apply now!",
      time: "2 hours ago",
      isRead: false,
      priority: "high"
    },
    {
      id: 2,
      type: "event",
      title: "Upcoming Workshop",
      message: "Tech Interview Preparation workshop scheduled for Oct 20, 2025.",
      time: "5 hours ago",
      isRead: true,
      priority: "medium"
    },
    {
      id: 3,
      type: "deadline",
      title: "Application Deadline",
      message: "Deadline for Google internship application is tomorrow.",
      time: "1 day ago",
      isRead: false,
      priority: "high"
    },
    {
      id: 4,
      type: "mentorship",
      title: "Mentor Request Accepted",
      message: "Dr. Sarah Williams has accepted your mentorship request.",
      time: "1 day ago",
      isRead: true,
      priority: "low"
    },
    {
      id: 5,
      type: "announcement",
      title: "Campus Placement Drive",
      message: "Amazon campus placement drive starting next week.",
      time: "2 days ago",
      isRead: false,
      priority: "high"
    },
    {
      id: 6,
      type: "job",
      title: "Application Status Update",
      message: "Your application for Data Analyst position at Meta has been shortlisted.",
      time: "2 days ago",
      isRead: true,
      priority: "medium"
    },
    {
      id: 7,
      type: "event",
      title: "New Hackathon",
      message: "Register now for the upcoming Tech Innovation Hackathon.",
      time: "3 days ago",
      isRead: false,
      priority: "medium"
    }
  ];

  // Filter notifications based on active filter and search term
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || 
      activeFilter === notification.type ||
      (activeFilter === 'unread' && !notification.isRead);
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const markAsRead = (id) => {
    // In a real app, this would update the backend
    console.log(`Marking notification ${id} as read`);
  };

  const markAsUnread = (id) => {
    // In a real app, this would update the backend
    console.log(`Marking notification ${id} as unread`);
  };

  const deleteNotification = (id) => {
    // In a real app, this would update the backend
    console.log(`Deleting notification ${id}`);
  };

  const toggleNotificationSelection = (id) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotifications(newSelected);
  };

  const markSelectedAsRead = () => {
    // In a real app, this would update the backend
    console.log(`Marking ${selectedNotifications.size} notifications as read`);
    setSelectedNotifications(new Set());
  };

  const deleteSelected = () => {
    // In a real app, this would update the backend
    console.log(`Deleting ${selectedNotifications.size} notifications`);
    setSelectedNotifications(new Set());
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'job': return '💼';
      case 'event': return '📅';
      case 'deadline': return '⏰';
      case 'mentorship': return '👨‍🏫';
      case 'announcement': return '📢';
      default: return '🔔';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#3742fa';
    }
  };

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>Notifications Center</h1>
        <p>Stay updated with all your important notifications</p>
      </div>

      {/* Search and Filters */}
      <div className="notifications-controls">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <button 
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-button ${activeFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread
          </button>
          <button 
            className={`filter-button ${activeFilter === 'job' ? 'active' : ''}`}
            onClick={() => setActiveFilter('job')}
          >
            Jobs
          </button>
          <button 
            className={`filter-button ${activeFilter === 'event' ? 'active' : ''}`}
            onClick={() => setActiveFilter('event')}
          >
            Events
          </button>
          <button 
            className={`filter-button ${activeFilter === 'deadline' ? 'active' : ''}`}
            onClick={() => setActiveFilter('deadline')}
          >
            Deadlines
          </button>
        </div>
        
        <button className="settings-button">
          <Settings size={20} />
          Preferences
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedNotifications.size > 0 && (
        <div className="bulk-actions">
          <span>{selectedNotifications.size} selected</span>
          <button onClick={markSelectedAsRead}>
            <Check size={16} />
            Mark as Read
          </button>
          <button onClick={deleteSelected}>
            <Trash2 size={16} />
            Delete
          </button>
          <button onClick={() => setSelectedNotifications(new Set())}>
            <X size={16} />
            Cancel
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-card ${notification.isRead ? 'read' : 'unread'} ${selectedNotifications.has(notification.id) ? 'selected' : ''}`}
            >
              <div className="notification-selection">
                <input
                  type="checkbox"
                  checked={selectedNotifications.has(notification.id)}
                  onChange={() => toggleNotificationSelection(notification.id)}
                />
              </div>
              
              <div className="notification-icon">
                <span>{getTypeIcon(notification.type)}</span>
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <div className="notification-meta">
                    <span 
                      className="priority-indicator"
                      style={{ color: getPriorityColor(notification.priority) }}
                    >
                      ●
                    </span>
                    <span className="time">{notification.time}</span>
                  </div>
                </div>
                <p className="message">{notification.message}</p>
              </div>
              
              <div className="notification-actions">
                {!notification.isRead ? (
                  <button 
                    className="action-button"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check size={16} />
                    Mark Read
                  </button>
                ) : (
                  <button 
                    className="action-button"
                    onClick={() => markAsUnread(notification.id)}
                  >
                    <Bell size={16} />
                    Mark Unread
                  </button>
                )}
                <button 
                  className="action-button delete"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <Bell size={48} />
            <h3>No notifications found</h3>
            <p>Try changing your filters or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;