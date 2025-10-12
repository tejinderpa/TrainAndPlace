import React, { useState } from 'react';
import { Bell, Mail, Check, X, Search, Filter, Trash2, Star } from 'lucide-react';
import '../../App.css';

const NotificationsMessages = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "application",
      title: "New Application Received",
      message: "Alex Johnson has applied for Software Engineering Intern position",
      time: "2 hours ago",
      unread: true,
      student: "Alex Johnson",
      job: "Software Engineering Intern"
    },
    {
      id: 2,
      type: "tpo",
      title: "Message from TPO",
      message: "Dr. Rajesh Kumar: Regarding campus placement schedule for next month",
      time: "5 hours ago",
      unread: true,
      sender: "Dr. Rajesh Kumar"
    },
    {
      id: 3,
      type: "status",
      title: "Application Status Update",
      message: "Sarah Williams has accepted your interview invitation",
      time: "1 day ago",
      unread: false,
      student: "Sarah Williams"
    },
    {
      id: 4,
      type: "profile",
      title: "New Student Profile Alert",
      message: "Michael Chen has updated his profile with new projects",
      time: "2 days ago",
      unread: false,
      student: "Michael Chen"
    },
    {
      id: 5,
      type: "application",
      title: "Application Withdrawn",
      message: "Priya Sharma has withdrawn her application for UI/UX Designer position",
      time: "3 days ago",
      unread: false,
      student: "Priya Sharma"
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || notification.type === filter;
    
    return matchesSearch && matchesFilter;
  });

  const handleSelectNotification = (id) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(selectedNotifications.filter(notifId => notifId !== id));
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(notif => notif.id));
    }
  };

  const markAsRead = (id) => {
    console.log("Marking notification as read:", id);
  };

  const markAsUnread = (id) => {
    console.log("Marking notification as unread:", id);
  };

  const deleteNotification = (id) => {
    console.log("Deleting notification:", id);
  };

  const markAllAsRead = () => {
    console.log("Marking all notifications as read");
  };

  const deleteSelected = () => {
    console.log("Deleting selected notifications:", selectedNotifications);
    setSelectedNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application': return <Mail size={16} />;
      case 'tpo': return <Bell size={16} />;
      case 'status': return <Check size={16} />;
      case 'profile': return <Star size={16} />;
      default: return <Bell size={16} />;
    }
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case 'application': return 'application-notification';
      case 'tpo': return 'tpo-notification';
      case 'status': return 'status-notification';
      case 'profile': return 'profile-notification';
      default: return '';
    }
  };

  return (
    <div className="notifications-messages">
      <div className="page-header">
        <h1>Notifications & Messages</h1>
        <p>Stay updated with all your notifications and messages</p>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={16} />
          Notifications
        </button>
        <button 
          className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <Mail size={16} />
          Messages
        </button>
      </div>

      {/* Controls */}
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
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="application">Applications</option>
              <option value="tpo">TPO Messages</option>
              <option value="status">Status Updates</option>
              <option value="profile">Profile Alerts</option>
            </select>
          </div>
          
          <button className="secondary-button" onClick={markAllAsRead}>
            <Check size={16} />
            Mark All Read
          </button>
          
          {selectedNotifications.length > 0 && (
            <button className="delete-button" onClick={deleteSelected}>
              <Trash2 size={16} />
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          <>
            <div className="notifications-header">
              <input
                type="checkbox"
                checked={selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0}
                onChange={handleSelectAll}
              />
              <span>{selectedNotifications.length} selected</span>
            </div>
            
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${getNotificationClass(notification.type)} ${notification.unread ? 'unread' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedNotifications.includes(notification.id)}
                  onChange={() => handleSelectNotification(notification.id)}
                />
                
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="notification-content">
                  <div className="notification-header">
                    <h3>{notification.title}</h3>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  
                  {notification.student && (
                    <div className="notification-meta">
                      <span>Student: {notification.student}</span>
                    </div>
                  )}
                  
                  {notification.sender && (
                    <div className="notification-meta">
                      <span>From: {notification.sender}</span>
                    </div>
                  )}
                  
                  {notification.job && (
                    <div className="notification-meta">
                      <span>Position: {notification.job}</span>
                    </div>
                  )}
                </div>
                
                <div className="notification-actions">
                  {notification.unread ? (
                    <button 
                      className="action-button"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check size={16} />
                    </button>
                  ) : (
                    <button 
                      className="action-button"
                      onClick={() => markAsUnread(notification.id)}
                    >
                      <X size={16} />
                    </button>
                  )}
                  
                  <button 
                    className="action-button delete-button"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="no-results">
            <p>No notifications found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="notifications-summary">
        <h3>Notification Summary</h3>
        <div className="summary-stats">
          <div className="stat-card">
            <div className="stat-value">{notifications.filter(n => n.unread).length}</div>
            <div className="stat-label">Unread</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{notifications.filter(n => n.type === 'application').length}</div>
            <div className="stat-label">Applications</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{notifications.filter(n => n.type === 'tpo').length}</div>
            <div className="stat-label">TPO Messages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsMessages;